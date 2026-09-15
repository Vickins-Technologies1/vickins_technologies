package pricing

import (
	"errors"
	"math/big"
)

// One GB is the canonical customer-facing traffic unit throughout V-Guard.
const BytesPerGB int64 = 1024 * 1024 * 1024

// PricePerGBUSDCents is the authoritative product price: $6.00 per GB.
const PricePerGBUSDCents int64 = 600
const MaxTrafficGB float64 = 1000

var ErrInvalidTraffic = errors.New("traffic amount must be greater than zero")

// ParseTrafficGB accepts decimal input without using binary floating point for money.
func ParseTrafficGB(value string) (*big.Rat, error) {
	ratio, ok := new(big.Rat).SetString(value)
	if !ok || ratio.Sign() <= 0 {
		return nil, ErrInvalidTraffic
	}
	return ratio, nil
}

// USDCentsForGB rounds a positive decimal GB amount to the nearest cent.
func USDCentsForGB(gb *big.Rat) int64 {
	amount := new(big.Rat).Mul(gb, big.NewRat(PricePerGBUSDCents, 1))
	quotient := new(big.Int).Quo(amount.Num(), amount.Denom())
	remainder := new(big.Int).Mod(amount.Num(), amount.Denom())
	if new(big.Int).Mul(remainder, big.NewInt(2)).Cmp(amount.Denom()) >= 0 {
		quotient.Add(quotient, big.NewInt(1))
	}
	return quotient.Int64()
}

func GBFromBytes(bytes int64) float64 {
	return float64(bytes) / float64(BytesPerGB)
}
