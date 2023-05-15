import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import {GetSingleStation, stationreset, updateStation} from '../../features/stationAuth/stationAuthSlice'
import StationSide from "../../components/layout/StationSide";


const UpdateStation = () => {
    const navigate = useNavigate()
	const dispatch = useDispatch()
  	

	 


	  const {singleStation, station, isLoading, isError, isSuccess, message} = useSelector((state) => state.stationauth)

	  const id  = station?._id; 

	

	

	useEffect(() => {
		const getSingleStation = async () => {
		  dispatch(GetSingleStation(id));
		};
	  
		getSingleStation();
	  
		return () => {
		  dispatch(stationreset());
		};
	  }, [dispatch, id]);
	  
	  useEffect(() => {
		if (isError) {
		  console.log(message);
		}
	  }, [isError, message, singleStation]);
	  
	  const [formData, setFormData] = useState({});
	  
	  useEffect(() => {
		if (singleStation) {
		  setFormData({
			stationName: singleStation.stationName,
			place: singleStation.place,
			services: singleStation.services,
			pricePerPageColor: singleStation.pricePerPageColor,
			pricePerPageNoColor: singleStation.pricePerPageNoColor,
			priceSpiralBind: singleStation.priceSpiralBind
		  });
		}
	  }, [singleStation]);
	  
    
	const {stationName, place, services, pricePerPageColor, pricePerPageNoColor, priceSpiralBind} = formData;


	const onChange = (name,value) => setFormData((prevProfile)=>({...prevProfile,[name]:value}));

	

	const onSubmit = async (e) => {
		e.preventDefault();
		const updatedStationData = {
		 stationName,
		 place,
		 services, 
		 pricePerPageColor,
		 pricePerPageNoColor,
		 priceSpiralBind
		};
		
		try {
		  await dispatch(updateStation({ stationId:id, updatedStationData }));
		  // If createStation is successful, navigate to '/admin/stations'
		  alert("Station Updated")
		  navigate(-1);
		 
		} catch (error) {
		  console.error('Error creating station:', error);
		  alert('Error creating station:', error)
		}
	  };
	  


	if(isLoading){
		return <h1 className='loading'>
		loading
	  </h1>
	}


	
    return (

		<div>
			  <StationSide student={station}/>
			 <div className="push-right">
     
     
            <h2 className="mt-4">Update Account Information</h2>
		
            <form onSubmit={onSubmit} className="border-b regic">
            <div>
            <div>
				<div className="form-group create-form">
				<p>Station Name</p>
				<input
					type='text'
					placeholder='Station Name'
					name='stationName'
                    value={stationName}
                    onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>
				
				</div>
				<div className="form-group create-form">
				<p>Station Location</p>
				<input
					type='text'
					placeholder='station location'
					name='place'
                    value={place}
                    onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>
				
				</div>
		    </div>
			<div>
			<p>Station Servcies</p>
			<input
					type='text'
					placeholder='Services'
					name='services'
					value={services}
					onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>
						
		    </div>
			<div>
			
			 
			
				<div className="form-group create-form">
				<p>Price Per page color</p>
				<input
					type='number'
					placeholder='price per page color'
					name='pricePerPageColor'
                    value={pricePerPageColor}
                    onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>
				
				</div>

				<div className="form-group create-form">
				<p>Price per page no color</p>
				<input
					type='number'
					placeholder='price per page No color'
					name='pricePerPageNoColor'
                    value={pricePerPageNoColor}
                    onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>
				
				</div>

				<div className="form-group create-form">
				<p>Price of spiral bind</p>
				<input
					type='number'
					placeholder='price spiral Bind'
					name='priceSpiralBind'
                    value={priceSpiralBind}
                    onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>
				
				</div>

            </div>
            </div>
            
      <div>
        <center>
        <input
          type='submit'
          value='Update'
          className='normal-btn mb-4'
        />
        </center>
        
      </div>
    </form>
        </div>
		</div>
     

        
    )
};

export default UpdateStation;