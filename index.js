const express = require("express");
const mongoose = require("mongoose");
const secret = require("./secret");
const port = 3000;

const User = require("./schema/User");
const Layout = require("./schema/Layout");

const app = express();

app.listen(port, () => {
	console.log("Server has started!");
});

mongoose.connect(secret.mongourl).then(() => {
	console.log("Connected to MongoDB!");
});

app.get("/user", (req, res) => {
    const json = req.body;
    res.send("Hello World!");
});

const new_layout = new Layout({
	name: "My First Layout",
	icon: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fit=scale&fm=pjpg&h=350&w=700",
});

const new_user = new User({
	name: "Archer Calder",
	email: "archercalder@gmail.com",
	layouts: [new_layout._id],
});

async function run() {
	await new_layout.save();
	await new_user.save();

	console.log(new_layout);
	console.log("\n");
	console.log(new_user);
}

//run();

/*
app.get("/", (req, res) => {
  console.log(req.headers);
  res.send("Hello World, from express");
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
 */
