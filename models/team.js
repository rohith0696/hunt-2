/**
 * Team Model
 */

const mongoose = require('mongoose'),
autoInc = require('mongoose-auto-increment');
 var con = mongoose.createConnection("mongodb+srv://hunt-2:hunt@webcluster.65org.mongodb.net/hunt?retryWrites=true&w=majority");
autoInc.initialize(con)

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

});
TeamSchema.plugin(autoInc.plugin,{
    model: 'team',
    field: 'teamId',
    startAt: 1001,
    incrementBy: 1
});
// Export model
module.exports = mongoose.model('Team', TeamSchema)
