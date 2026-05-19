from .database import db

class Player(db.Model):
    """Represents a soccer player with their positions and preferred foot."""
    __tablename__ = 'players'
    name = db.Column(db.String(64), primary_key=True)
    preferredFoot = db.Column(db.String(5), unique=False, nullable=False)
    primaryPosition = db.Column(db.String(3), unique=False, nullable=False)
    secondaryPosition = db.Column(db.String(3), unique=False, nullable=True)
    
    def __repr__(self):
        return f'<Player {self.name}>'
    
    def get_positions(self):
        """Returns a list of all player positions."""
        positions = [self.primaryPosition]
        if self.secondaryPosition:
            positions.append(self.secondaryPosition)
        return positions