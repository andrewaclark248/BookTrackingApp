import { useState } from 'react'
import "./App.css";
import SearchPage from "./SearchPage.js";
import { get } from "./BooksAPI.js";
//import ListOfBooks from './ListOfBooks.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { moveListOnShelf } from './UpdateBook.js'
import Shelf from './Shelf.js'

export default function App2(props) {
    let [currentlyReading, setCurrentlyReading] = useState([])
    let [wantToRead, setWantToRead] = useState([])
    let [read, setRead] = useState([])

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
              <Route index element={<Shelf 
                moveListOnShelf={moveListOnShelf}
                setCurrentlyReading={setCurrentlyReading}
                setWantToRead={setWantToRead}
                setRead={setRead}
                currentlyReading={currentlyReading}
                wantToRead={wantToRead}
                read={read}
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



