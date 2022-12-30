const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stationSchema = mongoose.Schema({
	stationEmail: {
		type: String,
		required: [true, 'Please add an email'],
		unique: [true, 'station already exsists']
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
		type: Array,
		default: []
	},
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
},
{
	timestamps: true
}

)

module.exports = mongoose.model("station", stationSchema)