package controllers

import (
	"net/http"
	"santrikoding/backend-api/database"
	"santrikoding/backend-api/helpers"
	"santrikoding/backend-api/models"
	"santrikoding/backend-api/structs"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func FindTransactions(c *gin.Context) {
	result, err := helpers.PaginateOffset[models.Transaction](
		c,
		database.DB.Preload("User").Preload("Product").Find(&models.Transaction{}),
		[]string{"user_id", "product_id", "quantity", "price", "total", "status", "start_date", "end_date", "created_at", "updated_at"},
		[]string{"id"},
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "List Transactions",
		"data":    result,
	})
}

func CreateTransaction(c *gin.Context) {
	var req structs.TransactionCreateRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	tx := database.DB.Begin()
	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to start transaction",
		})
		return
	}

	transaction := models.Transaction{
		UserID:    req.UserID,
		ProductID: req.ProductID,
		Quantity:  req.Quantity,
		Price:     req.Price,
		Total:     req.Price * req.Quantity,
		Status:    req.Status,
		StartDate: req.StartDate,
		EndDate:   req.EndDate,
	}

	// create transaction
	if err := tx.Create(&transaction).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to create transaction",
		})
		return
	}

	// update stock
	result := tx.Model(&models.Product{}).
		Where("id = ? AND stock >= ?", req.ProductID, req.Quantity).
		Update("stock", gorm.Expr("stock - ?", req.Quantity))

	if result.Error != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to update stock",
		})
		return
	}

	if result.RowsAffected == 0 {
		tx.Rollback()
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Insufficient stock",
		})
		return
	}

	// ✅ COMMIT SEKALI SAJA
	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to commit transaction",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Transaction created successfully",
		"data":    transaction,
	})

}

func UpdateTransaction(c *gin.Context) {
	id := c.Param("id")

	var req structs.TransactionUpdateRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	var transaction models.Transaction
	database.DB.First(&transaction, id)
	if transaction.ID == 0 {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Transaction not found",
			Errors:  nil,
		})
		return
	}

	transaction.IsReturn = req.IsReturn
	transaction.ReturnDate = req.ReturnDate
	transaction.IsLate = req.IsLate

	if err := database.DB.Save(&transaction).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to update transaction",
			Errors:  nil,
		})
		return
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Transaction updated successfully",
		Data:    transaction,
	})
}

func FindTransactionById(c *gin.Context) {
	var transaction models.Transaction
	database.DB.First(&transaction, c.Param("id"))
	if transaction.ID == 0 {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Transaction not found",
			Errors:  nil,
		})
		return
	}
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Transaction found",
		Data:    transaction,
	})
}

func ProcessTransaction(c *gin.Context) {
	id := c.Param("id")

	var transaction models.Transaction
	database.DB.First(&transaction, id)
	if transaction.ID == 0 {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Transaction not found",
			Errors:  nil,
		})
		return
	}

	// update to db
	transaction.Status = "paid"
	transaction.UpdatedAt = time.Now()

	if transaction.ReturnDate == nil {
		transaction.ReturnDate = &transaction.EndDate
	}
	if err := database.DB.Save(&transaction).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to update transaction",
			Errors:  nil,
		})
		return
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Transaction processed successfully",
		Data:    transaction,
	})
}

func CancelTransaction(c *gin.Context) {
	id := c.Param("id")

	var transaction models.Transaction
	database.DB.First(&transaction, id)
	if transaction.ID == 0 {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Transaction not found",
			Errors:  nil,
		})
		return
	}

	transaction.Status = "cancel"

	if err := database.DB.Save(&transaction).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to update transaction",
			Errors:  nil,
		})
		return
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Transaction cancelled successfully",
		Data:    transaction,
	})
}

func ReportTransaction(c *gin.Context) {
	var transactions []models.Transaction
	database.DB.Model(&models.Transaction{}).Where("status = ?", "paid").Preload("User").Preload("Product").Find(&transactions)
	if transactions == nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Transactions not found",
			Errors:  nil,
		})
		return
	}
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Lists Data Transactions",
		Data:    transactions,
	})
}

func ExportTransaction(c *gin.Context) {
	var transactions []models.Transaction
	database.DB.Model(&models.Transaction{}).Where("status = ?", "paid").Preload("User").Preload("Product").Find(&transactions)
	if transactions == nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Transactions not found",
			Errors:  nil,
		})
		return
	}
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Lists Data Transactions",
		Data:    transactions,
	})
}
