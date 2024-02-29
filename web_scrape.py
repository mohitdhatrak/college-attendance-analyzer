import os

from bs4 import BeautifulSoup
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select, WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager

load_dotenv()

# URL for scraping
loginURL = os.getenv('LOGIN_URL')
attendanceURL = os.getenv('ATTENDANCE_URL')

def scrape_attendance_summary(username, password, months, year):
    # Selenium driver setup
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument('--headless')  # to run in headless mode, without opening a browser window
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu") 
                                
    # Automatically download and use the appropriate ChromeDriver
    browser = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    wait = WebDriverWait(browser, 10)  # Maximum wait time of 10 seconds

    # visit the login URL
    browser.get(loginURL)

    username_field = browser.find_element(By.ID, 'userName')
    password_field = browser.find_element(By.ID, 'userPwd')
    username_field.send_keys(username)
    password_field.send_keys(password)
    # Submit the login form
    password_field.send_keys(Keys.RETURN)

    # wait till login occurs
    wait.until(EC.presence_of_element_located((By.ID, 'dashboardPage')))

    all_months_attendance_data = []

    for month in months:
        # Visit the month-wise attendance summary pages
        browser.get(f'{attendanceURL}?acadMonth={month}&acadYear={year}')
        # wait till page loads
        wait.until(EC.presence_of_element_located((By.ID, 'showStudentAttendancesSummary')))

        # to get all entries from pagination
        select_element = browser.find_element(By.NAME, 'showStudentAttendancesSummary_length')
        select = Select(select_element)
        # Select option by value -> -1 is for ALL
        select.select_by_value("-1")

        page_source = browser.page_source

        # Parse the attendance summary data from the page source using BeautifulSoup
        soup = BeautifulSoup(page_source, 'html.parser')
        attendance_summary_table = soup.find('table', id='showStudentAttendancesSummary')
        tbody = attendance_summary_table.find('tbody')
        all_months_attendance_data.append(str(tbody))

    # Close the browser
    browser.quit()

    return '<table>' + ''.join(all_months_attendance_data) + '</table>'
