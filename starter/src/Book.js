import { update } from './BooksAPI.js'


function Book(props) {
    var selectedValue = null;
    console.log("currentList = " + props.currentList)
    if (props.currentList != undefined) { //from home pageono
        selectedValue = props.currentList;
    } else if (props.selectedOptionForBook != undefined) {
        selectedValue = props.selectedOptionForBook;
    } else {
        selectedValue = "none"
    }

    let imageUrl = props.book.imageLinks?.thumbnail?.toString();
    let url = 'url('+imageUrl+')'
    let bookName = props.book.title;
    let authors = props.book.authors?.join(" & ");
    return (
        <li>
            <div className="book">
            <div className="book-top">
                <div
                className="book-cover"
                style={{
                    width: 128,
                    height: 193,
                    backgroundImage: url,
                }}
                ></div>
                <div className="book-shelf-changer">
                <select value={selectedValue} onChange={(event) => { 
                    if ((event.target.value != "none")) {
                        updateBook(props.book, event.target.value, props)
                    }
                }}>
                    <option value="currentlyReading">
                    Currently Reading
                    </option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                </div>
            </div>
            <div className="book-title">{bookName}</div>
            <div className="book-authors">{authors}</div>
            </div>
        </li>
    );

}

async function updateBook(book, shelf, props) {
    var result = await update(book, shelf)

    console.log("result", props)
    if (shelf == "currentlyReading") {
        props.setCurrentlyReading([...props.currentlyReading, book])
    } else if (shelf == "wantToRead") {
        props.setWantToRead([...props.wantToRead, book])
    } else if (shelf == "read") {
        props.setRead([...props.read, book])
    }

  }

export default Book;