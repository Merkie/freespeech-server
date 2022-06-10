const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(value);
            }
        }
    },
    createdAt: {
        immutable: true,
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    layouts: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: []
    },
    selectedLayout: {
        type: Number,
        default: 0
    }, // Index of selected layout
    theme: {
        type: String,
        default: "dark"
    }
})

module.exports = mongoose.model("User", userSchema);