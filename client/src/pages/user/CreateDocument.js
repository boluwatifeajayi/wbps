import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createDocument } from "../../features/document/documentSlice";
import { useNavigate, Link, useParams } from "react-router-dom";

const CreateDocument = () => {
    const navigate = useNavigate()
	const { stationname } = useParams();
	const [formData, setFormData] = useState({
		file: '',
		noOfCopies: 1,
		noOfPages: 1,
		isSpiralBind: false,
		isColored: false,
		additionalInformation: '',
		status: 'pending',
		paymentMethod: '',
		thestation: stationname
	})
    
	const {file, noOfCopies, noOfPages, isSpiralBind, isColored, additionalInformation, paymentMethod, thestation} = formData;

	const dispatch = useDispatch()

	const onChange = (name,value) => setFormData((prevProfile)=>({...prevProfile,[name]:value}));

     

    const onSubmit = (e) => {
        e.preventDefault();
		const documentData = {
			file, noOfCopies, noOfPages, isSpiralBind, isColored, additionalInformation, thestation, paymentMethod
		}
		dispatch(createDocument(documentData)) 

        navigate('/employer/internships')
		// console.log(typeof(stationname))
    }

    

    return (

        <div className="container2">
             <Link to="/employer/internships">
      <button className='btn btn-block  mt-4 mb-4 w-25' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back</button>
      </Link>
            <h2 class="text-center">Create A New Internship</h2>
		<hr/>
            <form onSubmit={onSubmit}>
            <div class="row mt-4">
            <div class="col-md-4">
				<div className="form-group create-form">
				<input
					type='text'
					placeholder='file'
					name='file'
                    value={file}
                    onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>
				<input
					type='text'
					placeholder='copies'
					className="form-input mb-4"
                    name='noOfCopies'
                    value={noOfCopies}
                    onChange={(e)=>{onChange(e.target.name,e.target.value)}}
                    required
            	/>
				<div class="row">
					<div class="col-md">
						<input
							type='text'
							placeholder='Number Of pages'
                            name="noOfPages"
							value={noOfPages}
                            onChange={(e)=>{onChange(e.target.name,e.target.value)}}
							className="form-input mb-4"
							required
            			/>
					</div>
					<div class="col-md">
						<input
							type='text'
							placeholder='spiral bind'
							name='isSpiralBind'
                            value={isSpiralBind}
                            onChange={(e)=>{onChange(e.target.name,e.target.value)}}
							className="form-input mb-4"
							required
            			/>
					</div>
				</div>
				<div class="row">
					<div class="col-md">
						<input
							type='text'
							placeholder='colored'
							name='isColored'
                            value={isColored}
                            onChange={(e)=>{onChange(e.target.name,e.target.value)}}
							className="form-input mb-4"
							required
            			/>
					</div>
					<div class="col-md">
						<input
							type='text'
							placeholder='payment'
							name='paymentMethod'
                            value={paymentMethod}
                            onChange={(e)=>{onChange(e.target.name,e.target.value)}}
							className="form-input mb-4"
							required
            			/>
					</div>
				</div>
				
				
				</div>
		    </div>
			</div> 
      <div>
        <center>
        <input
          type='submit'
          value='Create'
          className='btn btn-danger btn-block mb-4 w-50'
        />
        </center>
        
      </div>
    </form>
        </div>

        
    )
};

export default CreateDocument;