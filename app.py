import os

from dotenv import load_dotenv
from flask import Flask, render_template_string, request
from flask_cors import CORS

from web_scrape import scrape_attendance_summary

load_dotenv()

app = Flask(__name__)

if(os.getenv('ENVIRONMENT') == 'DEV'):
    CORS(app, origins='*')
else:
    CORS(app, origins=f"{os.getenv('CLIENT_URL')}")

@app.route('/semester', methods=['GET'])
def semester_start():
    return {"month": os.getenv('START_MONTH_NUMBER'), "year": os.getenv('START_YEAR')}

@app.route('/scrape', methods=['POST'])
def scrape_data():
    req_body = request.json
    username = req_body.get('username')
    password = req_body.get('password')
    months = req_body.get('months')
    year = req_body.get('year')

    html_content = scrape_attendance_summary(username, password, months, year)
    return render_template_string('<pre>{{ html_content }}</pre>', html_content=html_content)

if __name__ == '__main__':
    app.run(debug=os.getenv('DEBUG', False), port=os.getenv('PORT', 8080))