import {React, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {stationDocuments, reset} from '../../features/document/documentSlice'
import UserDocItem from '../../components/app/userDocItem'

function Documents() {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const {documents, isLoading, isError, isSuccess, docmessage} = useSelector((state) => state.document)

  const { station } = useSelector((state) => state.stationauth)

  const stname = station.stationName

 

  
  
  useEffect(() => {


    if (isError) {
      console.log(docmessage)
    } 

    

   
    dispatch(stationDocuments(stname))

    
  

    return () => {
      dispatch(reset())
    }
  }, [])



  return (
	<div>
		 
	<hr/>
		<section classNameName='content'>
        {documents.length > 0 ? (
          <div className='cat-cards mt-4'> 
            {documents.map((document) => (
              
              // <UserDocItem document={document}/> 
              <div>
                 <h3>{document.file}</h3>
		
                <Link to={`/station/document/${document._id}`}>
                  <button className="learn-button mt-4">Learn More</button>
                </Link>
              </div>
             
              
            ))}
          </div>
        ) : (
          <h3>No Documents</h3>
        )}

      </section>

	</div>
	
  )
}

export default Documents