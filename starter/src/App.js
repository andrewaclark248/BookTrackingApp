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
      this.updateWantToReadList = this.updateWantToReadList.bind(this);
  }

  showSearchPageHandler(changeState) {
    this.setState({
      showSearchPage: changeState
    });  
  }

  async updateWantToReadList(bookId, list) {
    var book = await get(bookId);
    if (list == "currentlyReading"){
      this.setState({ currentlyReading: [...this.state.currentlyReading, bookId] })
    } else if (list == "wantToRead") {
      this.setState({ wantToRead: [...this.state.wantToRead, bookId] })
    } else if (list == "read") {
      this.setState({ read: [...this.state.read, bookId] })
    }
  }

  render(){
    return (
    <div className="app">
      {this.state.showSearchPage ? (
        <SearchPage showSearchPageHandler={this.showSearchPageHandler}  updateWantToReadList={this.updateWantToReadList} />

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
                      currentlyReading={this.state.currentlyReading}
                      wantToRead={this.state.wantToRead}
                      read={this.state.read}
                      typeOfList="currentlyReading"
                     /> 
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <ListOfBooks/> 
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <ListOfBooks/> 
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