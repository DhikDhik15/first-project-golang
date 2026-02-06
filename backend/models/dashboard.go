package models

type Graph struct {
	ID       uint   `json:"id"`
	Name     string `json:"name"`
	Stock    int    `json:"stock"`
	Quantity int    `json:"quantity"`
}
