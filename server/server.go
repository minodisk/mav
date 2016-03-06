package server

import (
	"io/ioutil"
	"log"
	"net/http"
	"regexp"
	"sync"

	"github.com/zenazn/goji/web"
)

func Start() {
	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		err := initWatcher()
		if err != nil {
			log.Println(err)
		}
		wg.Done()
	}()

	go func() {
		err := initServer()
		if err != nil {
			log.Println(err)
		}
		wg.Done()
	}()

	wg.Wait()
	return
}

var (
	rStatic = regexp.MustCompile(`^\/[^\/]*\.(html|css|js(\.map)?|eot|ttf|woff2?)$`)
)

func initServer() (err error) {
	log.Println("init server")

	m := web.New()
	m.Get("/socket", handleWebScoket)
	m.Get(rStatic, http.FileServer(http.Dir("client/dist")))
	m.Get("/*", serveIndex)

	http.Handle("/", m)
	http.ListenAndServe(":8000", nil)

	log.Println("init server complete")
	return
}

func serveIndex(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "text/html")
	b, err := ioutil.ReadFile("client/dist/index.html")
	if err != nil {
		panic(err)
	}
	w.Write(b)
}
