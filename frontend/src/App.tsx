import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
import { changePath } from './changePath';

type apartmansType = { title: string, imageUrl: string }

function App() {
  const [data, setData] = useState<apartmansType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllApartments = async () => {
      setLoading(true);
      const apartments = await axios.get(changePath("/api/apartments/getAllApartments"));
      console.log(apartments.data)
      setData(apartments.data);
      setLoading(false);
    }
    fetchAllApartments();
  }, [])


  const setAndInsertApartmentsIntoDB = async () => {
    await fetchApartments();
  }

  const fetchApartments = async () => {
    setLoading(true);
    const apartments = await axios.get(changePath("/getData"));
    const finalData = apartments.data;
    setData(finalData);
    setLoading(false);
    setApartmentsInDB(finalData)
  }
  const setApartmentsInDB = async (data: any) => {
    try {
      console.log(data)
      await axios.post(changePath("/api/apartments/addApartments"), { apartments: data });
    } catch (error) {
      console.log('error insert data')
    }
  }
  return (
    <div className="App">
      <h2>Applikace pro sreality.cz</h2>
      {
        !loading && <button onClick={setAndInsertApartmentsIntoDB}>aktualizuj apartmany</button>
      }
      <p>
        <ClipLoader
          color={"blue"}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </p>
      <div className='container'>
        {
          data.map((item: { title: string, imageUrl: string }) => (
            <div className='item'>
              <p>{item.title}</p>
              <img src={item.imageUrl} alt="" style={{ height: "180px", width: "auto" }} />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
