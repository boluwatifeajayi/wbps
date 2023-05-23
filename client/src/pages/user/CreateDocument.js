import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleStation, stationreset } from "../../features/stationAuth/stationAuthSlice";
import { GetSingleDocument } from "../../features/document/documentSlice";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import SideBar from "../../components/layout/SideBar";

const CreateDocument = () => {
	const inputRef = useRef();
	const [progress, setProgress] = useState(0);
	const [progressShow, setProgressShow] = useState(false)
	const navigate = useNavigate()
	const { stationname, stationid } = useParams();
	const {singleStation, isLoading, isError, isSuccess, message} = useSelector((state) => state.stationauth)
	const [docItem, setDocItem] = useState("");
	
	const [noOfCopies, setnoOfCopies] = useState();
	const [noOfPages, setnoOfPages] = useState();
	const [isSpiralBind, setisSpiralBind] = useState();
	const [isColored, setisColored] = useState();
	const [additionalInformation, setadditionalInformation] = useState('');
	const [status, setstatus] = useState('pending');
	const [total, settotal] = useState(0);
	const [paymentMethod, setpaymentMethod] = useState('cash on delivery');
	const [thestation, setthestation] = useState(stationname);
	const [selectedFile, setSelectedFile] = useState(null);
	const [uploading, setUploading] = useState(false)
	const [docName, setDocName] = useState("");

	const [pageCount, setPageCount] = useState(0);


	const allowedFileTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
    
	const { user } = useSelector((state) => state.userauth)
 	const token = user.token
	
	 
	const dispatch = useDispatch()
	useEffect(() => {

		if (isError) {
		  console.log(message)
		} 

		if(!user){
			navigate('/user/login')
		}
	
		
		dispatch(GetSingleStation(stationid))
		  
	  
		return () => {
		  dispatch(stationreset())
		}
	  }, [dispatch, navigate, message, isError, GetSingleStation])

	
		const headers = {
		  Authorization: `Bearer ${token}`,
		 
		}

	
	  const uploadFileHandler = async (e) => {

		const file = e.target.files[0]
		if (file && allowedFileTypes.includes(file.type)) {
   		setSelectedFile(file);
		setDocName(file.name);
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

	} else {
		setSelectedFile(null)
		setUploading(false)
		alert('File type not supported! Please choose a different file.')
	  }
	  }

	  function handlePaymentMethodChange(e) {
		setpaymentMethod(e.target.value);
	  }

	const submit = async (e) => {
		e.preventDefault();
		
		const body = {docItem, docName, noOfCopies, noOfPages, isSpiralBind, isColored, additionalInformation, status, paymentMethod, thestation}
		
	    axios.post('/api/documents/create', body, {headers} ).then((response) => {
            console.log("response", response);
          })
          .catch((error) => {
            
            console.error("error >>> ", error);
          });
		  navigate('/user/documents')
	}

	

	const updateTotal = () => {
		let newTotal = 0;
		const pricePerPage = isColored ? singleStation.pricePerPageColor : singleStation.pricePerPageNoColor;
		const priceSpiralBind = isSpiralBind ? singleStation.priceSpiralBind : 0;
		const totalPages = parseInt(noOfPages) || 0;
		const totalCopies = parseInt(noOfCopies) || 0;
		
		newTotal += pricePerPage * totalPages * totalCopies;
		newTotal += priceSpiralBind * totalCopies;
		
		settotal(newTotal);
		console.log(newTotal);
	  };
	  

     

    

    

    return (

	<div>
		 <div className="sidebar">
		 <SideBar student={user}/>
          </div>
		  {/* <Link to="/">
      	<button className='btn btn-sm  mt-4 mb-4 w-25' style={{backgroundColor: '#d9dce2'}}> 
		 <i className='fa fa-arrow-left'></i>
		</button>
      </Link> */}
    <div className="push-right regila regic2">
     

	
        <h4>Upload Your Document</h4>
		 <hr/>
            <form onSubmit={submit}>
            	<div class="row mt-4">
            		<div class="col-md-12">
						<div className="form-group create-form">
						<Form.Group controlId='image'>
							<Form.File
								id='image-file'
								label={selectedFile ? selectedFile.name : 'Choose File'}
								type='file'
								custom
								accept=".docx,.dot,.doc,.pdf,.pptx"
								onChange={uploadFileHandler}
							/>
							{uploading && <p>Loading...</p>}
						</Form.Group>
				{/* {selectedFile && setDocName(selectedFile.name)} */}
				<div class="row">
					<div class="col-md">
					 <select
						name='isColored'
						value={isColored}
						onChange={(e) => {
							setisColored(e.target.value);
							updateTotal();
						}}
						className='form-input mb-4'
						required
					 >
						<option value=''>--Select Color--</option>
						<option value='yes'>No (+N{singleStation.pricePerPageNoColor} per page)</option>
						<option value='no'>Yes (+N{singleStation.pricePerPageColor} per page)</option>
                	</select>
				</div>


				<div class="col-md">
				<select
                  name='isSpiralBind'
				  value={isSpiralBind}
				  onChange={(e) => {
					setisSpiralBind(e.target.value);
					updateTotal();
				  }}
				  className='form-input mb-4'
				  required
				>
					<option value=''>-- Spiral bind --</option>
					<option value='yes'>Yes (+{singleStation.priceSpiralBind})</option>
					<option value='no'>No</option>
                </select>
						
					</div>

				</div>
				<div class="row">
					<div class="col-md">
					<input
						type='number'
						placeholder='Number Of pages'
						name='noOfPages'
						value={noOfPages}
						onChange={(e) => {
							setnoOfPages(e.target.value);
							updateTotal();
						
						}}
						className='form-input mb-4'
						required
			  		/>
					</div>
			<div className="col-md">
			<input
				type='number'
				placeholder='Number Of Copies'
				name='noOfCopies'
				value={noOfCopies}
				onChange={(e) => {
				setnoOfCopies(e.target.value);
				updateTotal();
				}}
				className='form-input mb-4'
				required
			/>
			</div>
			</div>
				
			
			<select
					name="paymentMethod"
					value={paymentMethod}
					onChange={handlePaymentMethodChange}
					className="form-input mb-4"
					required
    			  >
					<option value="">Select payment method</option>
					<option value="Payment On Pick Up">Payment On Pick Up</option>
					<option value="Online account">Online account</option>
					<option value="Direct Transfer">Direct Transfer</option>
     			 </select> 
			{/* <input type='text' placeholder='Total' name='total' value={total} readOnly className='form-input mb-4' /> */}
			
		</div>
		</div>
	</div> 
    <div>
	{/* <input
				type='number'
				placeholder='Additional information'
				name='docName'
				value={docName}
				onChange={(e) => {
				setDocName(e.target.value);
				updateTotal();
				}}
				className='form-input mb-4'
				required
			/> */}
	  {paymentMethod === 'Direct Transfer' && (
        <>
          <b>Account details:</b>
			<p>Acct Number: {singleStation?.accountDetails.accountNumber}</p>
			<p>Bank: {singleStation?.accountDetails.bank}</p>
			<p>Acct Name: {singleStation?.accountDetails.accountName}</p>

			<small className="mb-4"><b>Make sure to bring proof of payment when coming to pick up document</b></small>
        </>
      )}
        <center>
        <input
          type='submit'
          value='Submit'
          className='btn normal-btn mt-4'
        />
        </center>
        
      </div>
    </form>
</div>
</div>
    )
};

export default CreateDocument;

