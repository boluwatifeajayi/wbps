import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import {registerStation, stationreset} from '../../features/stationAuth/stationAuthSlice'



function StationRegister() {
  const [formData, setFormData] = useState({
    stationName: '',
    stationEmail: '',
    stationPassword: '',
    
	services: [],
	pricePerPageColor: '',
	pricePerPageNoColor: '',
	priceSpiralBind: ''
  })

  const { stationName, stationEmail, stationPassword, stationPassword2, services, pricePerPageNoColor, pricePerPageColor, priceSpiralBind } = formData

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
        stationName,
        stationEmail,
        stationPassword,
		    services,
		    pricePerPageColor,
		    pricePerPageNoColor,
		  priceSpiralBind
      }

      dispatch(registerStation(stationData))
    }

  

  if(isLoading){
    return <h2>LOading...</h2>
  }

  

  return (
    <>  
      <div className='container'>
      <div className='row'>
        <div className='col-md-7 hide img-down'>
        <img src="https://source.wustl.edu/wp-content/uploads/2018/01/shutterstock_126952187.jpg" className="img-contain" alt="login"/>
        </div>
        <div className='col-md-5 downn'>
        <div className="reg-container">
      <div className="reg-wrapper">
      <h3><b>Get Started</b></h3>
          <p className='mt-4'>Please Create A <span className='pinkish'>employer</span> account to continue</p>
         
          <hr/>
       

        <form className='form' onSubmit={onSubmit}>
        <div className='row'>
              <div className='col'>
              <div className="form-group">
              <input
              type='text'
              className='form-control'
              id='stationName'
              name='stationName'
              value={stationName}
              placeholder='Enter your stationName'
              onChange={onChange}
            
            />
              </div>
              </div>
              <div className='col'>
              <div className="form-group">
              <input
              type='text'
              className='form-control'
              id='services'
              name='services'
              value={services}
              placeholder='Enter your services'
              onChange={onChange}
            
            />
             </div>
              </div>
            </div>

            <div className="form-group">
            
            <input
              type='text'
              className='form-control'
              id='pricePerPageColor'
              name='pricePerPageColor'
              value={pricePerPageColor}
              placeholder='Enter your color price'
              onChange={onChange}
            
            />
          </div>
          
          
          <div className="form-group">
           
          <input
              type='text'
              className='form-control'
              id='pricePerPageNoColor'
              name='pricePerPageNoColor'
              value={pricePerPageNoColor}
              placeholder='Enter your station no color'
              onChange={onChange}
            
            />
          </div>

		  <div className="form-group">
            
      <input
              type='text'
              className='form-control'
              id='priceSpiralBind'
              name='priceSpiralBind'
              value={priceSpiralBind}
              placeholder='Enter your priceSpiralBind'
              onChange={onChange}
            
            />
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

export default StationRegister
