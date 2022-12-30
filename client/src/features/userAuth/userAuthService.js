import axios from 'axios'

// const API_URL = 'http://localhost:4070/api/users/'
axios.defaults.withCredentials = true

// register user
const register = async(userData) => {
	const response = await axios.post('http://localhost:4070/api/users/register', userData)

	if(response.data){
		localStorage.setItem('user', JSON.stringify(response.data))
	}

	return response.data
}


// login user
const login = async(userData) => {
	const response = await axios.post('http://localhost:4070/api/users/login', userData)

	if(response.data){
		localStorage.setItem('user', JSON.stringify(response.data))
	}

	return response.data
}

// logout
const logout = () => {
	localStorage.removeItem('user')
}

const authService = {
	register,
	login,
	logout
}

export default authService