/**
 * quest Model
 */

const mongoose = require('mongoose'),
autoInc = require('mongoose-auto-increment');
 var con = mongoose.createConnection("mongodb+srv://hunt-2:hunt@webcluster.65org.mongodb.net/hunt?retryWrites=true&w=majority");
autoInc.initialize(con)

const TeamSchema = new mongoose.Schema({

    questId:{
        type: Number,
        required: true,
        unique: true
    },
    questName: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
        
    }
    
    questStartLocationLatitude: {
        type: INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: { min: -90, max: 90 }
      },
      questStartLocationLongitude: {
        type: INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: { min: -180, max: 180 }
      },
    }, {
      validate: {
        bothCoordsOrNone() {
          if ((this.latitude === null) !== (this.longitude === null)) {
            throw new Error('Require either both latitude and longitude or neither')
          }
        }
      }

});
TeamSchema.plugin(autoInc.plugin,{
    model: 'quest',
    field: 'questId',
    startAt: 1001,
    incrementBy: 1
});
// Export model
module.exports = mongoose.model('Quest', TeamSchema)