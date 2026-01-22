package middlewares

import (
	"net/http"                        // Untuk membuat response HTTP
	"santrikoding/backend-api/config" // Mengambil konfigurasi dari file .env
	"santrikoding/backend-api/database"
	"santrikoding/backend-api/models"
	"strings" // Untuk manipulasi string

	"github.com/gin-gonic/gin"     // Framework Gin untuk HTTP routing
	"github.com/golang-jwt/jwt/v5" // Library JWT untuk membuat dan memverifikasi token
)

// Ambil secret key dari environment variable
// Jika tidak ada, gunakan default "secret_key"
var jwtKey = []byte(config.GetEnv("JWT_SECRET", "secret_key"))

func AuthMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Token is required",
			})
			c.Abort()
			return
		}

		tokenString = strings.TrimPrefix(tokenString, "Bearer ")

		claims := &jwt.RegisteredClaims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid token",
			})
			c.Abort()
			return
		}

		// 🔥 Ambil user dari database berdasarkan subject (id / username / email)
		var user models.User
		if err := database.DB.Where("username = ?", claims.Subject).First(&user).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "User not found",
			})
			c.Abort()
			return
		}

		// ✅ Simpan USER ke context
		c.Set("auth", user)

		c.Next()
	}
}
