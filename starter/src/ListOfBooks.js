import { get } from "./BooksAPI.js";
import { useState, useEffect } from 'react';
import Book from './Book.js';

function ListOfBooks(props) {
    console.log("list of books", props.books)
    return (
        
    <ol className="books-grid">
        
        {
            props.books?.map((book) => {
                return (<Book key={book.id} book={book} {...props}/> )
            })
        }
    </ol>
    );
}

async function getBooks(bookId) {
    let result = await get(bookId);
    console.log("went here")
    return result;
}

//<Book book={data} someProp="someProp"/>

export default ListOfBooks;