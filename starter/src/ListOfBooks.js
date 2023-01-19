import { get } from "./BooksAPI.js";
import { useState, useEffect } from 'react';
import Book from './Book.js';

function ListOfBooks(props) {
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

export default ListOfBooks;