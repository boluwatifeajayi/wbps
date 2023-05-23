import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/userAuth/userAuthSlice';
import { logoutStation, stationreset } from '../../features/stationAuth/stationAuthSlice';
import { Nav } from 'react-bootstrap';


function StationSide({student}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userauth);
  const { station } = useSelector((state) => state.stationauth);
  const [isMounted, setIsMounted] = useState(false);

  const onLogout = () => {
    if (user) {
      dispatch(logout())
      dispatch(reset())
      navigate('/');
    } else if (station) {
      dispatch(logoutStation())
      dispatch(stationreset())
      navigate('/station/login');
    } else {
      console.log('we have some issues');
    }
  };

  return (
<div>
  <div className="sidebar">
    <Nav className="flex-column">
      <h3>{student?.stationName}</h3>
      <h6>{student?.place}</h6>
	  <div className='mt-4'>
	  <Link to="/station/documents" className="nav-link side-item mt-3">
	  <i className="fas fa-desktop mr-2"></i> Pending Jobs
      </Link>
      <Link className="nav-link mt-4 side-item" to={station ? '/station/jobs' : '/'}>
        <i className="fas fa-print mr-2"></i> {/* Font Awesome icon */}
        	All Jobs
      </Link>
      <Link to="/station/update" className="nav-link mt-4 side-item">
        <i className="fas fa-user mr-2"></i> {/* Font Awesome icon */}
        	Update Account
      </Link>
      <Link to="/station/update" className="nav-link mt-4 side-item">
        <i className="fas fa-question-circle mr-2"></i> {/* Font Awesome icon */}
        	Help
      </Link>
      <span className="nav-link log cursor-pointer mt-4 side-item" onClick={onLogout}>
        <i className="fas fa-sign-out-alt mr-2"></i> {/* Font Awesome icon */}
        	LOGOUT
      </span>
	  </div>
      
    </Nav>
  </div>
</div>
);
}

export default StationSide;