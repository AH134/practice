package bot

import (
	"math/rand"
)

type Hand struct {
	HandShape string
	HandNo    int
}

type Bot struct {
	Name      string
	HandShape Hand
}

func (b *Bot) createHand(hs *[]Hand) {
	b.HandShape = (*hs)[rand.Intn(len(*hs))]
}

func CreateBot(n string) *Bot {
	hs := []Hand{
		{
			HandShape: "rock",
			HandNo:    1,
		},
		{
			HandShape: "paper",
			HandNo:    2,
		},
		{
			HandShape: "scissor",
			HandNo:    3,
		},
	}

	newBot := Bot{
		Name: n,
	}
	newBot.createHand(&hs)

	return &newBot
}
