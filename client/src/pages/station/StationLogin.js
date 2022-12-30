import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
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
      navigate('/station/dashboard')
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
      <section className='heading'>
        <h1>
       		Station Login
        </h1>
        <p>Please login to your an account</p>
      </section>

      <section className='form' onSubmit={onSubmit}>
        <form>
          
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
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default StationLogin
