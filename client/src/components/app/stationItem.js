import React from 'react'
import { Link } from 'react-router-dom'

function userDocItem({station}) {
  return (
	<div>
		<div className="my-custom-card-document">
        
		
		<h3>{station.stationName}</h3>
	   
		<Link to={`/station/${station.stationName}/${station._id}`}>
			<button className="learn-button mt-4">Learn More</button>
		</Link>
		
	  </div>
	</div>
  )
}

export default userDocItem