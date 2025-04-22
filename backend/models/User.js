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
    latitude: {
        type: String,
        required: false
    },
    longitude: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;