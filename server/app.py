import os
import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS
from db.database import db
from db import models
from config import SQLALCHEMY_DATABASE_URI


def ensure_sqlite_player_columns(db_uri):
    if not db_uri.startswith('sqlite:///'):
        return

    db_path = db_uri.replace('sqlite:///', '', 1)
    if not os.path.exists(db_path):
        return

    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    cursor.execute('PRAGMA table_info(players)')
    existing_columns = {row[1] for row in cursor.fetchall()}

    required_columns = [
        ('technicalRating', 'INTEGER', '0'),
        ('mentalRating', 'INTEGER', '0'),
        ('physicalRating', 'INTEGER', '0')
    ]

    for column_name, column_type, default_value in required_columns:
        if column_name not in existing_columns:
            cursor.execute(
                f'ALTER TABLE players ADD COLUMN {column_name} {column_type} NOT NULL DEFAULT {default_value}'
            )
            print(f"Added missing column {column_name} to players table.")

    connection.commit()
    connection.close()


def create_app(db_uri):
    flask_app = Flask(__name__)
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

    ensure_sqlite_player_columns(db_uri)

    db.init_app(flask_app)

    with flask_app.app_context():
        print("Creating database tables...")
        db.create_all()  # Creates tables based on defined models
        print("Database tables created.")
        models.seed_initial_teams()
        print("Initial teams seeded.")
    return flask_app

app = create_app(SQLALCHEMY_DATABASE_URI)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/')
def index():
    return "Welcome to the Player Input Service!"

@app.route('/api/player/<int:player_id>', methods=['GET'])
def get_player(player_id):
    from db.models import Player
    player = Player.query.get(player_id)
    
    if not player:
        return jsonify({"error": "Player not found"}), 404
    
    player_info = {
        "id": player.id,
        "name": player.name,
        "team": player.team,
        "age": player.age,
        "leftRating": player.leftRating,
        "rightRating": player.rightRating,
        "primaryPosition": player.primaryPosition,
        "secondaryPosition": player.secondaryPosition,
        "technicalRating": player.technicalRating,
        "mentalRating": player.mentalRating,
        "physicalRating": player.physicalRating,
        "available": player.available
    }
    
    return jsonify(player_info), 200

@app.route('/api/player/<int:player_id>', methods=['PUT'])
def update_player(player_id):
    if not request.is_json:
        return jsonify({'error': 'Unsupported Media Type, JSON expected'}), 415

    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    from db.models import Player
    player = Player.query.get(player_id)
    if not player:
        return jsonify({"error": "Player not found"}), 404

    try:
        player.name = data.get('name', player.name)
        player.team = data.get('team', player.team)
        player.age = data.get('age', player.age)
        player.leftRating = data.get('leftRating', player.leftRating)
        player.rightRating = data.get('rightRating', player.rightRating)
        player.primaryPosition = data.get('primaryPosition', player.primaryPosition)
        player.secondaryPosition = data.get('secondaryPosition', player.secondaryPosition)
        player.technicalRating = data.get('technicalRating', player.technicalRating)
        player.mentalRating = data.get('mentalRating', player.mentalRating)
        player.physicalRating = data.get('physicalRating', player.physicalRating)
        player.available = data.get('available', player.available)

        db.session.commit()
        return jsonify({"message": f"Player {player.name} updated successfully!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@app.route('/api/player', methods=['POST'])
def create_player():
    
    # Check if Content-Type is application/json
    if not request.is_json:
        return jsonify({'error': 'Unsupported Media Type, JSON expected'}), 415
    
    data = request.get_json()
    print("Received data:", data)
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    name = data.get('name')
    team = data.get('team')
    age = data.get('age')
    leftRating = data.get('leftRating')
    rightRating = data.get('rightRating')
    primaryPosition = data.get('primaryPosition')
    secondaryPosition = data.get('secondaryPosition')
    technicalRating = data.get('technicalRating')
    mentalRating = data.get('mentalRating')
    physicalRating = data.get('physicalRating')
    available = data.get('available')

    print(f"Received: {name}, {team}, {age}, {leftRating}, {rightRating}, {primaryPosition}, {secondaryPosition}, {technicalRating}, {mentalRating}, {physicalRating}, {available}")

    # Import the Player model
    from db.models import Player
    
    try:
        # Create a new player instance
        new_player = Player(
            name=name,
            team=team,
            age=age,
            leftRating=leftRating,
            rightRating=rightRating,
            primaryPosition=primaryPosition,
            secondaryPosition=secondaryPosition,
            technicalRating=technicalRating,
            mentalRating=mentalRating,
            physicalRating=physicalRating,
            available=available
        )
        
        # Add and commit to the database
        db.session.add(new_player)
        db.session.commit()
        
        return jsonify({"message": f"Player {name} added successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@app.route('/api/teams', methods=['GET'])
def get_teams():
    from db.models import Team
    teams = Team.query.all()
    team_list = []
    for team in teams:
        team_info = {
            "name": team.name,
            "id": team.id
        }
        team_list.append(team_info)

    return jsonify(team_list), 200

@app.route('/api/players', methods=['GET'])
def get_players():
    # Import the Player model
    from db.models import Player

    # Get the 'team' query parameter from the URL
    team_name = request.args.get('team')

    # Start with all players
    query = Player.query

    # Filter by team if the parameter is provided
    if team_name:
        query = query.filter(Player.team == team_name)

    players = query.all()

    player_list = []
    for player in players:
        player_info = {
            "id": player.id,
            "name": player.name,
            "team": player.team,
            "age": player.age,
            "leftRating": player.leftRating,
            "rightRating": player.rightRating,
            "primaryPosition": player.primaryPosition,
            "secondaryPosition": player.secondaryPosition,
            "technicalRating": player.technicalRating,
            "mentalRating": player.mentalRating,
            "physicalRating": player.physicalRating,
            "available": player.available
        }
        player_list.append(player_info)
    
    return jsonify(player_list), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=5000)
