import { useEffect, useState } from 'react';
import './App.css';
import Photos from './Photos';

const clientID = `?client_id=A5yqDn1u2FFRBOVrUWfANCRzjdz4n041RMi4FYTIM-0`;
const mainURL = `https://api.unsplash.com/photos/`;
const searchURL = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")
  const [finalQuery, setFinalQuery] = useState("")

  const fetchImages = async () => {
    setLoading(true)
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${finalQuery}`
    let url
    if (query) {
      url = `${searchURL}${clientID}${urlPage}${urlQuery}`

    } else {
      url = `${mainURL}${clientID}${urlPage}`
    }

    try {
      const res = await fetch(url)
      const data = await res.json()
      console.log(data);
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results
        }
        if (query) {
          return [...oldPhotos, ...data.results]
        }
        else {
          return [...oldPhotos, ...data]
        }

      })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchImages()
  }, [page])

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (!loading && (document.body.scrollHeight - 2 <= window.innerHeight + window.scrollY)) {
        setPage((oldPage) => {
          return oldPage + 1
        })
      }
    })
    return () => window.removeEventListener("scroll", event)
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    setPage(1)
    setFinalQuery(query)
    fetchImages()
  }
  return (
    <main>
      <section className="search">
        <form className="searchForm">
          <input type="text" placeholder='Search' value={query} onChange={e => setQuery(e.target.value)} />
          <button type='submit' onClick={handleSubmit}>Search</button>
        </form>
      </section>

      <section className='photos'>
        <div className="photosCenter">
          {
            photos.map(image => {
              return <Photos key={image.id} {...image} />
            })
          }
        </div>
      </section>
    </main>
  );
}

export default App;
