import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
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

    if(password !== password2){
      toast.error('password do not match')
    }
    else{
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

  }

  if(isLoading){
    return <h1>Loading....</h1>
  }

  

  return (
    <>
      <section className='heading'>
        <h1>
           Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form' onSubmit={onSubmit}>
        <form>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='firstname'
              name='firstname'
              value={firstname}
              placeholder='Enter your firstname'
              onChange={onChange}
            
            />
			 <input
              type='text'
              className='form-control'
              id='lastname'
              name='lastname'
              value={lastname}
              placeholder='Enter your lastname'
              onChange={onChange}
            
            />
			 <input
              type='text'
              className='form-control'
              id='matricNumber'
              name='matricNumber'
              value={matricNumber}
              placeholder='Enter your matricNumber'
              onChange={onChange}
            
            />
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
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
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

export default Register
