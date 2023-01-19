package models

import "gorm.io/gorm"

type Note struct {
	gorm.Model

	Title       string `gorm:"type:varchar(45);default null;unique_index" json:"title"`
	Description string `gorm:"type:text;defaultnull" json:"description"`
}
