package models

import "time"

type Transaction struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	UserID    uint      
	ProductID uint      
	Quantity  int       `json:"quantity" gorm:"not null"`
	Total     int       `json:"total" gorm:"not null"`
	Status    string    `json:"status" gorm:"not null"`
	Price     int       `json:"price" gorm:"not null"`
	StartDate time.Time `json:"start_date" gorm:"not null"`
	EndDate   time.Time `json:"end_date" gorm:"not null"`
	IsReturn  bool      `json:"is_return" gorm:"not null"`
	ReturnDate time.Time `json:"return_date" gorm:"default:null"`
	IsLate    bool      `json:"is_late" gorm:"not null"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime"`

	User      User      `gorm:"foreignKey:UserID;references:Id"`
	Product   Product   `gorm:"foreignKey:ProductID;references:Id"`
}
