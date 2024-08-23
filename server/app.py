from flask import Flask, request, jsonify
from dotenv import load_dotenv
from pymongo import MongoClient
import os
from datetime import datetime
from flask_cors import CORS

from cuid2 import Cuid

CUID_GENERATOR: Cuid = Cuid(length=10)


load_dotenv()

app = Flask(__name__)

CORS(app)

client = MongoClient(os.getenv("MONGO_URI"))
db = client.db




def isValidMobile(mobile):
    return all(char.isdigit() for char in mobile)

@app.route('/api/adduser', methods = ["POST"])
def addUser(): 
    data = request.get_json()
    try: 
        if(data['userId'] == None or (data['username'] == None or len(data['username']) < 3) or (data['mobile'] == None or len(data['mobile']) != 10 or (not isValidMobile(data['mobile'])))):
            return jsonify({'success': False, 'error': 'Invalid credentials'}), 400
        user = db.users.find_one(data)
        if(user):
            return jsonify({'success': False, 'error': 'User already exists'}), 400
        result = db.users.insert_one(data)
        if(result.inserted_id):
            return jsonify({'success': True, 'message': 'User added successfully'})
        return jsonify({'success': False, 'error': 'Something went wrong'}), 500
    except: 
        return jsonify({'success': False, 'error': 'Internal server error'}), 500
    
    
@app.route('/api/getuser/<userId>', methods = ["GET"])
def getuser(userId):
    try: 
        user = db.users.find_one({'userId': userId}, {'_id': 0})
        if(not user):
            return jsonify({'success': False, 'error': 'User not found'}), 400
        assigns = list(db.assigns.find({'userId': userId},{'bookId':1, '_id': 0})) or []
        assignIds = []
        for assign in assigns:
            assignIds.append(assign['bookId'])
        books = list(db.books.find({'bookId': {'$in': assignIds}}, {'_id': 0})) or []
        return jsonify({'success': True, 'user':{'userId': user['userId'], 'username': user['username'], 'mobile': user['mobile'], 'books': books}})
    except: 
        return jsonify({'success': False, 'error': 'Internal server error'}), 500
    
@app.route('/api/debounce/<userId>', methods = ["GET"])
def getdebounce(userId):
    try: 
        cursor = db.users.find({'userId': {'$regex': f'^{userId}'}}, {'_id': 0})
        users = list(cursor)
        return jsonify({'success': True, 'users': users})
    except: 
        return jsonify({'success': False, 'error': 'Internal server error'})
    
@app.route('/api/getallusers', methods = ["GET"])
def getallusers():
    try:
        cursor = db.users.find({}, {"_id": 0})
        users = list(cursor)
        return jsonify({'success': True, 'users': users})
    except:
        return jsonify({'success': False, 'error': 'Internal server error'}), 500
    
@app.route('/api/addbook', methods = ["POST"])
def addbook():
    data = request.get_json()
    try:
        if(len(data['title']) < 3):
            return jsonify({'success': False, 'error': 'Title must have atleast 3 characters'}), 400
        if(len(data['author']) < 3):
            return jsonify({'success': False, 'error': 'Author must have atleast 3 characters'}), 400
        if(int(data['count']) <= 0):
            return jsonify({'success': False, 'error': 'Atleast one copy of book is needed'}), 400
        if(len(data['description'].split()) < 7):
            return jsonify({'success': False, 'error': 'Description must have atleast 7 words'}), 400
        if('"' in data['description']):
            return jsonify({'success': False, 'error': 'String quotes are not allowed in description'}), 400
        
        data['bookId'] = CUID_GENERATOR.generate()

        book = db.books.find_one(data)
        if(book):
            return jsonify({'success': False, 'error': 'Book details already exists'}), 400
        result = db.books.insert_one(data)
        if(result.inserted_id):
            return jsonify({'success': True, 'message': 'Book details added successfully'})
        return jsonify({'success': False, 'error': 'Book details already exists'}), 500

    except:
        return jsonify({'success': False, 'error': 'Something went wrong'}), 500
    

@app.route('/api/getallassigns', methods = ["GET"])
def getallassigns():
    try:
        cursor = db.assigns.find({}, {"_id": 0})
        assigns = list(cursor)
        for assign in assigns:
            book = db.books.find_one({'bookId': assign['bookId']}, {"_id": 0})
            assign['bookname'] = book['title']
        return jsonify({'success': True, 'assigns': assigns})
    except:
        return jsonify({'success': False, 'error': 'Internal server error'}), 500
    

@app.route('/api/assignbook', methods = ["POST"])
def assignbook(): 
    data = request.get_json()
    try:
        user = db.users.find_one({'userId': data['userId']})
        if(not user):
            return jsonify({'success': False, 'error': 'Invalid user'}), 400
        book = db.books.find_one({'bookId': data['bookId']}, {'_id': 0, 'count': 1})
        if(not book):
            return jsonify({'success': False, 'error': 'Invalid book'}), 400
        assign = db.assigns.find_one({'userId': data['userId'], 'bookId': data['bookId']})
        if(assign):
                return jsonify({'success': False, 'error': 'A copy of book already assigned to user'}), 403
        count = db.assigns.count_documents({'bookId': data['bookId']})
        if(book['count'] > count):
            db.assigns.insert_one({'assignId': CUID_GENERATOR.generate(),'userId': data['userId'], 'bookId': data['bookId'], 'assignedAt': datetime.now()})
            return jsonify({'success': True, 'message': 'Book assigned successfully'})
        return jsonify({'success': False, 'error': 'Insufficient book stock'}), 400
    except: 
        return jsonify({'success': False, 'error': 'Internal server error'}), 500
    

    
@app.route('/api/returnbook/<assignId>', methods = ["DELETE"])
def returnbook(assignId):
    try: 
        assign = db.assigns.delete_one({'assignId': assignId})
        if(assign.deleted_count > 0):
            return jsonify({'success': True, 'message': 'Book collected successfully'})
        return jsonify({'success': False, 'error': 'Error occured while collecting book'}), 400
    except: 
        return jsonify({'success': False, 'error': 'Internal server error'}), 500
    

@app.route('/api/getallbooks', methods = ["GET"])
def getallbooks():
    try: 
        cursor = db.books.find({}, {'_id': 0})
        books = list(cursor)
        if(len(books) > 0):
            for book in books:
                available = db.assigns.count_documents({'bookId': book['bookId']})
                book['available'] = book['count'] - available
        return jsonify({'success': True, 'books': books})
    except: 
        return jsonify({'success': False, 'error': 'Internal server error'})
    

if __name__ == '__main__':
    app.run(debug=False)