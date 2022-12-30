import {React, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {getDocuments, reset} from '../../features/document/documentSlice'
import DocumentItem from '../../components/app/documentItem'
import userDocItem from '../../components/app/userDocItem'
import axios from 'axios'

function Documents() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState([]);


  const {documents, isLoading, isError, isSuccess, docmessage} = useSelector((state) => state.document)

  const { user } = useSelector((state) => state.userauth)

  const token = user.token

 
  useEffect(() => {

   


    if (isError) {
      console.log(docmessage)
    } 

   
    dispatch(getDocuments())
   
  
    
    async function call(){
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    
      const response =  await axios.get('http://localhost:4070/api/documents/', config)
    
      console.log(response.data)
      setData(response.data);
    }

    return () => {
      dispatch(reset())
      call()
    }
  }, [], )



  return (
	<div>
		 
	<hr/>
		<section classNameName='content'>
    


      {data.map(object => (
        <div key={object.id}>
          <p>{object.file}</p>
           <ul>
            {object.station.map(item => (
              <li key={item.message}>
                <p>{item.message}</p>
                
              </li>
            ))}
          </ul> 
        </div>
      ))}

        

      </section>

	</div>
	
  )
}

export default Documents