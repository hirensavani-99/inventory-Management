package db

import (
	"database/sql"
	"fmt"
	"io/ioutil"
	"log"

	_ "github.com/lib/pq"
)

const (
	Host     = "localhost"
	Port     = "5432"
	UserName = "root"
	DBName   = "postgres"
	Password = "Hiren123"
)

var DB *sql.DB

func InitDB() {

	connectionString := fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=disable", Host, Port, UserName, DBName, Password)
	var err error

	// Open a connection
	DB, err = sql.Open("postgres", connectionString)

	if err != nil {
		panic("failed to connect database")
	}
	
	// If successful connection is established then read the schema.sql file and create table if not exists
	fmt.Println("Database connected successfully")
	schema, err := ioutil.ReadFile("db/schema.sql")
	if err != nil {
		log.Fatalf("failed to read schema.sql: %v", err)
	}

	_, err = DB.Exec(string(schema))
	if err != nil {
		log.Fatalf("failed to execute schema.sql: %v", err)
	}

	fmt.Println("Database schema created successfully")

}
