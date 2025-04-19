import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    location: {
        lat: { type: Number, default: null },
        lng: { type: Number, default: null },
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;