from flask import Flask, jsonify, request
app = Flask(__name__)

base = "/safesurf"

# Database for storing custom bad words
db = {'supermom':['cluckers'],
      'jesusmom':['devil', '666'],
      'conspiracydad':['jet', 'fuel']}

# List of default bad words
words = []

@app.route(base+"/")
def hello():
    return "SafeSurf: Swear Words as a service"
    
@app.route(base+"/users")
def get_users():
    if len(db) != 0:
        return jsonify(users=list(db.keys()), number_of_users=len(db), status=200)
    else:
        return jsonify(error="No currently registered users", status=404)

@app.route(base+"/users/<username>", methods = ['GET', 'POST', 'DELETE'])
def users(username):
    if username in db:
        if request.method == 'GET':
            return jsonify(username=username, 
                           number_of_custom_words=len(db[username]),
                           custom_words = list(db[username]))
        
        if request.method == 'POST':
            # Work around for Flask issues
            if len(request.form) != 0:
                word = request.form['word']
            else:
                word = request.args.get('word','')
            if not word in db[username] and len(word.strip()) != 0:
                db[username].append(word)
            
        if request.method == 'DELETE':
            db.pop(username, None)
        
        return jsonify(status=200)
    else:
        return jsonify(error="No user found with that name", status=404)

@app.route(base+"/register/<username>")
def register_user(username):
    if not username in db:
        db[username] = list()
	return jsonify(status=200)
    else:
        return jsonify(error="User already exists", status=404)


@app.route(base+"/words")
def get_base_words():
    return jsonify(result=words)
    
@app.route(base+"/words/<username>")
def get_user_words(username):
    if not username in db:
        return jsonify(error="Cannot find custom words for that user", status=404)
    else:
        return jsonify(result=db[username], status=200)    

    
def load_words(filename):
    global words
    with open(filename, 'r') as f:
        for line in f.readlines():
            if not '#' in line:
                words.append(line.strip())

if __name__ == "__main__":
    load_words("bad_words.txt")
    #app.debug = True
    app.run(host='0.0.0.0')
