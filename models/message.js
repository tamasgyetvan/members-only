const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50,
    },
    text: {
        type: String,
        required: true,
        maxLength: 100,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }

})

MessageSchema.virtual("timestamp_formatted").get(function() {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
})