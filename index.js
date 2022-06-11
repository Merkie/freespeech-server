// Imports
const express = require("express");
const https = require("https");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const secret = require("./secret");

// Schemas
const User = require("./schema/User");
const Layout = require("./schema/Layout");
const Session = require("./schema/Session");

// Express app
const app = express();
app.use(express.json());
app.use(cors({
	origin: "*"
}));
const port = 3000;
app.listen(port, () => {
	console.log("Server has started!");
});

// Hash Password
async function hashPassword(password) {
	const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// Validate Password
async function validatePassword(savedPassword, password) {
	return await bcrypt.compare(password, savedPassword);
}

// New Session
function createSessionString() {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Validate Session
async function validateSession(userSession) {
	const session = await Session.findOne({key: userSession});
	if (session) {
		return session;
	} else {
		return null;
	}
}

// Signup
app.post("/signup", async (req, res) => {
	try {
		const json = req.body;
		const hashedPassword = await hashPassword(json["password"]);

		const layout = new Layout({
			name: "My First Layout",
			icon: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fit=scale&fm=pjpg&h=350&w=700",
		});

		const user = new User({
			name: json["name"],
			password: hashedPassword,
			email: json["email"],
			layouts: [layout._id]
		});

		layout.owner = user._id;

		await layout.save();
		await user.save();

		res.send({"success": true});
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

app.post("/login", async (req, res) => {
	try {
		const json = req.body;
		const user = await User.findOne({email: json["email"]});
		if (user) {
			const valid = await validatePassword(user.password, json["password"]);
			if (valid) {
				const session = new Session({
					owner: user._id,
					key: createSessionString()
				});
				await session.save();
				res.send({"success": true, "user": user, "session": session.key});
			} else {
				res.send({"success": false});
			}
		} else {
			res.send({"success": false});
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

app.post("/session", async (req, res) => {
	try {
		const json = req.body;
		const session = await validateSession(json["session"]);

		if (session) {
			res.send({"success": true, "user": await User.findById(session.owner)});
		} else {
			res.send({"success": false});
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

app.post("/layout", async (req, res) => {
	try {
		const json = req.body;
		const session = await validateSession(json["session"]);
		const layoutID = json["layout"];

		if (session) {
			const layout = await Layout.findById(layoutID);
			if(layout.public == false) {
				if(layout.owner == session.owner) {
					res.send({"success": true, "layout": layout});
				} else {
					res.send({"success": true, "layout": layout});
				}
			} else {
				res.send({"success": true, "layout": layout});
			}
		} else {
			res.send({"success": false});
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

app.post("/addTile", async (req, res) => {
	try {
		const json = req.body;
		const session = await validateSession(json["session"]);
		const user = await User.findById(session.owner);
		const layout = await Layout.findById(user.layouts[user.selectedLayout]);
		
		console.log(layout.data[json["page"]]);
		layout.data[json["page"]].push({"text": "New Tile"});
		await layout.save();
		console.log(layout.data);

	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});


mongoose.connect(secret.mongourl).then(() => {
	console.log("Connected to MongoDB!");
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});
