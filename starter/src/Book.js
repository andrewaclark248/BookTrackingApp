function Book(props) {
    var selectedValue = null;
    if (props.currentList != undefined) {
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
                        props.moveListOnShelf(props.book.id, selectedValue, event.target.value, props.setCurrentlyReading, props.setWantToRead, props.setRead, props.currentlyReading, props.wantToRead, props.read)
                    }

                    //if (props.isUpdate) {
                    //    props.moveListOnShelf(props.book.id, props.currentList, event.target.value, props.setCurrentlyReading, props.setWantToRead, props.setRead, props.currentlyReading, props.wantToRead, props.read)
                    //    //props.moveListOnShelf(props.book.id, props.currentList, event.target.value)
                    //} else {
                    //    props.updateLists(props.book.id, event.target.value, props.setCurrentlyReading, props.setWantToRead, props.setRead, props.currentlyReading, props.wantToRead, props.read)
                        //props.updateLists(props.book.id, event.target.value)
                    //}
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


export default Book;