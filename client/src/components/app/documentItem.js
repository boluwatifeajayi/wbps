import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function DocumentItem({document}) {


	// function bar(){
	// 	if(document.station !== []){
	// 		console.log('not empty')
	// 	}
	// 	else{
	// 		console.log('its empty')
	// 	}
	// }
	
	

	
	
  return (
	<div>
		<div className="my-custom-card-document">
        
		
		<h3>{document.file}</h3>
		
		
		<section classNameName='content'>
        

      </section>

		
		
		<Link to={`/user/document/${document._id}`}>
			<button className="learn-button mt-4">Track</button>
		</Link>
		
	  </div>
	</div>
  )
}

export default DocumentItem