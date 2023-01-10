import { getAll } from "./BooksAPI.js";
import { useState, useEffect } from 'react';
import Book from './Book.js';
import { search } from './BooksAPI.js'


function SearchPage(props) {
    const [books, setBooks] = useState({});

    /***useEffect(() => {
        async function getAllBooks() {
            let result = await getAll();
            setBooks(result);
        }
    
        getAllBooks()
      }, [])***/
    
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
          onChange={(e) => { handleSearchResult(e.target.value, setBooks) }}
        />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
        {books != undefined && Object.keys(books).length != 0 && Object.keys(JSON.stringify(books)).map((key,index) => (
            <Book key={index} book={books[key]} {...props} isUpdate={false}/>
        ))}  
      </ol>
    </div>
  </div>
  );
}

async function handleSearchResult(inputValue, setBooks){
  if( inputValue == undefined || inputValue == "") {
    setBooks({})
    return
  }
  let result = await search(inputValue, 100)
  setBooks(result)
}
//console.log(key, allBooks[key]);


export default SearchPage;