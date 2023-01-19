package database

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Db *gorm.DB

func Connection(host string, user string, password string, database string) {
	var dsn = "host=" + host + " user=" + user + " password=" + password + " dbname=" + database
	var err error
	Db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Error to connect to database")
	} else {
		log.Println("Database is running")
	}
}
