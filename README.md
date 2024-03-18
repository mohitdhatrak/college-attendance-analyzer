# College Attendance Analyzer PWA for TY Sem 6

[![Netlify Status](https://api.netlify.com/api/v1/badges/08415c9a-2457-4240-8008-ab7eac2952bc/deploy-status)](https://app.netlify.com/sites/attendance-analyzer/deploys)

This [attendance app](https://attendance-analyzer.netlify.app) provides total attendance from the start of the semester upto the current date.
It is done by using web scraping to scrape data from the [SVKM Portal](https://portal.svkm.ac.in/usermgmt/login) website.
No database is used, the credentials entered are directly used to get the data, not saved anywhere.

### Attendance analyzer provides details in 3 colored zones:

-   Red zone: attendance < 75% -- shows no. of lectures to attend to have attendance >= 75%
-   Green zone: attendance >= 75% -- shows no. of lectures that can be missed still having attendance >= 75%
-   Yellow zone: attendance >= 75% -- this means, it is not possible to miss even 1 lecture to maintain attendance >-= 75%

### Screenshots of the PWA:

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/4b6a8ee6-1251-4b6c-8645-f55ea04c7cb8)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/7e8b9b31-4c37-4f9c-83a0-7df214fefd55)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/3ac9a23d-1b68-41aa-8986-1bec9240e858)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/bd9a9a59-aaa5-4dd1-8d95-1a0a903bc8b4)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/ee1d4be1-e52c-4564-afd0-0bf53e4376b5)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/4abe318d-081b-4d44-8481-7b8bc46d4976)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/fe0c42f7-3806-4e15-bd80-21f3771e1d7c)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/d87fb68e-677f-47ac-8d75-703850da6f55)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/7332714c-d64f-4a40-9e3f-055a14f19040)

### Future Scope:

-   Update logic to make the response time faster, currently too slow
-   Option to select a date range to show the attendance data
