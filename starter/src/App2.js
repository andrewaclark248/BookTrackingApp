import { useState } from 'react'
import "./App.css";
import SearchPage from "./SearchPage.js";

export default function App2(props) {
    let [showSearchPage, setShowSearchPage] = useState(false)


    return (
        <div className="app">
          {showSearchPage ? (
            <SearchPage showSearchPageHandler={setShowSearchPage}  />
    
          ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <a onClick={() => setShowSearchPage(true)}>Add a book</a>
              </div>
            </div>
          )}
        </div>
    )

}
