FROM golang:1.25-alpine AS builder

WORKDIR /app

# dependency wajib
RUN apk add --no-cache git ca-certificates

# 🔑 SET GOPROXY (INI PENTING)
ENV GOPROXY=https://proxy.golang.org,direct

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o app

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/app .

EXPOSE 8080
CMD ["./app"]
