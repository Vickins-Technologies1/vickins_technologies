package proxy

func DeltaBytes(previousTotal, currentTotal int64) int64 {
	if currentTotal <= previousTotal {
		return 0
	}
	return currentTotal - previousTotal
}

func CreditsUsed(deltaBytes int64, creditsPerGB float64) float64 {
	if deltaBytes <= 0 {
		return 0
	}
	gb := float64(deltaBytes) / float64(1024*1024*1024)
	return gb * creditsPerGB
}
