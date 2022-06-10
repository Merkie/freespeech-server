// Imports
const express = require("express");
const https = require("https");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const secret = require("./secret");

// Schemas
const User = require("./schema/User");
const Layout = require("./schema/Layout");

// Express app
const app = express();
app.use(express.json());
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
function validatePassword(savedPassword, password) {
	return await bcrypt.compare(password, savedPassword);
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

mongoose.connect(secret.mongourl).then(() => {
	console.log("Connected to MongoDB!");
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

async function run() {
	console.log(new_layout);
	console.log("\n");
	console.log(new_user);
}
