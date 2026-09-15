package pricing

import "testing"

func TestUSDCentsForGB(t *testing.T) {
	tests := []struct {
		input string
		want  int64
	}{
		{"0.1", 60},
		{"0.5", 300},
		{"1", 600},
		{"2", 1200},
		{"5", 3000},
		{"10", 6000},
		{"25", 15000},
		{"50", 30000},
		{"100", 60000},
	}
	for _, test := range tests {
		traffic, err := ParseTrafficGB(test.input)
		if err != nil { t.Fatalf("ParseTrafficGB(%q): %v", test.input, err) }
		if got := USDCentsForGB(traffic); got != test.want { t.Errorf("USDCentsForGB(%q) = %d, want %d", test.input, got, test.want) }
	}
}

func TestParseTrafficGBRejectsInvalidValues(t *testing.T) {
	for _, input := range []string{"", "0", "-1", "not-a-number"} {
		if _, err := ParseTrafficGB(input); err == nil { t.Errorf("ParseTrafficGB(%q) accepted invalid value", input) }
	}
}
