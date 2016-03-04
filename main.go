package main

import (
	"os"

	"github.com/minodisk/mav/command"
	"github.com/minodisk/mav/info"
)

func main() {
	g := MustAsset(".goxc.json")
	info, err := info.New(g)
	if err != nil {
		panic("fail to load bindata")
	}
	cmd := command.New(info, os.Stdout, os.Stderr)
	cmd.Run(os.Args)
}
