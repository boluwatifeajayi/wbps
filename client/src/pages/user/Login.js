import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import {login, reset} from '../../features/userAuth/userAuthSlice'



function Login() {

  const [formData, setFormData] = useState({
   
    email: '',
    password: '',
   
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state => state.userauth)) 

  useEffect (() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

   
      const userData = {
        email,
        password
      }

      dispatch(login(userData))
    }
  

  if(isLoading){
    return <h1>Loading..</h1>
  }


  

  return (
    <>
      <section className='heading'>
        <h1>
         Login
        </h1>
        <p>Please login to your account</p>
      </section>

      <section className='form' onSubmit={onSubmit}>
        <form>
        
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
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

export default Login
