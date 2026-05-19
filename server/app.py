from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from numpy import add
from db.database import db
from config import SQLALCHEMY_DATABASE_URI

def create_app(db_uri):
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    db.init_app(app)

    with app.app_context():
        db.create_all()  # Creates tables based on defined models

    return app

app = create_app(SQLALCHEMY_DATABASE_URI)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/')
def index():
    return "Hello, this is a Flask microservice!"

@app.route('/call-api', methods=['POST'])
def call_api():
    
    # Check if Content-Type is application/json
    if not request.is_json:
        return jsonify({'error': 'Unsupported Media Type, JSON expected'}), 415
    
    data = request.get_json()
    print("Received data:", data)
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    name = data.get('name')
    preferredFoot = data.get('preferredFoot')
    primaryPosition = data.get('primaryPosition')

    print(f"Received: {name}, {preferredFoot}, {primaryPosition}")
    
    # Import the Player model
    from db.models import Player
    
    try:
        # Create a new player instance
        new_player = Player(
            name=name,
            preferredFoot=preferredFoot,
            primaryPosition=primaryPosition
        )
        
        # Add and commit to the database
        db.session.add(new_player)
        db.session.commit()
        
        return jsonify({"message": f"Player {name} added successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5000)
