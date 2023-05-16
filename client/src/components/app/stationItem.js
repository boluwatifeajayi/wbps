import React from 'react'
import { Link } from 'react-router-dom'

function userDocItem({station}) {
  return (
	<div>
		<div className="my-custom-card-job">
        
		<div className="spacer">
		  {/* <div className="profile-box">
			  <b className="primary">{job.role}</b>
		  </div> */}
		</div>
		<h1 className='station-name-card'>{station.stationName}</h1>
	   
		<div className="spacer">
		  <div className="intersnhip-box">
			  <p><b className="primary">Status: Active</b></p>
		  </div>
		
		</div>
		<div className="spacer">
		  <div className="intersnhip-box">
			  <p><b> <i className="fa fa-building  ml-2 mr-2" aria-hidden="true"></i>Location:  {station.place}</b></p>
		  </div>

		 
		</div>
		
		<Link to={`/station/${station.stationName}/${station._id}`}>
			<button className="learn-button mt-4">Learn More</button>
		</Link>
		
	  </div>
	</div>
  )
}

export default userDocItem;