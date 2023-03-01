import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import {register, reset} from '../../features/userAuth/userAuthSlice'




function Register() {
  const [formData, setFormData] = useState({
    firstname: '',
	lastname: '',
	matricNumber: '',
	program: '',
	accBalance: 0,
    email: '',
    password: '',
    password2: '',
  })

  const { firstname, lastname, email, matricNumber, program, accBalance, password, password2 } = formData

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
        firstname,
		lastname,
		matricNumber,
		program,
		accBalance,
        email,
        password
      }

      dispatch(register(userData))
    }

  

  if(isLoading){
    return <h1>Loading....</h1>
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
          <p className='mt-4'>Please Create An account to continue</p>
         
          <hr/>
       

        <form className='form' onSubmit={onSubmit}>
        <div className='row'>
              <div className='col'>
              <div className="form-group">
                <input
                  id="name"
                  type="text"
                  name="firstname"
                  placeholder='First Name'
                  onChange={onChange}
                  className="form-input"
                  style={{paddingLeft: 15,}}
                  value={firstname}
                  required
                />
              </div>
              </div>
              <div className='col'>
              <div className="form-group">
                <input
                  id="name"
                  type="text"
                  name="lastname"
                  onChange={onChange}
                  value={lastname}
                  style={{paddingLeft: 15,}}
                  placeholder="Last Name"
                  className="form-input"
                  required
                />
             </div>
              </div>
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
              type='text'
              className='form-control'
              id='matricNumber'
              name='matricNumber'
              value={matricNumber}
              placeholder='Enter your matricNumber'
              onChange={onChange}
            
            />
		
          </div>
          <div className="form-group">
          <input
              type='text'
              className='form-control'
              id='program'
              name='program'
              value={program}
              placeholder='Enter your program'
              onChange={onChange}
            
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
				        {isLoading ? 'Loading...' : 'Register'}
              </b> 
          </button>
         
        </form>

        <span>Already have an account? </span>
        <Link
          to="/user/login"
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

export default Register
