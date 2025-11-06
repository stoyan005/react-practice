import { useEffect, useState } from "react";

import "./books.css";

function Books({searchTerm}) {

  const [books, setBooks] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => {
    fetch('/books.json')
    .then ((res) =>{
      if(!res.ok) throw new Error('Failed to fetch books.json')
        return res.json()
    })
    .then((data) => {
      setBooks(data.books)
      setLoading(false)
    })
    .catch((err) => {
      setError(err.message)
      setLoading(false)
    })
  },[])

  if (loading) return <p>Loading books....</p>
  if (error) return <p>Error: {error}</p>


  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  )


  return (
    <>
      <h2>Books List</h2>
      {filteredBooks.length === 0 ? (
        <p>No books found</p>
      ) : (
        <ul>
          {filteredBooks.map((book,index) =>(
            <li key = {index}>
              <strong>{book.title}</strong> by {book.author} publicated in {book.publication_year}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Books;
