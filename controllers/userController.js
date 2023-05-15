const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const nodemailer = require('nodemailer');

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { email, firstname, lastname, matricNumber, program, accBalance, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    email,
    firstname,
    lastname,
    matricNumber,
    program,
    accBalance,
    password: hashedPassword,
  });

  if (user) {
    // send welcome email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bolu4good@gmail.com',
		pass: '1234'
      },
    });

    const mailOptions = {
      from: 'bolu4good@gmail.com',
      to: user.email,
      subject: 'Welcome to our app!',
      text: `Dear ${user.firstname} ${user.lastname},\n\nWelcome to covenant university printing service! We are excited to have you as a new user.\n\nBest regards,\nThe dev Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    // send response
    res.status(201).json({
      _id: user.id,
      firstname: user.firstname,
      email: user.email,
      lastname: user.lastname,
      matricNumber: user.matricNumber,
      program: user.program,
      accBalance: user.accBalance,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// authenticate user
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body
  
	// Check for user email
	const user = await User.findOne({ email })
  
	if (user && (await bcrypt.compare(password, user.password))) {
	  res.json({
		_id: user.id,
		firstname: user.firstname,
		email: user.email,
		lastname: user.lastname,
		matricNumber: user.matricNumber,
		program: user.program,
		accBalance: user.accBalance,
		token: generateToken(user._id),
	  })
	} else {
	  res.status(400)
	  throw new Error('Invalid credentials')
	}
  })

// get current user
const getMe =  asyncHandler(async (req, res) => {
	res.status(200).json(req.user)
})

// generate jwt

const generateToken = (userid) => {
	return jwt.sign({ userid }, process.env.JWT_SEC, {
	  expiresIn: '5d',
	}) || jwt.sign({ stationId }, process.env.JWT_SEC, {
		expiresIn: '5d',
	  })
  }


module.exports = {
	registerUser,
	loginUser,
	getMe
}