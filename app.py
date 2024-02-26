from flask import Flask, render_template_string, request
from flask_cors import CORS, cross_origin

from web_scrape import scrape_attendance_summary

app = Flask(__name__)
# CORS(app, origins='*')
# CORS(app, origins=['https://attendance-analyzer.netlify.app', 'http://localhost:5500'])

@app.route('/scrape', methods=['POST'])
@cross_origin(origins='*')
def scrape_data():
    req_body = request.json
    username = req_body.get('username')
    password = req_body.get('password')
    months = req_body.get('months')
    year = req_body.get('year')

    html_content = scrape_attendance_summary(username, password, months, year)
    return render_template_string('<pre>{{ html_content }}</pre>', html_content=html_content)

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)