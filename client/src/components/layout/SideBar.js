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
      navigate('/');
    } else if (station) {
      navigate('/');
    } else {
      console.log('we have some issues');
    }
  };

  return (
<div>
  <div className="sidebar">
    <Nav className="flex-column">
      <h3>{student.firstname} {student.lastname}</h3>
      <h4>{student.matricNumber}</h4>
      <h5>{student.program}</h5>
	  <div className='mt-4'>
	  <Link to="/" className="nav-link side-item mt-3">
	  <i className="fas fa-desktop mr-2"></i> Printing Stations
      </Link>
      <Link className="nav-link mt-4 side-item" to={station ? '/station/documents' : '/user/documents'}>
        <i className="fas fa-print mr-2"></i> {/* Font Awesome icon */}
        Current Print Jobs
      </Link>
      <Link to="/user/uploaded" className="nav-link mt-4 side-item">
        <i className="fas fa-file-upload mr-2"></i> {/* Font Awesome icon */}
        Uploaded Documents
      </Link>
      <Link className="nav-link cursor-pointer mt-4 side-item" onClick={onLogout}>
        <i className="fas fa-sign-out-alt mr-2"></i> {/* Font Awesome icon */}
        Logout
      </Link>
	  </div>
      
    </Nav>
  </div>
</div>
);
}

export default SideBar;