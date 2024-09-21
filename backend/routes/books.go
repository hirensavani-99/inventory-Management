package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hren-task_secondBind/models"
)

const (
	ERROR_PARSING_JSON   = "Error occurred while parsing JSON"
	ERROR_REQUIRE_FIELDS = "All fields are required"
)

func addBook(context *gin.Context) {

	var book models.Book
	if err := context.ShouldBindJSON(&book); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": ERROR_PARSING_JSON})
		return
	}

	// Validate book
	if book.Title == "" || book.Author == "" || book.Genre == "" || book.Publication_Date == "" || book.ISBN == "" {
		context.JSON(http.StatusBadRequest, gin.H{"error": ERROR_REQUIRE_FIELDS})
		return
	}

	err := book.Save()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"message": "Book added successfully"})
}

func getBooks(context *gin.Context) {
	books, err := models.GetAllBooks()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"books": books})
}
