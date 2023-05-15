import {React, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {getStations, stationreset} from '../../features/stationAuth/stationAuthSlice'
import StationItem from '../../components/app/stationItem'
import SideBar from '../../components/layout/SideBar'

function AllStations() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {stations, isLoading, isError, isSuccess, message} = useSelector((state) => state.stationauth)

  const {user} = useSelector((state) => state.userauth)

  useEffect(() => {
    if (user === null) {
      navigate('/user/login');
    }

    if (isError) {
      console.log(message);
    }

   

    return () => {
      
      dispatch(stationreset());
    };
  }, []);

  
  useEffect(() => {


    if (isError) {
      console.log(message)
    } 

    dispatch(getStations())
    return () => {
      dispatch(stationreset())
    }
  }, [])

  if(isLoading){
    return <h4 className='text center mt-4 loading'>Loading...</h4>
  }

  return (
    <div>
         <div className="sidebar">
            <SideBar student={user}/>
          </div>
          
    <div className='push-right'>
<h3 className='mt-4'>Printing Stations</h3>

 <hr/>
   <section classNameName='mt-4'>
       {stations.length > 0 ? (
         <div className='cat-cards mt-4'> 
           {stations.map((station) => (
             <StationItem station={station}/> 
           ))}
         </div>
       ) : (
         <h5 className='no-st'>No Stations</h5>
       )}

     </section>


 </div>
  

 

    


 </div>
	
  )
}

export default AllStations



