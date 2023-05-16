import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Badge } from 'reactstrap';
import SideBar from '../../components/layout/SideBar';

function Documents() {
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

      const response = await axios.get('https://cu-wbps.cyclic.app/api/documents', config);
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
              data
                .filter(object => {
                  const lastStation = object.station[object.station.length - 1];
                  return lastStation.message.toLowerCase() === 'pending';
                })
                .map((object, index) => {
                  const lastStation = object.station[object.station.length - 1];
  
                  return (
                    <tr key={object.id}>
                      <td>{index + 1}</td>
                      <td>{object.docName}</td>
                      <td>{object.thestation}</td>
                      <td>{object?.station[0].estTime} Minute(s)</td>
                      <td>
                        <span className="badge badge-warning">{lastStation.message}</span>
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

export default Documents;
