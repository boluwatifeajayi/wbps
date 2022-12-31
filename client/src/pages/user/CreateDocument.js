import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDocument } from "../../features/document/documentSlice";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

const CreateDocument = () => {
	const inputRef = useRef();
	const [progress, setProgress] = useState(0);
	const [progressShow, setProgressShow] = useState(false)
	const navigate = useNavigate()
	const { stationname } = useParams();
	const [uploading, setUploading] = useState(false)
	const [docItem, setDocItem] = useState("minidoc");
	const [noOfCopies, setnoOfCopies] = useState(1);
	const [noOfPages, setnoOfPages] = useState(1);
	const [isSpiralBind, setisSpiralBind] = useState(false);
	const [isColored, setisColored] = useState(false);
	const [additionalInformation, setadditionalInformation] = useState('info');
	const [status, setstatus] = useState('pending');
	const [paymentMethod, setpaymentMethod] = useState('yippy');
	const [thestation, setthestation] = useState(stationname);

    
	const { user } = useSelector((state) => state.userauth)

 	const token = user.token
	

	

	const dispatch = useDispatch()

	
		const headers = {
		  Authorization: `Bearer ${token}`,
		 
		}
	 
		// const headers2 = {
		// 	Authorization: `Bearer ${token}`,
		//   }
	   
	

	  

	 


	  const uploadFileHandler = async (e) => {
		
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('docItem', file)
		setUploading(true)
	
		try {
		  
		  const { data } = await axios.post('/api/upload', formData, {headers})
	
		  setDocItem(data)
		  setUploading(false)
		} catch (error) {
		  console.error(error)
		  setUploading(false)
		}
	  }

	const submit = async (e) => {
		e.preventDefault();
		
		const body = {docItem, noOfCopies, noOfPages, isSpiralBind, isColored, additionalInformation, status, paymentMethod, thestation}

	    axios.post('/api/documents/create', body, {headers} ).then((response) => {
            console.log("response", response);
          })
          .catch((error) => {
            
            console.error("error >>> ", error);
          });
	}
     

    // const onSubmit = (e) => {
    //     e.preventDefault();
	// 	const documentData = {
	// 		file, noOfCopies, noOfPages, isSpiralBind, isColored, additionalInformation, thestation, paymentMethod
	// 	}
	// 	dispatch(createDocument(documentData)) 

    //     navigate('/employer/internships')
	// 	// console.log(typeof(stationname))
    // }

    

    return (

        <div className="container2">
             <Link to="/employer/internships">
      <button className='btn btn-block  mt-4 mb-4 w-25' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back</button>
      </Link>
            <h2 class="text-center">Create A New Internship</h2>
		<hr/>
            <form onSubmit={submit}>
            <div class="row mt-4">
            <div class="col-md-4">
				<div className="form-group create-form">
				{/* <input
					type='file'
					placeholder='file'
					name='file'
					onChange={handleFileChange} 
					className="form-input mb-4"
					required
            	/> */}
				<Form.Group controlId='image'>
              <Form.Label>File</Form.Label>
              {/* <Form.Control
                type='text'
                placeholder='Enter image url'
                value={docItem}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control> */}
              <Form.File
                id='image-file'
                label='Choose File'
                type='file'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <h1>Loading...</h1>}
            </Form.Group>
				<input
					type='text'
					placeholder='copies'
					className="form-input mb-4"
                    name='noOfCopies'
                    value={noOfCopies}
                    onChange={(e) => setnoOfCopies(e.target.value)}
                    required
            	/>
				<div class="row">
					<div class="col-md">
						<input
							type='text'
							placeholder='Number Of pages'
                            name="noOfPages"
							value={noOfPages}
                            onChange={(e) => setnoOfPages(e.target.value)}
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
                            onChange={(e) => setisSpiralBind(e.target.value)}
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
                            onChange={(e) => setisColored(e.target.value)}
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
							onChange={(e) => setpaymentMethod(e.target.value)}
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