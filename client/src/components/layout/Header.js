import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/userAuth/userAuthSlice';
import { logoutStation, stationreset } from '../../features/stationAuth/stationAuthSlice';


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userauth);
  const { station } = useSelector((state) => state.stationauth);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    return () => {
      if (user) {
        dispatch(logout());
        dispatch(reset());
      } else if (station) {
        dispatch(logoutStation());
        dispatch(stationreset());
      }
    };
  }, [dispatch, station, user, isMounted]);

  const onLogout = () => {
    if (user) {
      dispatch(logout());
      dispatch(reset());
      navigate('/');
    } else if (station) {
      dispatch(logoutStation());
      dispatch(stationreset());
      navigate('/');
    } else {
      console.log('we have some issues');
    }
  };

  return (
    <div>
      <header className="sticky-top navy">
        <Link to='/'>
          <h5 className='logo'>
            early<span className='primary'>office</span>
          </h5>
        </Link>

        <nav>
          <ul className='nav_link'>
            {station ? (
              ''
            ) : (
              <span>
                <li>
                  <Link to='/internships'>Internships</Link>
                </li>
                <li>
                  <Link to='/internships/categories'>Categories</Link>
                </li>
                <li>
                  <Link to='/internships/locations'>Locations</Link>
                </li>
                <li>
                  <Link to='/companies/all'>Companies</Link>
                </li>
                <li>
                  <Link to='/blog'>Blog</Link>
                </li>
              </span>
            )}
          </ul>
        </nav>

        <div>
          {user || station ? (
            <div className='prof'>
              <Link className='text-primary' to={station ? '/station/documents' : '/user/documents'}>
                <i className='fas disp fa-user mr-2'></i>
                <b>
                  {' '}
                  <span className='disp'>Dashboard</span>
                  
                </b>{' '}
              </Link>
              <button className='btn' onClick={onLogout}>
                <i className='fas fa-sign-out-alt mr-1'></i>
                <b className='primary ml-2 disp'>Logout</b>
              </button>
            </div>
          ) : (
            <>
              <Link to='/user/login' className='cta-outline'>
                <button className='log-btn'>Login</button>
              </Link>
              <Link to='/user/register' className='cta-small'>
              <button className='reg-btn'>Register</button>
		</Link>
	</>
	)}
	</div>
 </header>
</div>
);
}

export default Header;