import { useEffect, useState } from 'react'
import "./App.css";
import SearchPage from "./SearchPage.js";
import { getAll, update, search, get } from "./BooksAPI.js"
//import ListOfBooks from './ListOfBooks.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { moveListOnShelf } from './UpdateBook.js'
import Shelf from './Shelf.js'

export default function App2(props) {
    let [currentlyReading, setCurrentlyReading] = useState([])
    let [wantToRead, setWantToRead] = useState([])
    let [read, setRead] = useState([])
    let [loadedInitialShelf, setLoadedInitialShelf] = useState(true)


    useEffect(() => {
      async function setBooks(){
        var result = await getAll()
        
        //set currentlyReading
        var currentReadingList = result.filter((book) => {
          return book.shelf == "currentlyReading"
        })
        setCurrentlyReading(currentReadingList)

        //set wantToRed
        var wantToReadList = result.filter((book) => {
          return book.shelf == "wantToRead"
        })
        setWantToRead(wantToReadList)

        //set read
        var readList = result.filter((book) => {
          return book.shelf == "read"
        })
        setRead(readList)


      }
      setBooks()
    },[])


    return (
        <div className="app">


          <BrowserRouter>
            <Routes>
              <Route path="/" >
                <Route path="search" element={

                  <SearchPage 
                    updateLists={updateLists}
                    moveListOnShelf={moveListOnShelf}
                    setCurrentlyReading={setCurrentlyReading}
                    setWantToRead={setWantToRead}
                    setRead={setRead}
                    currentlyReading={currentlyReading}
                    wantToRead={wantToRead}
                    read={read}
                    />

                } />
              </Route>
              <Route index element={
                <Shelf 
                  moveListOnShelf={moveListOnShelf}
                  setCurrentlyReading={setCurrentlyReading}
                  setWantToRead={setWantToRead}
                  setRead={setRead}
                  currentlyReading={currentlyReading}
                  wantToRead={wantToRead}
                  read={read}
                  loadedInitialShelf={loadedInitialShelf}
                  setLoadedInitialShelf={setLoadedInitialShelf}
                  {...props} />
                } />
            </Routes>
          </BrowserRouter>


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



