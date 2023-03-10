import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
// import { Badge } from 'reactstrap';




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
        <h3 className="main-heading text-white">Enjoy Fast, Reliable, and Affordable Document Printing Services on Our Online Platform for Covenant University Students!"</h3>
       

       
            <Link to='/user/register'>
               <button className="normal-btn-main" type="button">Get Started</button>
            </Link>
            
         
       
      </div>
    </section>
       
    </div>

    </div>
  )
}

export default Home;