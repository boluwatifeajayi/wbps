import axios from 'axios'
// const API_URL = 'http://localhost:4070/api'

axios.defaults.withCredentials = true



// get all documents
const allDocuments = async () => {
	const response = await axios.get('http://localhost:4070/api/documents/all')
	return response.data
}

// create new document
const createDocument = async (documentData, token) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			withCredentials: true,
			Cookie: `authToken=${token}`
		}
	}
	const response = await axios.post('http://localhost:4070/api/documents/create', documentData, config, {withCredentials: true})

	return response.data
	
}

// get user documents
const getDocuments = async (token) => {

	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const response = await axios.get('http://localhost:4070/api/documents/', config)

	return response.data
}



// get single document

const GetSingleDocument = async (id) => {
	const response = await axios.get(`http://localhost:4070/api/documents/${id}`)
	return response.data	
}

// document by station name
// get all documents
const stationDocuments = async (stationname) => {
	const response = await axios.get(`http://localhost:4070/api/documents/document/${stationname}`)
	return response.data
}





// apply for document

const MessageDocument = async (messageData, documentId, token) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			withCredentials: true,
			
		}
	}
	
	const response = await axios.post(`http://localhost:4070/api/documents/${documentId}/message`, messageData, config)
	return response.data	


}






const documentService = {
	createDocument,
	getDocuments,
	allDocuments,
	GetSingleDocument,
	MessageDocument,
	stationDocuments
}


export default documentService