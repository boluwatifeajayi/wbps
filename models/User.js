const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please add an email'],
		unique: [true, 'user already exsists']
	},
	password: {
		type: String,
		required: [true, 'Please add a password']
	},
	firstname: {
		type: String,
		default: ""
	},
	lastname: {
		type: String,
		default: ""
	},

	matricNumber: {
		type: String,
		default: ""
	},
	program: {
		type: String,
		default: ""
	},
	// hall: {
	// 	type: String,
	// 	default: ""
	// },
	// roomNo: {
	// 	type: String,
	// 	default: ""
	// },
	accBalance: {
		type: Number,
		default: 0
	},
},
{
	timestamps: true
}

)

module.exports = mongoose.model("User", userSchema)