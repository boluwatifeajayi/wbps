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


function App() {
  return (
    <>
    <Router>
      <Header/>
      <div>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user/stations' element={<AllStations/>}/>
        <Route path='/user/register' element={<Register/>}/>
        <Route path='/user/login' element={<Login/>}/>
        <Route path='/station/register' element={<StationRegister/>}/>
        <Route path='/station/login' element={<StationLogin/>}/>
        <Route path='/user/:stationname/:stationid/create/' element={<CreateDocument/>}/>
        <Route path='/user/documents' element={<AllDocuments/>}/>
        <Route path='/station/documents' element={<UserDocuments/>}/>
        <Route path='/station/document/:id' element={<UserDocument/>}/>
        <Route path='/stations' element={<AllStations/>}/>
        <Route path='/station/:stationname/:id' element={<Station/>}/>
        <Route path='/user/document/:id' element={<DocumentTrack/>}/>

       </Routes>
      </div>
    </Router>
    <ToastContainer/>
     
    </>
  );
}

export default App;
