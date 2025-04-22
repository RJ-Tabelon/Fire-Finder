import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    fireName: {
        type: String,
        required: true
    },
    //Location is not required since users can choose not to specify location. Latitude and longitude are still necessary.
    location: {
        type: String, 
        required: false
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    moreInfo: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

const Report = mongoose.model('Report', reportSchema);

export default Report;