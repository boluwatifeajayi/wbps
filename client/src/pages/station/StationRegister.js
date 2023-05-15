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
          priceSpiralBind: '',
          place: '',
          accountDetails: {
            accountNumber: '',
            bank: '',
            accountName: ''
          }
  })

  const { stationName, stationEmail, stationPassword, services, pricePerPageNoColor, pricePerPageColor, place, priceSpiralBind, accountDetails: { accountNumber, bank, accountName } } = formData

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
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name.startsWith('accountDetails.')) {
        return {
          ...prev,
          accountDetails: {
            ...prev.accountDetails,
            [name.split('.')[1]]: value
          }
        };
      } else {
        return {
          ...prev,
          [name]: value
        };
      }
    });
  };
  

  const onSubmit = (e) => {
    e.preventDefault()

   
    const stationData = {
      stationName,
      stationEmail,
      stationPassword,
      services,
      pricePerPageColor,
      pricePerPageNoColor,
      priceSpiralBind,
      place,
      accountDetails: {
        accountNumber,
        bank,
        accountName
      }
    }
    
    dispatch(registerStation(stationData))
    
    }

  

  if(isLoading){
    return <h2>Loading...</h2>
  }

  

  return (
    <>  
      <div className='container regg'>
      <div className='rowi'>
       
        <div>
        <div className="reg-container">
      <div className="reg-wrapper">
      <h3><b>Create Vendor Account</b></h3>
         
       <hr/>
       

        <form className='form' onSubmit={onSubmit}>
        <div>

        <h5>Information: </h5>
             <hr/>
             
              <div className="form-group">
              <input
              type='text'
              className='form-control'
              id='stationName'
              name='stationName'
              value={stationName}
              placeholder='Enter Name Of Station'
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
                    placeholder='Enter your station email'
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
            
                <input 
                    type='text'
                    className='form-control'
                    id='stationEmail'
                    name='place'
                    value={place}
                    placeholder='Enter Location'
                    onChange={onChange}
                  />
                </div>
             
              <div className="form-group">
              <textarea
              type='text'
              className='form-control'
              id='services'
              name='services'
              value={services}
              placeholder='Enter your services'
              onChange={onChange}
            
            ></textarea>
             </div>

          
             <h5>Pricing (N): </h5>
             <hr/>
             
            
            </div>

            <div className="form-group">
            
            <input
              type='text'
              className='form-control'
              id='pricePerPageColor'
              name='pricePerPageColor'
              value={pricePerPageColor}
              placeholder='Enter the price per page for colored documents '
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
              placeholder='Enter the price per page for non-colored documents '
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
              placeholder='Enter the price For Spiral Bind'
              onChange={onChange}
            
            />
          </div>
          <h5>Account Details: </h5>
             <hr/>

             <div className="form-group">
             <input
              type='text'
              className='form-control'
              id='accountNumber'
              name='accountDetails.accountNumber'
              value={formData.accountDetails.accountNumber}
              placeholder='Enter account number'
              onChange={onChange}
            />

</div>

<div className="form-group">
  <input
    type='text'
    className='form-control'
    id='bank'
    name='accountDetails.bank'
    value={formData.accountDetails.bank}
    placeholder='Enter bank'
    onChange={onChange}
  />
</div>

<div className="form-group">
  <input
    type='text'
    className='form-control'
    id='accountName'
    name='accountDetails.accountName'
    value={formData.accountDetails.accountName}
    placeholder='Enter account name'
    onChange={onChange}
  />
</div>

             
          <h5>Security: </h5>
             <hr/>

          
          <div className="form-group">
          <input
              type='password'
              className='form-control'
              id='stationPassword'
              name='stationPassword'
              value={stationPassword}
              placeholder='Enter Secure Password'
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
