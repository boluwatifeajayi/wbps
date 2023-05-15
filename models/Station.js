const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stationSchema = mongoose.Schema({
	stationEmail: {
	  type: String,
	  required: [true, 'Please add an email'],
	  unique: [true, 'Station already exists']
	},
	stationPassword: {
	  type: String,
	  required: [true, 'Please add a password']
	},
	stationName: {
	  type: String,
	  default: ""
	},
	services: {
	  type: String,
	},
	// location: {
	// 	type: String,
	// },
	pricePerPageColor: {
	  type: Number,
	  default: 0
	},
	pricePerPageNoColor: {
	  type: Number,
	  default: 0
	},
	priceSpiralBind: {
	  type: Number,
	  default: 0
	},
	online: {
	  type: Boolean,
	  default: false
	},
	lastActiveAt: {
	  type: Date,
	  default: Date.now
	},
	place: {
		type: String,
		default: String
	},
	accountDetails: {
	  accountNumber: {
		type: String,
		default: ""
	  },
	  bank: {
		type: String,
		default: ""
	  },
	  accountName: {
		type: String,
		default: ""
	  }
	}
  }, {
	timestamps: true
  });
  
  

module.exports = mongoose.model("station", stationSchema)