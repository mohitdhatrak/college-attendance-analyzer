from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select

# URL for the attendance summary page
loginURL = 'https://portal.svkm.ac.in/usermgmt/login'
attendanceURL = 'https://portal.svkm.ac.in/DJSCE/showStudentAttendanceSummaryByMonthAndYearNew'

def scrape_attendance_summary(username, password, months, year):
    # Selenium driver setup
    chrome_options = Options()
    chrome_options.add_argument('--headless')  # to run in headless mode, without opening a browser window
    service = Service('./drivers/chromedriver.exe')  # Path to your Chrome driver executable
    driver = webdriver.Chrome(service=service, options=chrome_options)
    print("Driver", driver)
    
    # Visit the login URL
    driver.get(loginURL)

    # Locate the username and password fields and input your credentials
    username_field = driver.find_element(By.ID, 'userName')
    password_field = driver.find_element(By.ID, 'userPwd')
    username_field.send_keys(username)
    password_field.send_keys(password)

    # Submit the login form
    password_field.send_keys(Keys.RETURN)

    all_months_attendance_data = []

    for month in months:
        # Visit the month-wise attendance summary page
        driver.get(f'{attendanceURL}?acadMonth={month}&acadYear={year}')

        # Locate the dropdown select tag
        select_element = driver.find_element(By.NAME, 'showStudentAttendancesSummary_length')
        select = Select(select_element)
        # Select the desired option by value -> -1 is for ALL
        select.select_by_value("-1")

        # Extract the page source
        page_source = driver.page_source

        # Parse the attendance summary data from the page source using BeautifulSoup
        soup = BeautifulSoup(page_source, 'html.parser')
        attendance_summary_table = soup.find('table', id='showStudentAttendancesSummary')
        tbody = attendance_summary_table.find('tbody')
        all_months_attendance_data.append(str(tbody))

    # Close the driver
    driver.quit()

    # return attendance data as html
    return '<table>' + ''.join(all_months_attendance_data) + '</table>'
