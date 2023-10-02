const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxLength: 25,
    },
    password: {
        type: String,
        required: true,
        minLength: 8, 
        maxLength: 15
    },
    first_name: {
        type: String,
        required: true,
        maxLength: 100
    },
    last_name: {
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