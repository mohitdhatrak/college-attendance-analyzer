FROM --platform=linux/amd64 python:3.10-slim

WORKDIR /app

COPY . .

RUN pip install --trusted-host pypi.python.org -r requirements.txt

RUN apt-get update && apt-get install --fix-missing -y wget unzip && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt install -y ./google-chrome-stable_current_amd64.deb && \
    rm google-chrome-stable_current_amd64.deb && \
    apt-get clean

# Use gunicorn to run the Flask app
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:" + os.getenv('PORT', 8080), "--timeout", "120", "app:app"]