import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'
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
      navigate('/user/stations')
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
    return <h1 className='loading'>Loading....</h1>
  }


  

  return (
    <>
    <div className='container reg'>
    <div className='rowi'>
      <div>
      <div className="reg-container">
    <div className="reg-wrapper">
    <h2><b>Sign In</b></h2>
        <p className='mt-4'>Please login to your account to continue</p>
       
        <hr/>
     

      <form className='form' onSubmit={onSubmit}>
      <div className='row'>
            
          </div>

          <div className="form-group">
          
          <input
            id="email"
            type="email"
            name="email"
            onChange={onChange}
            value={email}
            style={{paddingLeft: 15,}}
            className="form-input"
            placeholder="Email"
            required
          />
        </div>
        
        
        
        
        
        <div className="form-group">
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            style={{paddingLeft: 15,}}
            onChange={onChange}
            className="form-input"
            required
            minLength="6"
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
        to="/user/register"
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

export default Login
