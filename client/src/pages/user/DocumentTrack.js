import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {GetSingleDocument, reset} from '../../features/document/documentSlice'
import {MessageDocument} from '../../features/document/documentSlice'

function Document() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams();
  const [status, setStatus] = useState([])


 


 
  const {singleDocument, isLoading, isError, isSuccess, docmessage} = useSelector((state) => state.document)

  const { file, paymentMethod, station} = singleDocument


  function viewStudents(){
    dispatch(GetSingleDocument(id))
    const stations = singleDocument.station
    setStatus(stations)  
    if(stations.length === 0){
      alert("no stations have applied for this job yet")
    }
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
           
            
			{/* {station.length > 0 ? (
          <div className='cat-cards mt-4'> 
            {station.map((stud) => (
              <p>{stud.reasonToBeHired}</p>
            ))}
          </div>
        ) : (
        <h3>No Jobs</h3>
        )} */}
		<button onClick={viewStudents} className="btn btn-primary mt-4 mb-4">View Student Applications</button>
      
      {status.map((station) => (
        <div key={station._id}>
          <b>Status</b>
          <p>{station.message}</p>

         
            
         
        </div>
      ))} 
            <hr/>
           
           
            
          
        </div>
       
      </div>
  </div>
  )
}

export default Document