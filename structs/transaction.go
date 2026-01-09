package structs

import "time"

type TransactionCreateRequest struct {
	ProductID uint      `json:"product_id" binding:"required"`
	Quantity  int       `json:"quantity" binding:"required"`
	Price     int       `json:"price" binding:"required"`
	Total     int       `json:"total" binding:"required"`
	Status    string    `json:"status" binding:"required"`
	StartDate time.Time `json:"start_date" binding:"required"`
	EndDate   time.Time `json:"end_date" binding:"required"`
}

type TransactionResponse struct {
	Id        uint      `json:"id" gorm:"primaryKey"`
	UserID    uint      `json:"user_id"`
	ProductID uint      `json:"product_id"`
	Quantity  int       `json:"quantity"`
	Total     int       `json:"total"`
	Status    string    `json:"status"`
	Price     int       `json:"price"`
	StartDate time.Time `json:"start_date" format:"2006-01-02"`
	EndDate   time.Time `json:"end_date" format:"2006-01-02"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
