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
		<h3 className='station-name-card'>{station.stationName}</h3>
	   
		<div className="spacer">
		  <div className="intersnhip-box">
			  <p><b className="primary"> <i className="fa fa-building  ml-2 mr-2" aria-hidden="true"></i>Status: Active</b></p>
		  </div>
		
		</div>
		<div className="spacer">
		  <div className="intersnhip-box">
			  <p><b> <i className="fa fa-building  ml-2 mr-2" aria-hidden="true"></i>Location: cst 3rd floor on the building continous steps</b></p>
		  </div>
		
		</div>
		
		<Link to={`/station/${station.stationName}/${station._id}`}>
			<button className="learn-button mt-4">View Details</button>
		</Link>
		
	  </div>
	</div>
  )
}

export default userDocItem;