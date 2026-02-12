package controllers

import (
	"net/http"
	"santrikoding/backend-api/database"
	"santrikoding/backend-api/models"
	"santrikoding/backend-api/structs"

	"github.com/gin-gonic/gin"
)

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