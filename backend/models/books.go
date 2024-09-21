package models

import (
	"fmt"

	"github.com/hren-task_secondBind/db"
)

// Model Book
type Book struct {
	ID               int    `json:"id"`
	Title            string `json:"title"`
	Author           string `json:"author"`
	Genre            string `json:"genre"`
	Publication_Date string `json:"publication_date"`
	ISBN             string `json:"isbn"`
}

// Add a book to the database
func (book *Book) Save() error {

	// Check if book already exists
	exists, err := isBookExists(book.ISBN)

	if err != nil {
		return err
	}

	if exists {
		return fmt.Errorf("book already exists")
	}

	// Create query string
	query := `Insert into Inventory (title, author, genre, publication_date, isbn) values ($1, $2, $3, $4,$5) `

	// Prepare statement
	stmt, err := db.DB.Prepare(query)

	if err != nil {
		return fmt.Errorf("error preparing query for saving book: %w", err)
	}

	defer stmt.Close()

	// querying to the db
	_, err = stmt.Exec(book.Title, book.Author, book.Genre, book.Publication_Date, book.ISBN)

	if err != nil {
		return fmt.Errorf("error executing query for saving book: %w", err)
	}

	return nil
}

// Get all Books
func GetAllBooks() ([]Book, error) {
	Query := `SELECT * FROM Inventory`

	rows, err := db.DB.Query(Query)

	if err != nil {
		return nil, fmt.Errorf("error getting all books: %w", err)
	}

	defer rows.Close()

	var books []Book

	// scan all books
	for rows.Next() {

		var book Book

		if err := rows.Scan(&book.ID, &book.Title, &book.Author, &book.Genre, &book.Publication_Date, &book.ISBN); err != nil {
			return nil, fmt.Errorf("error scanning book: %w", err)
		}

		books = append(books, book)

	}

	return books, nil
}

// Check if book already exist with isbn or not
func isBookExists(isbn string) (bool, error) {

	query := `SELECT EXISTS (SELECT 1 FROM Inventory WHERE isbn = $1)`

	var exists bool

	err := db.DB.QueryRow(query, isbn).Scan(&exists)

	if err != nil {
		return false, fmt.Errorf("error checking book existence: %w", err)
	}

	return exists, nil
}
