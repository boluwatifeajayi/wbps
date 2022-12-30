import React from 'react'
import { Link } from 'react-router-dom'

function userDocItem({document}) {
  return (
	<div>
		<div className="my-custom-card-document">
        
		
		<h3>{document.file}</h3>
	   
		
		
		<Link to={`//document/${document._id}`}>
			<button className="learn-button mt-4">Learn More</button>
		</Link>
		
	  </div>
	</div>
  )
}

export default userDocItem