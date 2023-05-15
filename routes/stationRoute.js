const express = require('express');
const router = express.Router();
const {
  registerStation,
  loginStation,
  getStation,
  getStations,
  getSingleStation,
  updateStation
} = require('../controllers/stationController');

const { protect } = require('../middlewares/stationAuthMiddleware');

router.post('/register', registerStation);
router.post('/login', loginStation);
router.get('/stations', getStations);
router.get('/station/:stationid', getSingleStation);
router.get('/station', protect, getStation);
router.put('/station/:stationId', updateStation); // New route for updating the station

module.exports = router;
