import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.userauth,
  );
  
  useEffect(() => {
    if (user != null) {
      navigate('/user/stations');
    }
  
    if (isError) {
      console.log(message);
    }
  
  }, []);

  return (
    <div>
    <div className="banner-area">
      <section className="main container">
        <div className="main-content-area">
          <h3 className="main-heading text-white">Enjoy Fast, Reliable, and Affordable Printing Services on Our Online Platform for CU Students!</h3>
          <Link to='/user/register'>
            <button className="normal-btn-main" type="button">Get Started</button>
          </Link>
        </div>
      </section>
    </div>
  
    <div className="process-section">
      <section className="container">
        <h4 className="section-heading">How It Works</h4>
        <ul>
          <li>Sign up for an account on our website</li>
          <li>Select the documents you want to print and the printing options</li>
          <li>Submit your order and pay online</li>
          <li>Receive a confirmation email with details about your order</li>
          <li>Print your documents at our pickup location on campus</li>
        </ul>
      </section>
    </div>
  
    <div className="why-use-section">
      <section className="container">
        <h4 className="section-heading">Why Use Our Printing Services</h4>
        <ul>
          <li>Convenient online platform for submitting printing orders</li>
          <li>Fast and reliable printing services</li>
          <li>Affordable prices for CU students</li>
          <li>Easy pickup location on campus</li>
        </ul>
      </section>
    </div>
  
    <div className="get-started-section">
      <section className="container">
        <h4 className="section-heading">Get Started</h4>
        <p>To start using our printing services, follow these steps:</p>
        <ol>
          <li>Create an account on our website</li>
          <li>Select the documents you want to print and the printing options</li>
          <li>Submit your order and pay online</li>
          <li>Wait for a confirmation email with details about your order</li>
          <li>Print your documents at our pickup location on campus</li>
        </ol>
      </section>
    </div>
  </div>
  
  )
}

export default Home;