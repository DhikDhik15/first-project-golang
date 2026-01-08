package models

import "time"

type Product struct {
	ID    uint `json:"id" gorm:"primaryKey"`
	Name  string `json:"name"`
	Price int    `json:"price"`
	Stock int    `json:"stock"`
	Description string `json:"description"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
