import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stationDocuments, reset } from '../../features/document/documentSlice';
import UserDocItem from '../../components/app/userDocItem';
import { formatDistanceToNow } from 'date-fns'
import StationSide from '../../components/layout/StationSide';

function AllJobs() {
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
      <StationSide student={station}/>
    
      <section className='push-right'>
        <h2 className='mt-4'>All Print Requests</h2>
        <hr />
        {documents.length > 0 ? (
          <div className='table-responsive'>
            <table className='table table-striped table-bordered'>
              <thead>
                <tr>
                  <th><h5>Name</h5></th>
                  <th><h5>Number</h5></th>
                  <th><h5>Time</h5></th>
                  <th><h5>Status</h5></th>
                  <th><h5>Action</h5></th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document) => (
                  <tr key={document._id}>
                    <td>{document.theUser.firstname}</td>
                    <td>{document.theUser?.matricNumber}</td>
                    <td>{dateFormatter(document.createdAt.toString())}</td>
                    
						{document.station.length === 0 ? (
					<td>
						<span className="badge badge-warning">Pending</span>
					</td>
					) : (
					<td className="sizing">
						<span
						className={
							document.station[document.station.length - 1].message.toLowerCase() === 'ready'
							? 'badge badge-success'
							: 'badge badge-warning'
						}
						>
						{document.station[document.station.length - 1].message}{' '}
						{document.station[document.station.length - 1].message.toLowerCase() === 'ready' && 'for pick up'}
						</span>
					</td>
					)}

                    
                    <td>
                      <Link to={`/station/document/${document._id}`}>
                        <button className='normal-btn w-75'>VIEW JOB</button>
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

export default AllJobs;
