import axios from 'axios'

axios.defaults.withCredentials = true

// register station
const registerStation = async(stationData) => {
	const response = await axios.post('/api/station/register', stationData)

	if(response.data){
		localStorage.setItem('station', JSON.stringify(response.data))
	}

	return response.data
}


// login station
const loginStation = async(stationData) => {
	const response = await axios.post('/api/station/login', stationData)

	if(response.data){
		localStorage.setItem('station', JSON.stringify(response.data))
	}

	return response.data
}

// get stations
const getStations = async () => {
	const response = await axios.get('/api/station/stations')
	return response.data
}

// get a station

const GetSingleStation = async (id) => {
	const response = await axios.get(`/api/station/station/${id}`)
	return response.data	
}


const updateStation = async (stationId, updatedStationData) => {
	
	try {
		const response = await axios.put(`/api/station/station/${stationId}`, updatedStationData)
	  return response.data;
	} 
	
	catch (error) {
	  console.error(error);
	}
};

// logout
const logoutStation = () => {
	localStorage.removeItem('station')
}

const stationAuthService = {
	registerStation,
	loginStation,
	logoutStation,
	getStations,
	GetSingleStation,
	updateStation
}

export default stationAuthService