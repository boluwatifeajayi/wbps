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

  if(isLoading){
    return <h4 className='text center mt-4 loading'>Loading...</h4>
  }

  return (
    <div>
    <div className="job-page-search container main-content-area">
<h1 className='mt-4'>Printing Vendors At Covenant University</h1>
 </div>
 <hr/>
   <section classNameName='content mt-4'>
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
	
  )
}

export default AllStations



