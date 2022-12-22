import { get } from "./BooksAPI.js";
import { useState, useEffect } from 'react';
import Book from './Book.js';

 function ListOfBooks(props) {
    const [allBooks, setBooks] = useState([]);
    useEffect(() => {
        async function getAllBooks(bookId) {
            let result = await get(bookId);
            //console.log(result)
            //allBooks.push(result)
            setBooks(books => [...books, result])
        }
        props.books?.map((bookId) => {
            getAllBooks(bookId)
            //console.log("hahah", bookId)
        })
      }, [])

    console.log(allBooks)
    return (
    <ol className="books-grid">
        {allBooks?.map((book) => {
                /**get(bookId).then((data) => {
                    console.log("data", data) 
                }).catch(()=>console.log("error"))**/
                //console.log("after promise resolved")
            return (<Book key={book.id} book={book} someProp="someProp"/> )

        })
        }
    </ol>
    );
}

//<Book book={data} someProp="someProp"/>

export default ListOfBooks;