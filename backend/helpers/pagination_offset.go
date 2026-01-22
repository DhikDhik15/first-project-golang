package helpers

import (
	"math"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type PaginationResponse[T any] struct {
	Data      []T   `json:"data"`
	Page      int   `json:"page"`
	Limit     int   `json:"limit"`
	TotalData int64 `json:"total_data"`
	TotalPage int   `json:"total_page"`
}

// whitelist field sort untuk keamanan
func allowedSort(field string, allowed []string) string {
	for _, v := range allowed {
		if field == v {
			return field
		}
	}
	return "id"
}

func PaginateOffset[T any](
	c *gin.Context,
	db *gorm.DB,
	searchFields []string,
	sortFields []string,
) (*PaginationResponse[T], error) {

	// ===== Page & Limit =====
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	if page < 1 {
		page = 1
	}

	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "5"))
	if limit < 1 {
		limit = 5
	}

	offset := (page - 1) * limit

	// ===== Search =====
	q := c.Query("q")
	if q != "" && len(searchFields) > 0 {
		db = db.Where(func(tx *gorm.DB) *gorm.DB {
			for i, field := range searchFields {
				if i == 0 {
					tx = tx.Where(field+" LIKE ?", "%"+q+"%")
				} else {
					tx = tx.Or(field+" LIKE ?", "%"+q+"%")
				}
			}
			return tx
		})
	}

	// ===== Count =====
	var totalData int64
	if err := db.Count(&totalData).Error; err != nil {
		return nil, err
	}

	// ===== Sorting =====
	sort := allowedSort(
		c.DefaultQuery("sort", "id"),
		sortFields,
	)

	order := strings.ToLower(c.DefaultQuery("order", "desc"))
	if order != "asc" {
		order = "desc"
	}

	db = db.Order(sort + " " + order)

	// ===== Query Data =====
	var data []T
	if err := db.
		Limit(limit).
		Offset(offset).
		Find(&data).Error; err != nil {
		return nil, err
	}

	totalPage := int(math.Ceil(float64(totalData) / float64(limit)))

	return &PaginationResponse[T]{
		Data:      data,
		Page:      page,
		Limit:     limit,
		TotalData: totalData,
		TotalPage: totalPage,
	}, nil
}
