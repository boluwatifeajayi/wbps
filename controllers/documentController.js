const asyncHandler = require('express-async-handler')
const Document = require('../models/Document')
const Station = require('../models/Station')
const User = require('../models/User')


//@desc get objects

const  getDocuments = asyncHandler(async (req, res) => {
	const document = await Document.find({user: req.user.id})
	res.status(200).json(document)
	console.log("this particular function")
})

//@desc create objects

const  setDocument = asyncHandler(async (req, res) => {
	// if(!req.body.docItem|| !req.body.paymentMethod) {
	// 	res.status(400)
	// 	throw new Error("please add a text feild")
	// }

	const { userid } = res.locals.decoded;

	const {
		docItem,
		noOfCopies,
		noOfPages,
		isSpiralBind,
		isColored,
		additionalInformation,
		paymentMethod,
		thestation
	  } = req.body;

	  const currentUser = await User.findById(userid);
	 
    const { _id: userId, firstname} = currentUser;
	
    const newDocument = await Document.create({
      docItem,
      noOfCopies,
      noOfPages,
      isSpiralBind,
	  thestation,
      isColored,
      theUser: {
        userId,
        firstname,
      },
      additionalInformation,
      paymentMethod,
      user: req.user.id,
    });

	res.status(201).json(newDocument);

})

//@desc update objects

const  updateDocument = asyncHandler(async (req, res) => {

	const document = await Document.findById(req.params.id)

	if(!document) {
		res.status(400)
		throw new Error('Object not found')
	}

	const user = await User.findById(req.user.id)

	if(!user){
		res.status(401)
		throw new Error('user not found')
	}

	// Make sure the logged in user matches the journal user
	if (document.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('user not authorized')
	  }

	const updatedDocument = await Document.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	}) 

	res.status(200).json(updatedDocument)
})

const getAllDocuments = async (req, res) => {
	try {
	  const allDocuments = await Document.find().sort({ updatedAt: -1 });
	  res.status(200).json(allDocuments);
	} catch (error) {
	  res.status(404).json({ error: "No jobs available" });
	}
  };

const getSingleDocument = async (req, res) => {
	try {
	  const { documentid } = req.params;
	  const currentDocument = await Document.findById(documentid);
	  res.status(200).json(currentDocument);
	} catch (error) {
	  res.status(404).json({ error: error.message });
	}
  };

  const getStationDocuments = async (req, res) => {
	try {
	  const { thestationname } = req.params;
	  const currentDocument = await Document
		.find({ thestation: thestationname })
		.sort({ updatedAt: -1 });
	  res.status(200).json(currentDocument);
	} catch (error) {
	  res.status(404).json({ error: error.message });
	}
  };


//@desc delete object

const  deleteDocument = asyncHandler(async (req, res) => {
	const document = await Document.findById(req.params.id)
	if(!document){
		res.status(400)
		throw new Error('Journal not found')
	}

	const user = await User.findById(req.user.id)

	if(!user){
		res.status(401)
		throw new Error('User not found')
	}

	// Make sure the logged in user matches the journal user
	if (document.User.toString() !== req.user.id) {
		res.status(401)
		throw new Error('User not authorized')
	  }

	await document.remove()

	res.status(200).json({message: `deleted goals ${req.params.id}`})
})

// message user

const messageStation = async (req, res) => {
	try {
	  
	  const {stationId}  = res.locals.decoded;
	  console.log(res.locals.decoded)
	  if (stationId == null)
		return res
		  .status(400)
		  .json({ error: "Ensure you are a station" });
	  const { message, status } = req.body;
	  const { documentid } = req.params;
	  const appliedAt = Date.now();
	//   const getStation = await station.findById(id);
	//   console.log(getUser)
	  const newMessage = await Document.findByIdAndUpdate(
		documentid,
		{
		  $push: {
			station: { stationId, message, status, appliedAt },
		  },
		},
		{ new: true }
	  );
  

	  res.status(201).json(newMessage);
	} catch (error) {
	  res.status(400).json({ error: error.message });
	}
  };

  const approveMessage = async (req, res) => {
	try {
	  const { userid } = res.locals.decoded;
	  
	  if (userid == null)
		return res.status(400).json({
		  error: "Ensure you are an user",
		});
	  const { id, status } = req.query;
	  const { documentid } = req.params;
	//   const getUser = await user.findById(id);
	  const queryData = ["pending", "approved", "declined", "reviwed"];
	  const currentDocument = await Document.findOneAndUpdate(
		{ _id: documentid, 'user.id' : id },
		{ $set: { "user.$.status": status } },
		{ new: true }
	  );

	//   console.log(currentObject)
  
	  // const currentJob = await jobModel.findOne({ _id : jobId});
	  if (status.toLowerCase() == "printing") {
		
		console.log("approved")
		// Document.findOneAndUpdate(
		// 	{ _id: objectId, 'user.id' : id },
		// 	{ $set: { "user.$.status": status } },
		// 	{ new: true }
		//   );
		// currentObject.$set({ "user.status": "approved" });
	  } else if (status.toLowerCase() == "ready") {
		console.log("declined")
	  }
	  res.status(200).json(currentObject);
	} catch (error) {
	  console.log(error)
	  res.status(400).json({ error: error.message });
	}
  };

  
  
  

module.exports = {
	getDocuments,
	setDocument,
	updateDocument,
	deleteDocument,
	messageStation,
	approveMessage,
	getAllDocuments,
	getSingleDocument,
	getStationDocuments
}