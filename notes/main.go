package main

import (
	"log"
	"net/http"
	"os"

	"github.com/EmanuelCav/projects/database"
	"github.com/EmanuelCav/projects/models"
	"github.com/EmanuelCav/projects/routes"
	"github.com/joho/godotenv"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {

	err := godotenv.Load()

	database.Connection(os.Getenv("HOST"), os.Getenv("USER"), os.Getenv("PASSWORD"), os.Getenv("DATABASE"))

	database.Db.AutoMigrate(models.Note{})

	r := mux.NewRouter()

	r.HandleFunc("/notes", routes.Notes).Methods("GET")
	r.HandleFunc("/notes/{id}", routes.GetNote).Methods("GET")
	r.HandleFunc("/createnote", routes.CreateNote).Methods("POST")
	r.HandleFunc("/notes/{id}", routes.RemoveNote).Methods("DELETE")
	r.HandleFunc("/notes/{id}", routes.UpdateNote).Methods("PUT")

	headers := handlers.AllowedHeaders([]string{"Content-Type"})
	origins := handlers.AllowedOrigins([]string{"http://localhost:4200"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"})
	credentials := handlers.AllowCredentials()

	if err != nil {
		log.Fatal("Error to connect to enviroment file.")
	}

	log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), handlers.CORS(origins, headers, methods, credentials)(r)))

}
