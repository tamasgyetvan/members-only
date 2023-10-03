const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 25,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
        maxLength: 100
    },
    lastname: {
        type: String,
        required: true,
        maxLength: 100
    },

})

UserSchema.virtual("fullname").get(function() {
    
    const fullName = `${this.first_name} ${this.name_name}`;
    return fullName;
})

UserSchema.virtual("url").get(function() {
    
    return `/members/users/${this._id}`;
})

module.exports = mongoose.model("User", UserSchema);