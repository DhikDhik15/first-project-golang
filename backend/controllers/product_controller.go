package controllers

import (
	"net/http"
	"santrikoding/backend-api/database"
	"santrikoding/backend-api/helpers"
	"santrikoding/backend-api/models"
	"santrikoding/backend-api/structs"

	"github.com/gin-gonic/gin"
)

func FindProducts(c *gin.Context) {
	result, err := helpers.PaginateOffset[models.Product](
		c,
		database.DB.Model(&models.Product{}),
		[]string{"name", "description", "price", "stock"},
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
		"message": "List Products",
		"data":    result,
	})
}

func CreateProduct(c *gin.Context) {
	var req = structs.ProductCreateRequest{}
	
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}
	product := models.Product{
		Name:        req.Name,
		Description: req.Description,
		Price:       req.Price,
		Stock:       req.Stock,
	}
	database.DB.Create(&product)
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Product created successfully",
		Data:    product,
	})
}

func FindProductById(c *gin.Context) {
	var product models.Product
	if err := database.DB.First(&product, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Product not found",
			Errors:  nil,
		})
		return
	}
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Product found",
		Data:    product,
	})
}

func UpdateProduct(c *gin.Context) {

	id := c.Param("id")
	
	var product models.Product
	if err := database.DB.First(&product, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Product not found",
			Errors:  nil,
		})
		return
	}

	var req = structs.ProductUpdateRequest{}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}
	
	if err := database.DB.First(&product, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Product not found",
			Errors:  nil,
		})
		return
	}
	product.Name = req.Name
	product.Description = req.Description
	product.Price = req.Price
	product.Stock = req.Stock
	database.DB.Save(&product)
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Product updated successfully",
		Data:    product,
	})
}

func DeleteProduct(c *gin.Context) {
	var product models.Product
	if err := database.DB.First(&product, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Product not found",
			Errors:  nil,
		})
		return
	}
	database.DB.Delete(&product)
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Product deleted successfully",
		Data:    product,
	})
}


