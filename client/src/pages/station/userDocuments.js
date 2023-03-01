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

  const stname = station.stationName;

  useEffect(() => {
    if (isError) {
      console.log(docmessage);
    }

    dispatch(stationDocuments(stname));

    return () => {
      dispatch(reset());
    };
  }, []);

  function dateFormatter(dateItem) {
    return formatDistanceToNow(new Date(dateItem), { addSuffix: true });
  }

  return (
    <div>
      <hr />
      <section className='content'>
        {documents.length > 0 ? (
          <div className='table-responsive'>
            <table className='table table-striped table-bordered mt-4'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Uploaded</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document) => (
                  <tr key={document._id}>
                    <td>{document.theUser.firstname}</td>
                    <td>decription</td>
                    <td>{dateFormatter(document.createdAt.toString())}</td>
                    <td>
                      <Link to={`/station/document/${document._id}`}>
                        <button className='btn btn-primary btn-sm'>Learn More</button>
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
