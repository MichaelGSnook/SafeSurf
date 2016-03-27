from flask import Flask, jsonify, request
import pickle, atexit
app = Flask(__name__)

base = "/safesurf"

# Database for storing custom bad words
db = {'supermom':['cluckers'],
      'jesusmom':['devil', '666'],
      'conspiracydad':['jet', 'fuel']}

@app.route(base+"/")
def hello():
    return "SafeSurf: Swear Words as a service"
    
@app.route(base+"/users")
def get_users():
    if len(db) != 0:
        return jsonify(users=list(db.keys()), number_of_users=len(db), status=200)
    else:
        return jsonify(error="No currently registered users", status=404)

@app.route(base+"/user/<username>", methods = ['GET', 'POST', 'DELETE'])
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
            if len(request.form) != 0:
                word = request.form['word']
            else:
                word = request.args.get('word','')
            if word in db[username] and len(word.strip()) != 0:
                db[username].remove(word)
        
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

@app.route(base+"/unregister/<username>")
def unregister_user(username):
    if username in db:
        db.pop(username, None)
        return jsonify(status=200)
    else:
        return jsonify(error="User does not exist", status=404)
    
@app.route(base+"/words/<username>")
def get_user_words(username):
    if not username in db:
        return jsonify(error="Cannot find custom words for that user", status=404)
    else:
        return jsonify(result=db[username], status=200)    

def load_users(databasename):
    global db
    db = pickle.load(open(databasename, "rb"))
    
def store_users(databasename):
    pickle.dump(db, open(databasename, "wb"), protocol=2)

def cleanup():
    store_users("users.db")
    
atexit.register(cleanup)
if __name__ == "__main__":
    load_users("users.db")
    #app.debug = True
    app.run(host='0.0.0.0')
