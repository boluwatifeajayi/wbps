import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import {loginStation, stationreset} from '../../features/stationAuth/stationAuthSlice'




function StationLogin() {
  const [formData, setFormData] = useState({
    stationEmail: '',
    stationPassword: '',  
  })

  const { stationEmail, stationPassword } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {station, isLoading, isError, isSuccess, message} = useSelector((state => state.stationauth)) 

  useEffect (() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || station){
      navigate('/station/documents')
    }

    dispatch(stationreset())
  }, [station, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()


   
      const stationData = {
        stationEmail,
        stationPassword
      }

      dispatch(loginStation(stationData))
    

  }

  if(isLoading){
    return <h1>loading...</h1>
  }

  

  return (
    <>  
      <div className='container reg'>
      <div className='rowi'>
       
        <div>
        <div className="reg-container">
      <div className="reg-wrapper">
      <h3><b>Login To Vendor Account</b></h3>
         
       <hr/>
       

        <form className='form' onSubmit={onSubmit}>
        <div className='row'>
              <div className='col'>
              
              </div>
            </div>

           
          
          
        
       

		         
   
		  <div className="form-group">
            
      <input
              type='text'
              className='form-control'
              id='stationEmail'
              name='stationEmail'
              value={stationEmail}
              placeholder='Enter your Email'
              onChange={onChange}
            />
          </div>
          
          <div className="form-group">
          <input
              type='password'
              className='form-control'
              id='stationPassword'
              name='stationPassword'
              value={stationPassword}
              placeholder='Enter Password'
              onChange={onChange}
            />
          </div>
          
          <button className="normal-btn mt-2 mb-4">
              <b>
				        {isLoading ? 'Loading...' : 'Register'}
              </b> 
          </button>
         
        </form>

        <span>Already have an account? </span>
        <Link
          to="/station/login"
          className="secondary"
          style={{ textDecoration: 'none' }}
        >
          Login
        </Link>
        <br/>
        
      </div>
    </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default StationLogin
