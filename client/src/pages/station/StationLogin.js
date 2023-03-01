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
      <div className='container'>
      <div className='row'>
        <div className='col-md-7 hide img-down'>
        <img src="https://s3.amazonaws.com/media.youthradio.org/wp-content/uploads/2020/08/21114957/Youngwomanarguesduringvideoconference.jpg" className="img-contain" alt="logine"/>
        </div>
        <div className='col-md-5 downn'>
        <div className="reg-container">
      <div className="reg-wrapper">
      <h3><b>Login To Your account</b></h3>
          <p className='mt-4'>Please login to your <span className='pinkish'>employer</span> account to continue</p>
         
          <hr/>
       

        <form className='form' onSubmit={onSubmit}>
        <div className='row'>
             
             
            </div>

            <div className="form-group">
            
            <input
              type='stationEmail'
              className='form-control'
              id='stationEmail'
              name='stationEmail'
              value={stationEmail}
              placeholder='Enter your stationEmail'
              onChange={onChange}
            />
          </div>
          
          
         
          <div className="form-group">
          <input
              type='stationPassword'
              className='form-control'
              id='stationPassword'
              name='stationPassword'
              value={stationPassword}
              placeholder='Enter stationPassword'
              onChange={onChange}
            />
          </div>
          
          <button className="normal-btn mt-2 mb-4">
              <b>
				        {isLoading ? 'Loading...' : 'Login'}
              </b> 
          </button>
         
        </form>

        <span>Don't have an account? </span>
        <Link
          to="/employer/register"
          className="secondary"
          style={{ textDecoration: 'none' }}
        >
          Register
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
