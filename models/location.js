/**
 * quest Model
 */

const mongoose = require('mongoose');
autoInc = require('mongoose-auto-increment');
 var con = mongoose.createConnection("mongodb+srv://hunt-2:hunt@webcluster.65org.mongodb.net/hunt?retryWrites=true&w=majority");
autoInc.initialize(con)


const LocationSchema = new mongoose.Schema({

    locationId:{
        type: Number,
        required: true,
        unique: true
    },
    locationLatitude: {
        type: Number,
        required: true,
        allowNull: true,
        validate: { min: -90, max: 90 }
      },
      locationLongitude: {
        type: Number,
        allowNull: true,
        validate: { min: -180, max: 180 }
      },
    });

LocationSchema.plugin(autoInc.plugin,{
  model: 'location',
  field: 'locationId',
  startAt: 11111,
  incrementBy: 1
});

// Export model
module.exports = mongoose.model('Location',LocationSchema)