package routes

import (
	"encoding/json"
	"net/http"

	"github.com/EmanuelCav/notes/database"
	"github.com/EmanuelCav/notes/models"
	"github.com/gorilla/mux"
)

func Notes(w http.ResponseWriter, r *http.Request) {
	var notes []models.Note
	database.Db.Find(&notes)
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(&notes)
}
func GetNote(w http.ResponseWriter, r *http.Request) {
	var note models.Note
	params := mux.Vars(r)

	database.Db.First(&note, params["id"])

	if note.ID == 0 {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Note does not exists."))
		return
	} else {
		w.WriteHeader(http.StatusAccepted)
	}

	json.NewEncoder(w).Encode(&note)
}
func CreateNote(w http.ResponseWriter, r *http.Request) {
	var note models.Note
	json.NewDecoder(r.Body).Decode(&note)

	if note.Title == "" || note.Description == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("There are empty fields. Please complete"))
		return
	}

	noteSaved := database.Db.Create(&note)

	w.Header().Set("Content-Type", "application/json")

	if noteSaved.Error != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Error to save a the note."))
		return
	} else {
		w.WriteHeader(http.StatusAccepted)
	}

	json.NewEncoder(w).Encode(&note)

}
func RemoveNote(w http.ResponseWriter, r *http.Request) {
	var note models.Note
	params := mux.Vars(r)

	database.Db.First(&note, params["id"])

	if note.ID == 0 {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Note does not exists."))
		return
	} else {
		w.WriteHeader(http.StatusAccepted)
	}

	database.Db.Unscoped().Delete(&note)
}
func UpdateNote(w http.ResponseWriter, r *http.Request) {
	var note models.Note
	params := mux.Vars(r)

	if note.Title == "" || note.Description == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("There are empty fields. Please complete"))
		return
	}

	database.Db.First(&note, params["id"])

	if note.ID == 0 {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Note does not exists."))
		return
	} else {
		w.WriteHeader(http.StatusAccepted)
	}

	json.NewDecoder(r.Body).Decode(&note)

	noteSaved := database.Db.Updates(&note)

	if noteSaved.Error != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Error to update a note."))
		return
	} else {
		w.Header().Set("Content-Type", "application/json")
	}

	json.NewEncoder(w).Encode(&note)

}
