import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StationRegister from './pages/station/StationRegister';
import StationLogin from './pages/station/StationLogin';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import CreateDocument from './pages/user/CreateDocument';
import AllDocuments from './pages/user/AllDocuments';
import UserDocuments from './pages/station/userDocuments'
import UserDocument from './pages/station/userDocument';
import AllStations from './pages/user/AllStations';
import Station from './pages/user/Station';
import DocumentTrack from './pages/user/DocumentTrack';
import Home from './pages/Home'
import Header from './components/layout/Header';
import SideBar from './components/layout/SideBar';
import UploadedDocs from './pages/user/UploadedDocs';
import AllJobs from './pages/station/AllJobs';
import UpdateStation from './pages/station/UpdateStation';



function App() {
 
  return (
    <>
      <Router>
        <Header></Header>
        <div>
     
          <div>
            {/* <Header /> */}
            <div>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/stations" element={<AllStations/>}/>
                <Route path="/user/stations" element={<AllStations />} />
                <Route path="/user/register" element={<Register />} />
                <Route path="/user/login" element={<Login />} />
                <Route path="/station/register" element={<StationRegister />} />
                <Route path="/station/login" element={<StationLogin />} />
                <Route path="/station/jobs" element={<AllJobs />} />
                <Route
                  path="/user/:stationname/:stationid/create/"
                  element={<CreateDocument />}
                />
                <Route path="/user/documents" element={<AllDocuments />} />
                <Route path="/user/uploaded" element={<UploadedDocs/>} />
                <Route path="/station/documents" element={<UserDocuments />} />
                <Route path="/station/document/:id" element={<UserDocument />} />
                <Route path="/stations" element={<AllStations />} />
                <Route path="/station/:stationname/:id" element={<Station />} />
                <Route path="/user/document/:id" element={<DocumentTrack />} />
                <Route path="/station/update" element={<UpdateStation />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
