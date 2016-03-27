from app import app

if __name__ == "__main__":
	app.load_words("bad_words.txt")
	app.debug = true
	app.run()
