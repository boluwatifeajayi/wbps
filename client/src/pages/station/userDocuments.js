import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stationDocuments, reset } from '../../features/document/documentSlice';
import UserDocItem from '../../components/app/userDocItem';
import { formatDistanceToNow } from 'date-fns'

function Documents() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { documents, isLoading, isError, isSuccess, docmessage } = useSelector((state) => state.document);

  const { station } = useSelector((state) => state.stationauth);

  

  useEffect(() => {
    if (isError) {
      console.log(docmessage);
    }

    dispatch(stationDocuments(stname));

    return () => {
      dispatch(reset());
    };
  }, []);

  const stname = station?.stationName;

  function dateFormatter(dateItem) {
    return formatDistanceToNow(new Date(dateItem), { addSuffix: true });
  }

  return (
    <div>
    
      <section className='content container'>
        <h2 className='mt-4'>Students Uploads</h2>
        <hr />
        {documents.length > 0 ? (
          <div className='table-responsive'>
            <table className='table table-striped table-bordered'>
              <thead>
                <tr>
                  <th><h5>Name</h5></th>
                  
                  <th><h5>Time</h5></th>
                  <th><h5>Status</h5></th>
                  <th><h5>Action</h5></th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document) => (
                  <tr key={document._id}>
                    <td>{document.theUser.firstname}</td>
                    <td>{dateFormatter(document.createdAt.toString())}</td>
                    <td><b>{document.station.length > 0 ? document.station[0].message : "pending"}</b></td>
                    <td>
                      <Link to={`/station/document/${document._id}`}>
                        <button className='normal-btn w-50'>Learn More</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3>No Documents</h3>
        )}
      </section>
    </div>
  );
}

export default Documents;
