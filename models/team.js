/**
 * Team Model
 */

const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({

    teamId:{
        type: Number,
        required: true,
        unique: true
    },
    teamName: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
        
    }

})
// Export model
module.exports = mongoose.model('Team', TeamSchema)
