import { useState } from 'react'
import "./App.css";
import SearchPage from "./SearchPage.js";
import { get } from "./BooksAPI.js";
import ListOfBooks from './ListOfBooks.js';


export default function App2(props) {
    let [showSearchPage, setShowSearchPage] = useState(false)
    let [currentlyReading, setCurrentlyReading] = useState([])
    let [wantToRead, setWantToRead] = useState([])
    let [read, setRead] = useState([])

    return (
        <div className="app">
          {showSearchPage ? (
            <SearchPage 
                showSearchPageHandler={setShowSearchPage} 
                updateLists={updateLists}
                moveListOnShelf={moveListOnShelf}
                setCurrentlyReading={setCurrentlyReading}
                setWantToRead={setWantToRead}
                setRead={setRead}
                currentlyReading={currentlyReading}
                wantToRead={wantToRead}
                read={read}
            />
    
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
                        <ListOfBooks 
                            currentList="currentlyReading"
                            books={currentlyReading}
                            updateLists={updateLists}
                            setCurrentlyReading={setCurrentlyReading}
                            setWantToRead={setWantToRead}
                            setRead={setRead}
                            isUpdate={true}
                            moveListOnShelf={moveListOnShelf}
                            currentlyReading={currentlyReading}
                            wantToRead={wantToRead}
                            read={read}
                        /> 
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        <ListOfBooks 
                                currentList="wantToRead"
                                books={wantToRead}
                                updateLists={updateLists}
                                setCurrentlyReading={setCurrentlyReading}
                                setWantToRead={setWantToRead}
                                setRead={setRead}
                                isUpdate={true}
                                moveListOnShelf={moveListOnShelf}
                                currentlyReading={currentlyReading}
                                wantToRead={wantToRead}
                                read={read}
                            /> 
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        <ListOfBooks 
                                currentList="read"
                                books={read}
                                updateLists={updateLists}
                                setCurrentlyReading={setCurrentlyReading}
                                setWantToRead={setWantToRead}
                                setRead={setRead}
                                isUpdate={true}
                                moveListOnShelf={moveListOnShelf}
                                currentlyReading={currentlyReading}
                                wantToRead={wantToRead}
                                read={read}
                            /> 
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

async function updateLists(bookId, list, setCurrentlyReading, setWantToRead, setRead, currentlyReading, wantToRead, read) {
    var book = await get(bookId);
    if (list == "currentlyReading"){
        currentlyReading.push(book)
        setCurrentlyReading(currentlyReading)
    } else if (list == "wantToRead") {
        var list1 = wantToRead.push(book)
        setWantToRead(wantToRead)
    } else if (list == "read") {
        var list1 = read.push(book)
        setRead(read)
    }
}



  //move to different shelf
  async function moveListOnShelf(bookId, currentList, newList, setCurrentlyReading, setWantToRead, setRead, currentlyReading, wantToRead, read) {
    //setCurrentlyReading, setWantToRead, setRead
    //remove from old list
    //skip if currentList == none 
    console.log("current list = " + currentList)
      if (currentList == "currentlyReading"){
        var listWithOldObject = [...currentlyReading]
        var updatedList = listWithOldObject.filter((el) => {
          return el.id !== bookId;
        });
        setCurrentlyReading(updatedList)
      } else if (currentList == "wantToRead") {
        var listWithOldObject = [...wantToRead]
        var updatedList = listWithOldObject.filter((el) => {
          return el.id !== bookId;
        });
        setWantToRead(updatedList)
      } else if (currentList == "read") {
        var listWithOldObject = [...read]
        var updatedList = listWithOldObject.filter((el) => {
          return el.id !== bookId;
        });
        setRead(updatedList)
      }

    var book = await get(bookId);
    //add to new list
    if (newList == "currentlyReading"){
      var newList = [...currentlyReading]
      newList.push(book)
      setCurrentlyReading(newList)
    } else if (newList == "wantToRead") {
      var newList = [...wantToRead]
      newList.push(book)
      setWantToRead(newList)
    } else if (newList == "read") {
      var newList = [...read]
      newList.push(book)
      setRead(newList)
    }

  }