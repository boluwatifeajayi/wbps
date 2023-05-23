import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/userAuth/userAuthSlice';
import { logoutStation, stationreset } from '../../features/stationAuth/stationAuthSlice';
import { Nav } from 'react-bootstrap';


function SideBar({student}) {
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
      navigate('/');
    } else {
      console.log('we have some issues');
    }
  };

  return (
<div>
  <div className="sidebar">
    <Nav className="flex-column">
      <h4 className='initial'>{student?.firstname} {student?.lastname}</h4>
      <h6>{student?.matricNumber}</h6>
      <h6>{student?.program}</h6>

      <hr className='bg-white'/>
	  <div className='mt-4'>
	  <Link to="/" className="nav-link side-item mt-3">
	  <i className="fas fa-desktop mr-2"></i> Printing Vendors
      </Link>
      <Link className="nav-link mt-4 side-item" to={station ? '/station/documents' : '/user/documents'}>
        <i className="fas fa-print mr-2"></i> {/* Font Awesome icon */}
        Current Print Jobs
      </Link>
      <Link to="/user/uploaded" className="nav-link mt-4 side-item">
        <i className="fas fa-file-upload mr-2"></i> {/* Font Awesome icon */}
        Uploaded Documents
      </Link>
      <Link to="/user/uploaded" className="nav-link mt-4 side-item">
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

export default SideBar;