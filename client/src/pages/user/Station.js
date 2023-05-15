import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {GetSingleStation, stationreset} from '../../features/stationAuth/stationAuthSlice'
import { formatDistanceToNow } from 'date-fns'
import SideBar from '../../components/layout/SideBar'


function Station() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id, stationname } = useParams();

  
  const { user } = useSelector((state) => state.userauth);

  

  const {singleStation, isLoading, isError, isSuccess, message} = useSelector((state) => state.stationauth)

  const { stationName, _id, pricePerPageColor, pricePerPageNoColor, stationEmail, place, priceSpiralBind, lastActiveAt,services, accountDetails } = singleStation


  
  useEffect(() => {

    if (isError) {
      console.log(message)
    } 

    
    dispatch(GetSingleStation(id))
      
  
    return () => {
      dispatch(stationreset())
    }
  }, [dispatch, navigate, message, isError, GetSingleStation])

  function dateFormatter(dateItem) {
    return formatDistanceToNow(new Date(dateItem), { addSuffix: true });
  }



  if(isLoading){
    return <h1 className='loading'>Loading...</h1>
  }

  

  return (
    <>
     <div className="sidebar">
            <SideBar student={user}/>
          </div>
  <div className='push-right'>
    <Link to="/">
      <button className='btn btn-block  mt-4 mb-4 w-25' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back To Stations</button>
      </Link>
          
   <div className='row gx-5 mx-1'>
        <div className='col-md-12 border-b job-d mb-4'>
       
        <h2 className='mt-4'><b>{stationName}</b></h2>
            
            <h5 className='pinkish'><b><i className='fa fa-building'></i>{" "}location: {place}</b></h5> 
            <p className='bigger'><i className="fa fa-map-marker mt-2"></i>{" "} Status : currently collecting documents</p>
            
                       
            <hr/>
            <h5>Prices</h5>
            <div className='row'>
              
              <div className='col'>
                <p className='bigger'><b><i className='fa fa-circle'></i>{" "}Price For Spiral Bind: {priceSpiralBind}</b></p>
              </div>
              <div className='col'>
              <p className='bigger'><b><i className='fa fa-clock'></i>{" "}Price for colored: {pricePerPageColor}</b></p>
              </div>
              <div className='col'>
              <p className='bigger'><b><i className='fa fa-clock'></i>{" "}Price for no color: {pricePerPageNoColor}</b></p>
              </div>
            </div>
            <hr/>

            <h5>Account details </h5>
            <div className='row'>
              
              <div className='col'>
                <p className='bigger'><b><i className='fa fa-circle'></i>{" "}Acct No: {accountDetails?.accountNumber}</b></p>
              </div>
              <div className='col'>
              <p className='bigger'><b><i className='fa fa-clock'></i>{" "}Bank: {accountDetails?.bank}</b></p>
              </div>
              <div className='col'>
              <p className='bigger'><b><i className='fa fa-clock'></i>{" "}Acct Name: {accountDetails?.accountName}</b></p>
              </div>
            </div>
            <hr/>
           
           
            {/* <p>{dateFormatter(lastActiveAt?.toString())}</p> */}

            {lastActiveAt ?  <p>Active {dateFormatter(lastActiveAt?.toString())} ago</p> : <p>Loading...</p>}
           
            
            <b className='pinkish bigger'>Services</b>
            <p>{services}</p>
            <b className='pinkish bigger'>Email</b>
            <p>{stationEmail}</p>
            
           

<Link to={`/user/${stationname}/${_id}/create`}>
				<button className="learn-button mt-4">Print Document Now</button>
			</Link>
		
        </div>
        <div className='col-md-0 '>
           <p className='text-white'>....</p>
        </div>
        
      </div>
  </div>
  </>
  )
}

export default Station