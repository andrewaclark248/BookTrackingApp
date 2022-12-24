import { get } from "./BooksAPI.js";
import { useState, useEffect } from 'react';
import Book from './Book.js';

function ListOfBooks(props) {
    let [allBooks, setBooks] = useState(props?.books);

    /***
    useEffect(() => {

        async function getAllBooks(bookId) {
            let result = await get(bookId);
            testBooks.push(result)
            setBooks(books => [...books, result])
            //allBooks.push(result)
            //console.log("allBooks",allBooks)
        }

        props.books?.map((bookId) => {
            getAllBooks(bookId)
            console.log("went here when ahahahah")

            //console.log("hahah", bookId)
        })

      }, []) */
    //props.books?.map((bookId) => {
    //    var result = getBooks(bookId)
    //    allBooks.push("asdfsdf")
    //})
    //console.log("after function call")


    if (props.currentList == "wantToRead") { //props.isUpdate && 
        //console.log("is want to read list on update")
        //console.log(props.books)
    }

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