package controllers

import (
	"net/http"
	"santrikoding/backend-api/database"
	"santrikoding/backend-api/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Dashboard(c *gin.Context) {
	var totalOrders int64
	var totalUsers int64
	var totalRevenue float64

	base := database.DB.Model(&models.Transaction{}).
		Where("status = ?", "paid")

	// total orders
	base.Session(&gorm.Session{}).Count(&totalOrders)

	// total revenue
	base.Session(&gorm.Session{}).
		Select("COALESCE(SUM(total),0)").
		Scan(&totalRevenue)

	// total users (exclude admin)
	database.DB.Model(&models.User{}).
		Where("role <> ?", "admin").
		Count(&totalUsers)

	println(totalOrders, totalUsers, totalRevenue)

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Dashboard",
		"data": gin.H{
			"totalOrders":  totalOrders,
			"totalUsers":   totalUsers,
			"totalRevenue": totalRevenue,
		},
	})
}
