/**
 * Competition Model
 */

const mongoose = require('mongoose'),
autoInc = require('mongoose-auto-increment');
 var con = mongoose.createConnection("mongodb+srv://hunt-2:hunt@webcluster.65org.mongodb.net/hunt?retryWrites=true&w=majority");
autoInc.initialize(con)

const TeamSchema = new mongoose.Schema({

    
    competitionName: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
        
    }
    startDateTime: {
        type: DATE,
        get() {
            return moment(this.getDataValue('startDateTime')).format('MM/DD/YYYY hh:mm:ss');
        }
    }
    endDateTime: {
        type: DATE,
        get() {
            return moment(this.getDataValue('endDateTime')).format('MM/DD/YYYY hh:mm:ss');
        }
    }

});
TeamSchema.plugin(autoInc.plugin,{
    model: 'competition',
    field: 'competitionName',
    startAt: 1001,
    incrementBy: 1
});
// Export model
module.exports = mongoose.model('Competition', TeamSchema)