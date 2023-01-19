import { useEffect, useState } from 'react'
import "./App.css";
import SearchPage from "./SearchPage.js";
import { getAll, update, search, get } from "./BooksAPI.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shelf from './Shelf.js'

export default function App2(props) {
    let [currentlyReading, setCurrentlyReading] = useState([])
    let [wantToRead, setWantToRead] = useState([])
    let [read, setRead] = useState([])
    let [updateBooks, setUpdateBooks] = useState(false);

    useEffect(() => {
      async function setBooks(){
        console.log("went here ahahahahhahahha")

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
    },[updateBooks])


    return (
        <div className="app">


          <BrowserRouter>
            <Routes>
              <Route path="/" >
                <Route path="search" element={

                  <SearchPage 
                    setCurrentlyReading={setCurrentlyReading}
                    setWantToRead={setWantToRead}
                    setRead={setRead}
                    currentlyReading={currentlyReading}
                    wantToRead={wantToRead}
                    read={read}
                    setUpdateBooks={setUpdateBooks}
                    updateBooks={updateBooks}
                    />

                } />
              </Route>
              <Route index element={
                <Shelf 
                  setCurrentlyReading={setCurrentlyReading}
                  setWantToRead={setWantToRead}
                  setRead={setRead}
                  currentlyReading={currentlyReading}
                  wantToRead={wantToRead}
                  read={read}
                  setUpdateBooks={setUpdateBooks}
                  updateBooks={updateBooks}
                  {...props} />
                } />
            </Routes>
          </BrowserRouter>


        </div>
    )

}