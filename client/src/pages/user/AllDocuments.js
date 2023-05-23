import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Badge } from 'reactstrap';
import SideBar from '../../components/layout/SideBar';

function UploadedDocs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [callLoading, setCallLoading] = useState(false)

  const { documents, isLoading, isError, isSuccess, docmessage } = useSelector(
    (state) => state.document
  );

  const { user } = useSelector((state) => state.userauth);

  const token = user?.token;

  async function call() {
    setCallLoading(true);
  
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get('https://cu-wbps.onrender.com/api/documents', config);
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setCallLoading(false);
    }
  }
  useEffect(() => {
    if (isError) {
      console.log(docmessage);
    }
    call();    
  }, []);

  console.log(data);

  if(isLoading || callLoading){
    return <h4 className='loading text center'>Loading...</h4>
  }

  return (
    <div>
    <div className="sidebar">
      <SideBar student={user} />
    </div>
    <section className='push-right'>
      <h4 className='mt-4 mb-4'>Your Uploaded Documents</h4>
      <div className='table-responsive mt-4 mb-4'>
        <table className='table table-striped table-bordered'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Document Name</th>
              <th scope='col'>Vendor</th>
              <th scope='col'>Est Time</th>
              <th scope='col'>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((object, index) => {
                const lastMessage = object.station[object.station.length - 1]?.message;
                const isReady = lastMessage.toLowerCase() === 'ready';
  
                return (
                  <tr key={object.id}>
                    <td>{index + 1}</td>
                    <td>{object.docName}</td>
                    <td>{object.thestation}</td>
                    <td>{object?.station[0].estTime} Minute(s)</td>
                    <td>
                      <span className={isReady ? 'badge badge-success' : 'badge badge-warning'}>
                        {lastMessage} {isReady && 'for pick up'}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan='5'>Not yet uploaded any documents</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  </div>
  
  );
}

export default UploadedDocs;
