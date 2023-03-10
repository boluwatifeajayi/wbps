import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {GetSingleDocument, reset} from '../../features/document/documentSlice'
import {MessageDocument} from '../../features/document/documentSlice'

function Document() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams();

  // const [message, setMessage] = useState("")

  const {singleDocument, isLoading, isError, isSuccess, docmessage} = useSelector((state) => state.document)

  const { docItem, paymentMethod, theUser, noOfCopies, noOfPages, isSpiralBind, isColored, station} = singleDocument

  const [formData, setFormData] = useState({
    message: '',
  })


  const {message} = formData


  

  const onButtonClick = () => {
    // using JavaScript method to get PDF file
    
    fetch(docItem)
      .then(res => res.blob())
      .then(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", docItem);
        document.body.appendChild(link);
        link.click();
      })
    
}

useEffect(() => {

  if (isError) {
    console.log(docmessage)
  } 

  
  dispatch(GetSingleDocument(id))
    

  return () => {
    dispatch(reset())
  }
}, [])
  
const onChange = (e) => {
  setFormData((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value
  }))
}

const onSubmit = (e) => {
    e.preventDefault();
    const messageData = {
      message,
  }

  
  dispatch(MessageDocument({documentId: id, messageData})) 
  // console.log(jobData)
 
  }

 
    function waiting(){
      const messageData = {
        message: 'could not print document',
    }
  
    
    dispatch(MessageDocument({documentId: id, messageData})) 
      navigate('/station/documents')
    // console.log(jobData)
    }

    function printing(){
      const messageData = {
        message: 'printing',
    }
  
    alert("successful")
    dispatch(MessageDocument({documentId: id, messageData})) 
    // console.log(jobData)
    }

    function ready(){
      const messageData = {
        message: 'ready',
    }
  
    
    dispatch(MessageDocument({documentId: id, messageData})) 
    alert("successful")
    navigate('/station/documents')
    // console.log(jobData)
    }

  


  

  return (
	<div className='container'>
    <Link to="/station/documents">
      <button className='btn btn-block  mt-4 mb-4 w-25' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back To Interships</button>
      </Link>
          
   <div className='row gx-5 mx-1'>
        <div className='col-md-7  border-b document-d'>
       
        {/* <h2 className='mt-4'><b>{docItem}</b></h2> */}
       
        <h4>Student Name: {theUser?.firstname}</h4>
        <hr/>
        <br/>
        <p><b className='pinkish'>Payment Method: </b>{paymentMethod}</p> 

        <p className='mt-4'><b className='pinkish'>Color: </b>{isColored}</p>

        <p className='mt-4'><b className='pinkish'>Spiral Bind: </b>{isSpiralBind}</p>

        <p className='mt-4'><b className='pinkish'>Number Of Pages: </b>{noOfPages}</p>

        <p className='mt-4'><b className='pinkish'>Number Of Copies: </b>{noOfCopies}</p>
        
        <button className='normal-btn mt-4 w-50' onClick={onButtonClick}>
          Download Document
        </button>
               
            
           

           
             
        </div>
        <div className='col-md-4 ml-4  apply'>
        <div>
              <h4 className='mt-4 mb-2'>
               <b>Notify Student</b>
              </h4>
              <hr/>

                <button className="btn btn-md bg-success text-white mr-3" onClick={ready}>Document Ready</button> 
                <button className="btn btn-md bg-danger text-white" onClick={waiting}>Unable To Print Doc</button>
                 
        </div>       
        </div>
      </div>
  </div>
  )
}

export default Document