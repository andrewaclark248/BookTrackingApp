import "./App.css";
import ListOfBooks from "./ListOfBooks.js";
import React, {Component} from 'react';
import SearchPage from "./SearchPage.js";
import { get } from "./BooksAPI.js";


class App extends Component {

  constructor(){
      super();
      this.state={
        showSearchPage: false,
        currentlyReading: [],
        wantToRead: [],
        read: []
      }
      this.showSearchPageHandler = this.showSearchPageHandler.bind(this);
      this.updateLists = this.updateLists.bind(this);
      this.moveListOnShelf = this.moveListOnShelf.bind(this);
  }

  showSearchPageHandler(changeState) {
    this.setState({
      showSearchPage: changeState
    });  
  }


  //new book, add to shelf
  async updateLists(bookId, list) {
    var book = await get(bookId);
    if (list == "currentlyReading"){
      this.setState({ currentlyReading: [...this.state.currentlyReading, book] })
    } else if (list == "wantToRead") {
      this.setState({ wantToRead: [...this.state.wantToRead, book] })
    } else if (list == "read") {
      this.setState({ read: [...this.state.read, book] })
    }
  }

  //move to different shelf
  async moveListOnShelf(bookId, currentList, newList) {


    //remove from old list
    if (currentList == "currentlyReading"){
      var listWithOldObject = [...this.state.currentlyReading]
      var updatedList = listWithOldObject.filter((el) => {
        return el.id !== bookId;
      });
      this.setState({ currentlyReading: updatedList })
    } else if (currentList == "wantToRead") {
      var listWithOldObject = [...this.state.wantToRead]
      var updatedList = listWithOldObject.filter((el) => {
        return el.id !== bookId;
      });
      this.setState({ wantToRead: updatedList })
    } else if (currentList == "read") {
      var listWithOldObject = [...this.state.read]
      var updatedList = listWithOldObject.filter((el) => {
        return el.id !== bookId;
      });
      this.setState({ read: updatedList })
    }
    var book = await get(bookId);
    console.log("newlist in method = " + newList)
    console.log("read"==newList)
    //add to new list
    if (newList == "currentlyReading"){
      var newList = [...this.state.currentlyReading]
      newList.push(book)
      this.setState({ read: newList })
    } else if (newList == "wantToRead") {
      var newList = [...this.state.wantToRead]
      newList.push(book)
      this.setState({ wantToRead: newList })
    } else if (newList == "read") {
      var newList = [...this.state.read]
      newList.push(book)
      console.log("newList = ", newList)
      this.setState({ read: newList })
    }

  }

  render(){
    //console.log("render method")
    //console.log(this.state.wantToRead)
    console.log("read list")
    console.log(this.state.read)
    return (
    <div className="app">
      {this.state.showSearchPage ? (
        <SearchPage showSearchPageHandler={this.showSearchPageHandler}  updateLists={this.updateLists} />

      ) : (
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
                      books={this.state.currentlyReading}
                      updateLists={this.updateLists}
                      isUpdate={true}
                      moveListOnShelf={this.moveListOnShelf}
                      currentList="currentlyReading"
                     /> 
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <ListOfBooks
                      books={this.state.wantToRead}
                      updateLists={this.updateLists}
                      isUpdate={true}
                      moveListOnShelf={this.moveListOnShelf}
                      currentList="wantToRead"
                    /> 
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <ListOfBooks
                      books={this.state.read}
                      updateLists={this.updateLists}
                      isUpdate={true}
                      moveListOnShelf={this.moveListOnShelf}
                      currentList="read"
                    /> 
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => this.showSearchPageHandler(true)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
    )
  }

}
export default App;