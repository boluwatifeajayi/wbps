import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDocuments, reset } from '../../features/document/documentSlice';
import DocumentItem from '../../components/app/documentItem';
import userDocItem from '../../components/app/userDocItem';
import axios from 'axios';

function Documents() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const { documents, isLoading, isError, isSuccess, docmessage } = useSelector(
    (state) => state.document
  );

  const { user } = useSelector((state) => state.userauth);

  const token = user.token;

  async function call() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get('http://localhost:4070/api/documents/', config);
    setData(response.data);

    
  }

  useEffect(() => {
    if (isError) {
      console.log(docmessage);
    }

    // dispatch(getDocuments())

    call();

    // return () => {
    //   call()
    //   dispatch(reset())
    // }
  }, []);

  console.log(data);

  return (
    <div>
      <hr />
      <section className='content container'>
        <h1>Uploaded Documents</h1>

        <div className='table-responsive'>
          <table className='table table-striped table-bordered'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>Document Item</th>
                <th scope='col'>The Station</th>
                <th scope='col'>Status</th>
              </tr>
            </thead>
            <tbody>
            {data.map((object) => (
  <tr key={object.id}>
    <td>{object.docItem}</td>
    <td>{object.thestation}</td>
    {object.station.map((mss) => (
      <td key={mss.id}>{mss.message}</td>
    ))}
  </tr>
))}
            </tbody>
          </table>
        </div>

        {/* <ul>
          {data.map((object) => (
            <li key={object.id}>
              <p>{object.docItem}</p>
              <p>{object.thestation}</p>
              <p>{object.status}</p>
              <ul>
                {object.station.map((item) => (
                  <li key={item.message}>
                    <p>{item.message}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul> */}
      </section>
    </div>
  );
}

export default Documents;
