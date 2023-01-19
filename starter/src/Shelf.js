import { moveListOnShelf } from './UpdateBook.js'
import ListOfBooks from './ListOfBooks.js';
import { Link } from "react-router-dom";
import { getAll, update, search } from "./BooksAPI.js"
import { useState, useEffect } from 'react'


export default function Shelf(props) {

    useEffect(() => {

        async function loadBookShelf() {
            var result = await getAll()
            var searchResult = await search("ba")
            var book = searchResult[0]
            book.shelf = "wantToRead"
            var x = await update(book, "wantToRead")
            var updatedlist = await getAll()

        }

        if (props.loadedInitialShelf) {
            props.setLoadedInitialShelf(false)
            loadBookShelf()

        }
    })
    
    return (
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
                        books={props.currentlyReading}
                        setCurrentlyReading={props.setCurrentlyReading}
                        setWantToRead={props.setWantToRead}
                        setRead={props.setRead}
                        isUpdate={true}
                        moveListOnShelf={moveListOnShelf}
                        currentlyReading={props.currentlyReading}
                        wantToRead={props.wantToRead}
                        read={props.read}
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
                            books={props.wantToRead}
                            setCurrentlyReading={props.setCurrentlyReading}
                            setWantToRead={props.setWantToRead}
                            setRead={props.setRead}
                            isUpdate={true}
                            moveListOnShelf={moveListOnShelf}
                            currentlyReading={props.currentlyReading}
                            wantToRead={props.wantToRead}
                            read={props.read}
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
                            books={props.read}
                            setCurrentlyReading={props.setCurrentlyReading}
                            setWantToRead={props.setWantToRead}
                            setRead={props.setRead}
                            isUpdate={true}
                            moveListOnShelf={moveListOnShelf}
                            currentlyReading={props.currentlyReading}
                            wantToRead={props.wantToRead}
                            read={props.read}
                        /> 
                    </ol>
                </div>
                </div>
            </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
    
}

//  <a onClick={() => console.log("go to search page")}></a>


