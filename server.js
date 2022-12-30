const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/database');
const {errorHandler} = require('./middlewares/errorMiddleware')
const helmet = require("helmet");
const cors = require('cors')




connectDB()


const port = process.env.PORT || 4070
const app = express()

const whiteList = ["http://localhost:3000", "http://localhost:3000","http://localhost:3001", "https://testt-orpin.vercel.app", "earlyoffice-demo.herokuapp.com", "https://early.vercel.app"];
const corsOption = {
  origin: whiteList,
  credentials: true,
};
app.use(helmet());
app.use(cors(corsOption));


app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/users', require('./routes/userRoute'))
app.use('/api/station', require('./routes/stationRoute'))
app.use('/api/documents', require('./routes/documentRoute'))



app.use(errorHandler)


app.get('/', (req, res) => res.send('Web Based Printing Service Api'));


app.listen(port, () => console.log(`Server Started on port ${port}`))