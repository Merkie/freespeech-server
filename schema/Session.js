const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    createdAt: {
        immutable: true,
        type: Date,
        default: () => Date.now()
    }
})

module.exports = mongoose.model("Session", sessionSchema);