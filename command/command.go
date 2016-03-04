package command

import (
	"fmt"
	"io"

	"github.com/alecthomas/kingpin"
	"github.com/minodisk/mav/info"
	"github.com/minodisk/mav/server"
)

type Command struct {
	Out   io.Writer
	Error io.Writer

	Application   *kingpin.Application
	GlobalOptions GlobalOptions
	ServeRunner   ServeRunner
}

type GlobalOptions struct {
	Debug *bool
}

func New(info info.Info, out io.Writer, err io.Writer) (c Command) {
	c.Out = out
	c.Error = err

	c.Application = kingpin.New("mav", "Previewer for markdown files in browser")
	c.Application.Version(info.Version)
	c.Application.Author(info.Author)
	c.GlobalOptions = GlobalOptions{
		Debug: c.Application.Flag("debug", "Enable debug mode.").Bool(),
	}

	c.ServeRunner = ServeRunner{
		file: c.Application.Arg("dir|file", "The directory or file for preview").String(),
	}

	return
}

func (c Command) Run(args []string) {
	var err error

	cmd, err := c.Application.Parse(args[1:])

	switch kingpin.MustParse(cmd, err) {
	}

	err = c.ServeRunner.Run(c.GlobalOptions, c.Out)
	if err != nil {
		fmt.Fprintf(c.Error, "%s\n", err)
	}
	server.Start()
}

type ServeRunner struct {
	file *string
}

func (r ServeRunner) Run(o GlobalOptions, w io.Writer) (err error) {
	server.Start()
	return
}
