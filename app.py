from flask import Flask, render_template_string, request
from flask_cors import CORS

from web_scrape import scrape_attendance_summary

app = Flask(__name__)
CORS(app, origins='*')
# CORS(app, origins=['http://localhost:5000')

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
    app.run(debug=True, port=5000)