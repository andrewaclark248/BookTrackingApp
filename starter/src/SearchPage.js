import { getAll } from "./BooksAPI.js";
import { useState, useEffect } from 'react';
import Book from './Book.js';



function SearchPage(props) {
    const [books, setBooks] = useState(0);

    useEffect(() => {
        //async function fetchMyAPI() {
        //  let response = await fetch('api/data')
        //  response = await response.json()
        //  dataSet(response)
        //}
        async function getAllBooks() {
            let result = await getAll();
            setBooks(result);
        }
    
        getAllBooks()
      }, [])
    
    let allBooks = JSON.parse(JSON.stringify(books))
    const myArray = ['Jack', 'Mary', 'John', 'Krish', 'Navin'];  

    return (
    <div className="search-books">
    <div className="search-books-bar">
      <a
        className="close-search"
        onClick={() => props.showSearchPageHandler(false)}
      >
        Close
      </a>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
        />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
        {Object.keys(allBooks).map((key,index) => (

          <Book key={index} book={allBooks[key]}/>
        ))}  
      </ol>
    </div>
  </div>
  );
}
//console.log(key, allBooks[key]);


export default SearchPage;