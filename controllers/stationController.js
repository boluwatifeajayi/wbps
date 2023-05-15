const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Station = require('../models/Station')


// all stations
async function getStations(req, res) {
	try {
	  const allStations = await Station.find();
	  res.status(200).json(allStations);
	} catch (error) {
	  res.status(404).json({ error: "No stations available" });
	}
  }

// all single stations
async function getSingleStation(req, res) {
	try {
	  const { stationid } = req.params;
	  const currentStation = await Station.findById(stationid);
  
	  // Update the last active time of the station
	  currentStation.lastActiveAt = Date.now();
	  await currentStation.save();
  
	  res.status(200).json(currentStation);
	} catch (error) {
	  res.status(404).json({ error: error.message });
	}
  }

// register station
const registerStation = asyncHandler(async (req, res) => {
	const {stationEmail, stationPassword, stationName, services, pricePerPageColor, pricePerPageNoColor, priceSpiralBind, online, lastActiveAt, accountDetails, place} = req.body
	if(!stationEmail || !stationPassword){
		res.status(400)
		throw new Error('Please add all feilds')
	}

	// if station exsist

	const stationExsits = await Station.findOne({stationEmail})

	if(stationExsits){
		res.status(400)
		throw new Error('station station already exsist')
	}

	// hash passward
	// Hash password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(stationPassword, salt)
  
	// Create station
	const station = await Station.create({
	  stationName,
	  stationEmail,
	  services, pricePerPageColor, pricePerPageNoColor, priceSpiralBind,
	  online, lastActiveAt, accountDetails, place,
	  stationPassword: hashedPassword,
	})
  
	if (station) {
	  res.status(201).json({
		_id: station.id,
		stationName: station.stationName,
		stationEmail: station.stationEmail,
		services: station.services,
		pricePerPageColor: station.pricePerPageColor,
		pricePerPageNoColor: station.pricePerPageNoColor,
		priceSpiralBind: station.priceSpiralBind,
		online: station.online,
		lastActiveAt: station.lastActiveAt,
		place: station.place,
		accountDetails: station.accountDetails,
		token: generateToken(station._id),
	  })
	} else {
	  res.status(400)
	  throw new Error('Invalid station data')
	}
	
	// res.json({message: 'Register station'})
})

// authenticate station
const loginStation = asyncHandler(async (req, res) => {
	const { stationEmail, stationPassword } = req.body;
  
	// Check for station email
	const station = await Station.findOne({ stationEmail });
  
	if (station && (await bcrypt.compare(stationPassword, station.stationPassword))) {
  
	  // Update the last active time of the station
	  station.lastActiveAt = Date.now();
	  await station.save();
  
	  res.json({
		_id: station.id,
		stationName: station.stationName,
		stationEmail: station.stationEmail,
		services: station.services,
		pricePerPageColor: station.pricePerPageColor,
		pricePerPageNoColor: station.pricePerPageNoColor,
		priceSpiralBind: station.priceSpiralBind,
		online: station.online,
		lastActiveAt: station.lastActiveAt,
		accountDetails: station.accountDetails,
		place: station.place,
		token: generateToken(station._id),
	  });
	} else {
	  res.status(400);
	  throw new Error('Invalid credentials');
	}
  });
  

// get current station
const getStation =  asyncHandler(async (req, res) => {
	res.status(200).json(req.station)
	console.log("station gotten")
})

// generate jwt

const generateToken = (stationId) => {
	return jwt.sign({ stationId }, process.env.JWT_SEC, {
	  expiresIn: '5d',
	})
  }

  const logoutStation = asyncHandler(async (req, res) => {
	try {
	  const { stationEmail } = req.body;
	  const station = await Station.findOneAndUpdate(
		{ stationEmail },
		{ $set: { online: "Offline" } },
		{ new: true }
	  );
	  res.json(station);
	} catch (error) {
	  res.status(500).json({ message: error.message });
	}
  });
  


module.exports = {
	registerStation,
	loginStation,
	getStation,
	getStations,
	getSingleStation
}