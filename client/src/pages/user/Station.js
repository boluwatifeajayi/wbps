import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {GetSingleStation, stationreset} from '../../features/stationAuth/stationAuthSlice'


function Station() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id, stationname } = useParams();

  


  

  const {singleStation, isLoading, isError, isSuccess, message} = useSelector((state) => state.stationauth)

  const { stationName, pricePerPageColor, pricePerPageNoColor, stationEmail, priceSpiralBind, services} = singleStation


  
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
    <>
  <div className='container'>
    <Link to="/">
      <button className='btn btn-block  mt-4 mb-4 w-25' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back To Stations</button>
      </Link>
          
   <div className='row gx-5 mx-1'>
        <div className='col-md-12 border-b job-d mb-4'>
       
        <h2 className='mt-4'><b>{stationName}</b></h2>
            
            <h5 className='pinkish'><b><i className='fa fa-building'></i>{" "}location</b></h5> 
            <p className='bigger'><i className="fa fa-map-marker mt-2"></i>{" "} Status : currently collecting documents</p>
            
                       
            <hr/>
            <h2>Prices</h2>
            <div className='row'>
              
              <div className='col'>
                <p className='bigger'><b><i className='fa fa-circle'></i>{" "}Price For Spiral Bind: {priceSpiralBind}</b></p>
              </div>
              <div className='col'>
              <p className='bigger'><b><i className='fa fa-clock'></i>{" "}Price for coloered: {pricePerPageColor}</b></p>
              </div>
              <div className='col'>
              <p className='bigger'><b><i className='fa fa-clock'></i>{" "}Price for no color: {pricePerPageNoColor}</b></p>
              </div>
            </div>
            <hr/>
           
           
            
            <b className='pinkish bigger'>Services</b>
            <p>{services}</p>
            <b className='pinkish bigger'>Email</b>
            <p>{stationEmail}</p>
            
            {/* <b className='pinkish bigger'>Aditional Information</b>
            <p>{additionalInformation}</p> */}

<Link to={'/user/' + stationname + '/create'}>
				<button className="learn-button mt-4">Print Document Now</button>
			</Link>
		
        </div>
        <div className='col-md-0 '>
           <p className='text-white'>......</p>
        </div>
        
      </div>
  </div>
  </>
  )
}

export default Station