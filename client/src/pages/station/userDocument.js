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

  const { docItem, paymentMethod} = singleDocument

  const [formData, setFormData] = useState({
    message: '',
  })


  const {message} = formData


  const handleClick = () => {
    // this is the URL of the PDF file
    const pdfUrl = 'https://example.com/document.pdf';

    // create an "a" element and set its "download" attribute
    // to the file name of the PDF and its "href" attribute to the URL of the PDF
    const link = document.createElement('a');
    link.setAttribute('download', 'document.pdf');
    link.setAttribute('href', pdfUrl);

    // append the "a" element to the body and click it to trigger the download
    document.body.appendChild(link);
    link.click();

    // remove the "a" element from the body
    document.body.removeChild(link);
  };

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
        message: 'waiting',
    }
  
    
    dispatch(MessageDocument({documentId: id, messageData})) 
    // console.log(jobData)
    }

    function printing(){
      const messageData = {
        message: 'printing',
    }
  
    
    dispatch(MessageDocument({documentId: id, messageData})) 
    // console.log(jobData)
    }

    function ready(){
      const messageData = {
        message: 'ready',
    }
  
    
    dispatch(MessageDocument({documentId: id, messageData})) 
    // console.log(jobData)
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


  

  return (
	<div className='container'>
    <Link to="/station/documents">
      <button className='btn btn-block  mt-4 mb-4 w-25' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back To Interships</button>
      </Link>
          
   <div className='row gx-5 mx-1'>
        <div className='col-md-7  document-d mb-4'>
       
        <h2 className='mt-4'><b>{docItem}</b></h2>
        <button onClick={onButtonClick}>
                    Download PDF
                </button>
               
            
            <h5 className='pinkish'><b><i className='fa fa-building'></i>{" "}{paymentMethod}</b></h5> 

            <hr/>
             
        </div>
        <div className='col-md-4  apply'>
        <div>
              <h4 className='mt-4 mb-2'>
               <b>Message Student</b>
              </h4>
              <hr/>
              <b className='pinkish mb-4'>Message</b>
              <button onClick={waiting}>Waiting</button>
              <button onClick={printing}>Printing</button>
              <button onClick={ready}>Ready</button>
              {/* <form onSubmit={onSubmit}>
              <input
                type='text'
                placeholder='This is your chance to convince the company to hire you'
                name='message'
                value={message}
                onChange={onChange}
                className="form-control mb-4"
                rows={4}
                required
              /> 
              <input type='submit' value="done"/>
              </form> */}
             
              
              
            
    </div>       
        </div>
      </div>
  </div>
  )
}

export default Document