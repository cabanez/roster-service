from .database import db

class Player(db.Model):
    """Represents a soccer player with their respective data."""
    __tablename__ = 'players'
    name = db.Column(db.String(64), primary_key=True)
    age = db.Column(db.Integer, unique=False, nullable=False)
    leftRating = db.Column(db.Integer, unique=False, nullable=False)
    rightRating = db.Column(db.Integer, unique=False, nullable=False)
    primaryPosition = db.Column(db.String(3), unique=False, nullable=False)
    secondaryPosition = db.Column(db.String(3), unique=False, nullable=True)
    available = db.Column(db.Boolean, unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Player {self.name}>'
    
    def get_positions(self):
        """Returns a list of all player positions."""
        positions = [self.primaryPosition]
        if self.secondaryPosition:
            positions.append(self.secondaryPosition)
        return positions