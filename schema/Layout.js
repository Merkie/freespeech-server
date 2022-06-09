const mongoose = require("mongoose");

const layoutSchema = new mongoose.Schema({
    name: String,
    createdAt: {
        immutable: true,
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    icon: String,
    data: {
        type: Object,
        default: {"Home":[]}
    }
});

module.exports = mongoose.model("Layout", layoutSchema);
