package controllers

import (
	"net/http"
	"santrikoding/backend-api/database"
	"santrikoding/backend-api/models"

	"github.com/gin-gonic/gin"
)

func Dashboard(c *gin.Context) {
	var totalOrders int64
	var totalUsers int64
	var totalRevenue float64
	var graph []models.Graph

	// total orders
	database.DB.Model(&models.Transaction{}).
		Where("status = ?", "paid").
		Count(&totalOrders)

	// total revenue
	database.DB.Model(&models.Transaction{}).
		Where("status = ?", "paid").
		Select("COALESCE(SUM(total),0)").
		Scan(&totalRevenue)

	// total users
	database.DB.Model(&models.User{}).
		Where("role <> ?", "admin").
		Count(&totalUsers)

	// graph
	database.DB.Model(&models.Transaction{}).
		Select(`
		products.id,
		products.name,
		products.stock,
		SUM(transactions.quantity) as quantity
	`).
		Joins("JOIN products ON products.id = transactions.product_id").
		Where("transactions.status = ?", "paid").
		Group("products.id").
		Scan(&graph)

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Dashboard",
		"data": gin.H{
			"totalOrders":  totalOrders,
			"totalUsers":   totalUsers,
			"totalRevenue": totalRevenue,
			"graph":        graph,
		},
	})
}
