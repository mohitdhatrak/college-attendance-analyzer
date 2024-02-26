import os

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select, WebDriverWait

# URL for scraping
loginURL = 'https://portal.svkm.ac.in/usermgmt/login'
attendanceURL = 'https://portal.svkm.ac.in/DJSCE/showStudentAttendanceSummaryByMonthAndYearNew'

def scrape_attendance_summary(username, password, months, year):
    # Selenium driver setup
    chrome_options = Options()
    chrome_options.add_argument('--headless')  # to run in headless mode, without opening a browser window
    chrome_options.add_argument("--disable-gpu")
    browser = webdriver.Chrome(options=chrome_options)

    # driver_path -> './drivers/chromedriver-windows.exe'
    # driver_path = '/home/mohitdhatrak/college-attendance-analyzer/drivers/chromedriver-linux'

    # Set the permissions to allow execution for all users
    # os.chmod(driver_path, 0o111)

    # service = Service(driver_path)
    # browser = webdriver.Chrome(service=service, options=chrome_options)
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

        # Locate the dropdown select tag
        select_element = browser.find_element(By.NAME, 'showStudentAttendancesSummary_length')
        select = Select(select_element)
        # Select the desired option by value -> -1 is for ALL
        select.select_by_value("-1")

        # Extract the page source
        page_source = browser.page_source

        # Parse the attendance summary data from the page source using BeautifulSoup
        soup = BeautifulSoup(page_source, 'html.parser')
        attendance_summary_table = soup.find('table', id='showStudentAttendancesSummary')
        tbody = attendance_summary_table.find('tbody')
        all_months_attendance_data.append(str(tbody))

    # Close the browser
    browser.quit()

    return '<table>' + ''.join(all_months_attendance_data) + '</table>'
