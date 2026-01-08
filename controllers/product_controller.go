package controllers

import (
	"net/http"
	"santrikoding/backend-api/database"
	"santrikoding/backend-api/models"

	"github.com/gin-gonic/gin"
)

func FindProducts(c *gin.Context) {
	var products []models.Product
	database.DB.Find(&products)
	if products == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Products not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": products})
}
