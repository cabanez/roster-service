# Roster Input Service

An API for user facing inputs.

## Overview

This tool leverages UI frameworks to gather player inputs.

## Features

## Requirements

- Python 3.8+
- Virtual Environment (recommended)
- Dependencies listed in `requirements.txt`

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tactical-optimization-tool
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # On Windows
   source .venv/bin/activate  # On macOS/Linux
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

```bash
python app.py
```

## Configuration

Configure the tool by modifying parameters such as:
- Team composition and player attributes
- Opponent analysis and strengths/weaknesses
- Environmental conditions
- Strategic objectives

## Development

To contribute or extend functionality:

1. Ensure your virtual environment is activated
2. Make changes to the codebase
3. Test your changes thoroughly
4. Submit a pull request with a clear description

## License

[Add your license here]

## Contact

[Add contact information or maintainer details]

## Docker

Build the image from the `roster-input-service` root:

```bash
docker build -t roster-input-service:latest .
```

Run the container and map the API port:

```bash
docker run -p 5000:5000 roster-input-service:latest
```

Notes:
- The Flask app listens on port `5000` (see `server/app.py`).
- If your `requirements.txt` includes packages that need system libraries, the `Dockerfile` installs basic build tools.
