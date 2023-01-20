# MyReads Project

This is a booktracking app that allows you store books on shelves. There is a state variable for each shelf (read, wantToRead, currentlyReading). The app is starts at a App component that contains child components: Search and Shelf. This link to the search page and home page respectively. 

The Shelf Component contains list the same components 3 times (ListOfBooks). That list the book for its respective shelf of books.

The ListOfBooks contains a Book components that is used to display each indiviaul book.

If a book wants to be moved to a new Shelf. A method called updateBook is called that updates the book in the API, updates state variables and refreshes the page. Furthemore, the dropdown option is preselected if the book is already stored in the API.

To Run The Application
1.) npm install
2.) npm start

