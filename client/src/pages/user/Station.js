import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {GetSingleStation, stationreset} from '../../features/stationAuth/stationAuthSlice'


function Station() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id, stationname } = useParams();

  


  

  const {singleStation, isLoading, isError, isSuccess, message} = useSelector((state) => state.stationauth)

  const { stationName, pricePerPageColor} = singleStation


  
  useEffect(() => {

    if (isError) {
      console.log(message)
    } 

    
    dispatch(GetSingleStation(id))
      
  
    return () => {
      dispatch(stationreset())
    }
  }, [dispatch, navigate, message, isError, GetSingleStation])


  

  return (
	<div className='container'>
    <Link to="/internships">
      <button className='btn btn-block  mt-4 mb-4 w-25' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back To Interships</button>
      </Link>
          
   <div className='row gx-5 mx-1'>
        <div className='col-md-7 border-b station-d mb-4'>
       
        <h2 className='mt-4'><b>{stationName}</b></h2>
            
            <h5 className='pinkish'><b><i className='fa fa-building'></i>{" "}{pricePerPageColor}</b></h5> 


           
            
			<Link to={'/user/' + stationname + '/create'}>
				<button className="learn-button mt-4">Print A document</button>
			</Link>
		

          
            <hr/>
           
           
            
          
        </div>
       
      </div>
  </div>
  )
}

export default Station