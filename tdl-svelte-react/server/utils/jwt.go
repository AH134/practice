package utils

import (
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

type JWT struct {
	key []byte
}

func NewJWT() *JWT {
	godotenv.Load()
	token := os.Getenv("JWT_TOKEN")
	jwt := &JWT{
		key: []byte(token),
	}

	return jwt
}

func (j JWT) CreateToken(name string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"name": name,
		"exp":  time.Now().Add(time.Minute * 10).Unix(),
	})

	tokenString, err := token.SignedString(j.key)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

// return name from jwt claims
func (j JWT) VerifyToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return j.key, nil
	})

	if err != nil {
		return "", err
	}

	if !token.Valid {
		return "", fmt.Errorf("invalid token")
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		name := claims["name"].(string)
		return name, nil
	}
	return "", nil
}
