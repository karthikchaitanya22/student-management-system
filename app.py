from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('database.db')
    conn.execute('''CREATE TABLE IF NOT EXISTS students 
                   (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    name TEXT NOT NULL, 
                    email TEXT NOT NULL, 
                    grade TEXT NOT NULL)''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_students')
def get_students():
    conn = sqlite3.connect('database.db')
    cursor = conn.execute('SELECT * FROM students ORDER BY id DESC')
    students = [{'id': row[0], 'name': row[1], 'email': row[2], 'grade': row[3]} for row in cursor.fetchall()]
    conn.close()
    return jsonify(students)

@app.route('/add_student', methods=['POST'])
def add_student():
    data = request.json
    conn = sqlite3.connect('database.db')
    conn.execute('INSERT INTO students (name, email, grade) VALUES (?, ?, ?)', 
                 (data['name'], data['email'], data['grade']))
    conn.commit()
    conn.close()
    return jsonify({'status': 'success'})

@app.route('/delete_student/<int:id>', methods=['DELETE'])
def delete_student(id):
    conn = sqlite3.connect('database.db')
    conn.execute('DELETE FROM students WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'status': 'success'})

@app.route('/update_student/<int:id>', methods=['PUT'])
def update_student(id):
    data = request.json
    conn = sqlite3.connect('database.db')
    conn.execute('UPDATE students SET name = ?, email = ?, grade = ? WHERE id = ?', 
                 (data['name'], data['email'], data['grade'], id))
    conn.commit()
    conn.close()
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5001, host='127.0.0.1')

