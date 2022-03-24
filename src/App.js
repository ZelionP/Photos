import { useEffect, useState } from 'react';
import './App.css';
import Photos from './Photos';

const clientID = `?client_id=A5yqDn1u2FFRBOVrUWfANCRzjdz4n041RMi4FYTIM-0`;
const mainURL = `https://api.unsplash.com/photos/`;
const searchURL = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])

  const fetchImages = async() => {
    setLoading(true)
    let url 
    url= `${mainURL}${clientID}`
    try {
      const res = await fetch(url)
      const data = await res.json()
      console.log(data);
      setPhotos(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() =>{
    fetchImages()
  }, [])
  return (
    <main>
      <section className="search">
        <form className="searchForm">
          <input type="text" placeholder='Search' />
          <button>Search</button>
        </form>
      </section>
      
      <section className='photos'>
        <div className="photosCenter">
          {
            photos.map(image =>{
              return <Photos key={image.id} {...image}/>
            })
          }
        </div>
      </section>
    </main>
  );
}

export default App;
