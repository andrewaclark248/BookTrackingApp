function Book(props) {
    let imageUrl = props.book.imageLinks.thumbnail.toString();
    let url = 'url('+imageUrl+')'
    let bookName = props.book.title;
    let authors = props.book.authors.join(" & ");
    return (
        <li>
            <div className="book">
            <div className="book-top">
                <div
                className="book-cover"
                style={{
                    width: 128,
                    height: 193,
                    backgroundImage:
                    url,
                }}
                ></div>
                <div className="book-shelf-changer">
                <select onChange={(event) => {props.updateWantToReadList(props.book.id, event.target.value)}}>
                    <option value="none" disabled>
                    Move to...
                    </option>
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


export default Book;