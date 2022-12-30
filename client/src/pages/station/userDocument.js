import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {GetSingleDocument, reset} from '../../features/document/documentSlice'
import {MessageDocument} from '../../features/document/documentSlice'

function Document() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams();

  const [formData, setFormData] = useState({
    message: '', 
  })


  const {message} = formData

  const {singleDocument, isLoading, isError, isSuccess, docmessage} = useSelector((state) => state.document)

  const { file, paymentMethod} = singleDocument


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
    console.log(message)
    alert("you have applied")
    }

  useEffect(() => {

    if (isError) {
      console.log(docmessage)
    } 

    
    dispatch(GetSingleDocument(id))
      
  
    return () => {
      dispatch(reset())
    }
  }, [dispatch, navigate, docmessage, isError, GetSingleDocument])


  

  return (
	<div className='container'>
    <Link to="/internships">
      <button className='btn btn-block  mt-4 mb-4 w-25' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back To Interships</button>
      </Link>
          
   <div className='row gx-5 mx-1'>
        <div className='col-md-7 border-b document-d mb-4'>
       
        <h2 className='mt-4'><b>{file}</b></h2>
            
            <h5 className='pinkish'><b><i className='fa fa-building'></i>{" "}{paymentMethod}</b></h5> 
           
            


          
            <hr/>
           
           
            
          
        </div>
        <div className='col-md-4 border-b apply'>
        <form onSubmit={onSubmit}>
              <h4 className='mt-4 mb-2'>
               <b>Message Student</b>
              </h4>
              <hr/>
              <b className='pinkish mb-4'>Message</b>
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
              
              
            
              <div>
                <input
                  type='submit'
                  value='submit'
                  className='normal-btn mb-4'
                />
              </div> 
    </form>       
        </div>
      </div>
  </div>
  )
}

export default Document