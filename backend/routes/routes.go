package routes

import (
	"santrikoding/backend-api/controllers"
	"santrikoding/backend-api/middlewares"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {

	//initialize gin
	router := gin.Default()

	// set up CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"*"},
		AllowMethods:  []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:  []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders: []string{"Content-Length"},
	}))

	// route register
	router.POST("/api/register", controllers.Register)

	// route login
	router.POST("/api/login", controllers.Login)

	// route users
	router.GET("/api/users", middlewares.AuthMiddleware(), controllers.FindUsers)

	// route user create
	router.POST("/api/users", middlewares.AuthMiddleware(), controllers.CreateUser)

	// route user by id
	router.GET("/api/users/:id", middlewares.AuthMiddleware(), controllers.FindUserById)

	// route user update
	router.PUT("/api/users/:id", middlewares.AuthMiddleware(), controllers.UpdateUser)

	// route user delete
	router.DELETE("/api/users/:id", middlewares.AuthMiddleware(), controllers.DeleteUser)

	// route products
	router.GET("/api/products", middlewares.AuthMiddleware(), controllers.FindProducts)

	// route product create
	router.POST("/api/products", middlewares.AuthMiddleware(), controllers.CreateProduct)

	// route product by id
	router.GET("/api/products/:id", middlewares.AuthMiddleware(), controllers.FindProductById)

	// route product update
	router.PUT("/api/products/:id", middlewares.AuthMiddleware(), controllers.UpdateProduct)

	// route product delete
	router.DELETE("/api/products/:id", middlewares.AuthMiddleware(), controllers.DeleteProduct)

	// route transactions
	router.GET("/api/transactions", middlewares.AuthMiddleware(), controllers.FindTransactions)

	// route transaction create
	router.POST("/api/transactions", middlewares.AuthMiddleware(), controllers.CreateTransaction)

	// route transaction by id
	router.GET("/api/transactions/:id", middlewares.AuthMiddleware(), controllers.FindTransactionById)

	// route transaction update
	router.PUT("/api/transactions/:id", middlewares.AuthMiddleware(), controllers.UpdateTransaction)

	// route transaction process
	router.PUT("/api/transactions/:id/process", middlewares.AuthMiddleware(), controllers.ProcessTransaction)

	// route transaction cancel
	router.PUT("/api/transactions/:id/cancel", middlewares.AuthMiddleware(), controllers.CancelTransaction)

	// route dashboard
	router.GET("/api/dashboard", middlewares.AuthMiddleware(),controllers.Dashboard)

	return router
}
