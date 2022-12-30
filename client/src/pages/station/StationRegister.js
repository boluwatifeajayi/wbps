import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import {registerStation, stationreset} from '../../features/stationAuth/stationAuthSlice'



function StationRegister() {
  const [formData, setFormData] = useState({
    stationName: '',
    stationEmail: '',
    stationPassword: '',
    stationPassword2: '',
	services: [],
	pricePerPageColor: 0,
	pricePerPageNoColor: 0,
	priceSpiralBind: 0
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

    if(stationPassword !== stationPassword2){
      toast.error('stationPassword do not match')
    }
    else{
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

  }

  if(isLoading){
    return <h2>LOading...</h2>
  }

  

  return (
    <>
      <section className='heading'>
        <h1>
           Station Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form' onSubmit={onSubmit}>
        <form>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='stationName'
              name='stationName'
              value={stationName}
              placeholder='Enter your stationName'
              onChange={onChange}
            
            />
			 <input
              type='text'
              className='form-control'
              id='services'
              name='services'
              value={services}
              placeholder='Enter your services'
              onChange={onChange}
            
            />
			 <input
              type='text'
              className='form-control'
              id='pricePerPageColor'
              name='pricePerPageColor'
              value={pricePerPageColor}
              placeholder='Enter your color price'
              onChange={onChange}
            
            />
			 <input
              type='text'
              className='form-control'
              id='pricePerPageNoColor'
              name='pricePerPageNoColor'
              value={pricePerPageNoColor}
              placeholder='Enter your station no color'
              onChange={onChange}
            
            />
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
          <div className='form-group'>
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
          <div className='form-group'>
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
          <div className='form-group'>
            <input
              type='stationPassword'
              className='form-control'
              id='stationPassword2'
              name='stationPassword2'
              value={stationPassword2}
              placeholder='Confirm stationPassword'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default StationRegister
