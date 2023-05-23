import React from 'react'
import { Link } from 'react-router-dom'

function userDocItem({station}) {
  return (
	<div className='stat'>
		<Link to={`/station/${station.stationName}/${station._id}`}>
		<div className="my-custom-card-job">
        
		<div className="spacer">
		  {/* <div className="profile-box">
			  <b className="primary">{job.role}</b>
		  </div> */}
		</div>
		<h4 className='station-name-card'>{station.stationName}</h4>
	   
		<div className="spacer">
		  <div className="intersnhip-box">
			  <p className='text-success'>Active</p>
		  </div>
		
		</div>
		<div className="spacer">
		  <div className="intersnhip-box">
			  <p>{station.place}</p>
		  </div>

		 
		</div>
		
		{/* <Link to={`/station/${station.stationName}/${station._id}`}>
			<button className="learn-button mt-4">Learn More</button>
		</Link> */}
		
	  </div>
	  </Link>
	</div>
  )
}

export default userDocItem;