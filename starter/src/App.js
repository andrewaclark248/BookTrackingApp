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

  async updateLists(bookId, list) {
    var book = await get(bookId);
    if (list == "currentlyReading"){
      this.setState({ currentlyReading: [...this.state.currentlyReading, bookId] })
    } else if (list == "wantToRead") {
      this.setState({ wantToRead: [...this.state.wantToRead, bookId] })
    } else if (list == "read") {
      this.setState({ read: [...this.state.read, bookId] })
    }
  }

  moveListOnShelf(bookId, currentList, newList) {
    //delete from current list
    //add to new list

    if (currentList == "currentlyReading"){
      var newList = [...this.state.currentlyReading]
      var indexOfBook = newList.indexOf(bookId)
      newList.splice(indexOfBook, 1)
      this.setState({ currentlyReading: newList })
    } else if (currentList == "wantToRead") {
      var newList = [...this.state.wantToRead]
      var indexOfBook = newList.indexOf(bookId)
      newList.splice(indexOfBook, 1)
      this.setState({ wantToRead: newList })
    } else if (currentList == "read") {
      var newList = [...this.state.read]
      var indexOfBook = newList.indexOf(bookId)
      newList.splice(indexOfBook, 1)
      this.setState({ read: newList })
    }

    if (newList == "currentlyReading"){
      var newList = [...this.state.currentlyReading]
      newList.push(bookId)
      this.setState({ read: newList })
    } else if (newList == "wantToRead") {
      var newList = [...this.state.wantToRead]
      newList.push(bookId)
      this.setState({ wantToRead: newList })
    } else if (newList == "read") {
      var newList = [...this.state.read]
      newList.push(bookId)
      this.setState({ read: newList })
    }

  }

  render(){
    //console.log("render method")
    //console.log(this.state.wantToRead)

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