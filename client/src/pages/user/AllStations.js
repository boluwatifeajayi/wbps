import {React, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {getStations, stationreset} from '../../features/stationAuth/stationAuthSlice'
import StationItem from '../../components/app/stationItem'

function AllStations() {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const {stations, isLoading, isError, isSuccess, message} = useSelector((state) => state.stationauth)
  
  useEffect(() => {


    if (isError) {
      console.log(message)
    } 

   
    dispatch(getStations())
    return () => {
      dispatch(stationreset())
    }
  }, [])



  return (
    <div>
    <div className="job-page-search container main-content-area">
<h1>Select A station To get started</h1>
 </div>
 <hr/>
   <section classNameName='content'>
       {stations.length > 0 ? (
         <div className='cat-cards mt-4'> 
           {stations.map((station) => (
             <StationItem station={station}/> 
           ))}
         </div>
       ) : (
         <h3>No Stations</h3>
       )}

     </section>

  

 

    


 </div>
	
  )
}

export default AllStations



