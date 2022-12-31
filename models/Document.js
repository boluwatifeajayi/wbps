const mongoose = require('mongoose');
const Schema = mongoose.Schema

const documentSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	// the document
	docItem: {
		type: String,
		required: true
	},
	
	noOfCopies: {
		type: Number,
		required: true
	},
	noOfPages: {
		type: Number,
		required: true
	},
	isSpiralBind: {
		type: Boolean,
		required: true
	},
	isColored: {
		type: Boolean,
		default: false,
		required: true
	},
	additionalInformation: {
		type: String,
		default: "no additional information",
	},
	paymentMethod: {
		type: String,
		required: true
	},
	status: {
		type: String,
		default: 'pending',
		required: true
	},
	thestation:{
		type: String,
		default: 'none'
	},
	theUser: {
		userId: {
		  type: mongoose.Schema.Types.ObjectId,
		},
		firstname: {
		  type: String,
		  default: "mini"
		},
	  },
	  station: [
		{
		  id: {
			type: mongoose.Schema.Types.ObjectId,
		  },
		  message: {
			type: String,
			default: 'pending'
			
		  },
		  appliedAt: {
			type: Date,
		  },
		//   status: { type: String, default: "pending" },
		},
	  ],
	
	// user: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	required: true,
	// 	ref: 'User'
	// }, 


},
{
	timestamps: true
}

)

module.exports = mongoose.model("Document", documentSchema)