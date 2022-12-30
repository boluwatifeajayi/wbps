const express = require('express')
const router = express.Router()
const {
	getDocuments, 
	setDocument, 
	updateDocument, 
	deleteDocument, 
	messageStation, 
	getAllDocuments,
	approveMessage, getSingleDocument, getStationDocuments} = require('../controllers/documentController')

const {protect} = require('../middlewares/userAuthMiddleware')


// routes
router.get('/', protect, getDocuments)
router.post('/create', protect, setDocument)
router.get('/all', getAllDocuments)
router.get('/:documentid', getSingleDocument);
router.put('/:id', protect, updateDocument)
router.delete('/:id', protect, deleteDocument)
router.post("/:documentid/message", protect, messageStation);
router.patch("/:documentid/track", protect, approveMessage);
router.get("/document/:thestationname", getStationDocuments);

  

  



module.exports = router