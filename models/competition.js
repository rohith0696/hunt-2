/**
 * Competition Model
 */

const mongoose = require('mongoose'),


const CompetitionSchema = new mongoose.Schema({

    
    competitionName: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
        
    },
    startDateTime: {
        type: DATE,
        get() {
            return moment(this.getDataValue('startDateTime')).format('MM/DD/YYYY hh:mm:ss');
        }
    },
    endDateTime: {
        type: DATE,
        get() {
            return moment(this.getDataValue('endDateTime')).format('MM/DD/YYYY hh:mm:ss');
        }
    }

});

// Export model
module.exports = mongoose.model('Competition',CompetitionSchema)