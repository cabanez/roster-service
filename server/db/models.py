from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import event
from .database import db

# This module defines the database models for the roster input service, including Player and Team.
class Player(db.Model):
    """Represents a soccer player with their respective data."""
    __tablename__ = 'players'
    id = Column(Integer, primary_key=True)
    name = Column(String(64), unique=True, nullable=False)  # Keep name unique
    team = db.Column(Integer, ForeignKey('teams.id'), unique=False, nullable=False)
    age = db.Column(Integer, unique=False, nullable=False)
    leftRating = db.Column(Integer, unique=False, nullable=False)
    rightRating = db.Column(Integer, unique=False, nullable=False)
    primaryPosition = db.Column(String(3), unique=False, nullable=False)
    secondaryPosition = db.Column(String(3), unique=False, nullable=True)
    available = db.Column(Boolean, unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Player {self.name}>'
    
    def get_positions(self):
        """Returns a list of all player positions."""
        positions = [self.primaryPosition]
        if self.secondaryPosition:
            positions.append(self.secondaryPosition)
        return positions
    
class Team(db.Model):
    """Represents a soccer team with its name and roster of players."""
    __tablename__ = 'teams'
    id = Column(Integer, primary_key=True)
    name = Column(String(64), unique=True, nullable=False)

     # Many-to-many relationship via association table
    roster = relationship('Player', secondary='team_players', backref='teams')
    
    def __repr__(self):
        return f'<Team {self.name}>'
    
# Association table for many-to-many relationship between Team and Player
team_players = db.Table('team_players',
    Column('team_id', Integer, ForeignKey('teams.id'), primary_key=True),
    Column('player_id', Integer, ForeignKey('players.id'), primary_key=True)
)

# Initial team data helpers
def get_initial_teams():
    return [
        Team(name='Algeria'),
        Team(name='Argentina'),
        Team(name='Austria'),
        Team(name='Australia'),
        Team(name='Belgium'),
        Team(name='Bosnia and Herzegovina'),
        Team(name='Brazil'),
        Team(name='Canada'),
        Team(name='Cape Verde'),
        Team(name='Colombia'),
        Team(name='Congo'),
        Team(name='Croatia'),
        Team(name='Curacao'),
        Team(name='Czechia'),
        Team(name='Ecuador'),
        Team(name='Egypt'),
        Team(name='England'),
        Team(name='France'),
        Team(name='Germany'),
        Team(name='Ghana'),
        Team(name='Haiti'),
        Team(name='Iran'),
        Team(name='Iraq'),
        Team(name='Ivory Coast'),
        Team(name='Japan'),
        Team(name='Jordan'),
        Team(name='Morocco'),
        Team(name='Mexico'),
        Team(name='Netherlands'),
        Team(name='New Zealand'),
        Team(name='Norway'),
        Team(name='Paraguay'),
        Team(name='Panama'),
        Team(name='Portugal'),
        Team(name='Qatar'),
        Team(name='Saudi Arabia'),
        Team(name='Scotland'),
        Team(name='Senegal'),
        Team(name='South Africa'),
        Team(name='South Korea'),
        Team(name='Spain'),
        Team(name='Sweden'),
        Team(name='Switzerland'),
        Team(name='Tunisia'),
        Team(name='Turkey'),
        Team(name='United States'),
        Team(name='Uruguay'),
        Team(name='Uzbekistan')
    ]


def seed_initial_teams():
    if db.session.query(Team).count() == 0:
        teams = get_initial_teams()
        db.session.bulk_save_objects(teams)
        db.session.commit()
