
import { get } from "./BooksAPI.js";


  //move to different shelf
  export async function moveListOnShelf(bookId, currentList, newList, setCurrentlyReading, setWantToRead, setRead, currentlyReading, wantToRead, read) {
    //setCurrentlyReading, setWantToRead, setRead
    //remove from old list
    //skip if currentList == none 

    if (currentList == "currentlyReading"){
      var listWithOldObject = [...currentlyReading]
      var updatedList = listWithOldObject.filter((el) => {
        return el.id !== bookId;
      });
      setCurrentlyReading(updatedList)
    } else if (currentList == "wantToRead") {
      var listWithOldObject = [...wantToRead]
      var updatedList = listWithOldObject.filter((el) => {
        return el.id !== bookId;
      });
      setWantToRead(updatedList)
    } else if (currentList == "read") {
      var listWithOldObject = [...read]
      var updatedList = listWithOldObject.filter((el) => {
        return el.id !== bookId;
      });
      setRead(updatedList)
    }

    var book = await get(bookId);
    //add to new list
    if (newList == "currentlyReading"){
      var newList = [...currentlyReading]
      newList.push(book)
      setCurrentlyReading(newList)
    } else if (newList == "wantToRead") {
      var newList = [...wantToRead]
      newList.push(book)
      setWantToRead(newList)
      console.log(newList)

    } else if (newList == "read") {
      var newList = [...read]
      newList.push(book)
      setRead(newList)
    }


  }