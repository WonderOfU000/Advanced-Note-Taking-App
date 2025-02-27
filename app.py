from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

notes = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/api/notes', methods=['GET', 'POST', 'DELETE'])
def handle_notes():
    if request.method == 'POST':
        note = request.json.get('note')
        notes.append(note)
        return jsonify({"message": "Note added", "notes": notes})
    
    if request.method == 'DELETE':
        note = request.json.get('note')
        if note in notes:
            notes.remove(note)
            return jsonify({"message": "Note deleted", "notes": notes})
        return jsonify({"message": "Note not found"}), 404
    
    return jsonify({"notes": notes})

if __name__ == '__main__':
    app.run(debug=True)
