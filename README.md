# College Attendance Analyzer PWA for DJSCE

[![Netlify Status](https://api.netlify.com/api/v1/badges/08415c9a-2457-4240-8008-ab7eac2952bc/deploy-status)](https://app.netlify.com/sites/attendance-analyzer/deploys)

This [attendance app](https://attendance-analyzer.netlify.app) provides total attendance from the start of the semester upto the current date.
It is done by using web scraping to scrape data from the [SVKM Portal](https://portal.svkm.ac.in/usermgmt/login) website.

### Attendance analyzer provides details in 3 colored zones (sorted in ascending order as per attendance):

-   Red zone: attendance < 75% -- shows no. of lectures to attend to have attendance >= 75%
-   Green zone: attendance >= 75% -- shows no. of lectures that can be missed still having attendance >= 75%
-   Yellow zone: attendance >= 75% -- this means, it is not possible to miss even 1 lecture to maintain attendance >= 75%

### A few points to note:

- No database is used, the credentials entered are directly used to get the data, not saved anywhere.
- Implemented hashing for SAPID, before sending data to Google Analytics ensuring users privacy.
- The SVKM portal doesn't get updated immediately, so any given day's attendance most probably reflects after a few days.
- Since the wait time to get current data is long, last viewed data is stored in local-storage, it can be analyzed till then.
- There are some discrepancies in the data on the NMIMS app vs SVKM portal, verify your attendance to be sure!

### Screenshots of the PWA:

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/1b27b100-c404-4063-a472-dd68fb69e647)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/6e9d0e83-3ac8-4ee4-a6f8-566dc12dce4a)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/13fea7f2-4020-461f-bdec-ad414d48b4c2)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/9fcc107b-d862-4b22-a62c-251652e7aba8)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/9ce45a0e-cc0b-41d2-acc0-ed8f34662f03)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/bd9a9a59-aaa5-4dd1-8d95-1a0a903bc8b4)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/ee1d4be1-e52c-4564-afd0-0bf53e4376b5)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/4abe318d-081b-4d44-8481-7b8bc46d4976)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/e30089ac-99f6-450f-b8ce-06f2ed7d977a)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/ddf04422-ac07-464c-bf20-348994612bf5)

- Analytics

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/b25a42b6-5c6c-4536-b9ef-508f15fea23f)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/bc6062fa-ebfc-453f-8163-3a64500897b1)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/1ecf46e2-b26c-4e08-8170-83ae1fdd4ac9)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/f5b19f93-d6e4-4226-a631-bd3b345d57a7)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/040b7ae9-2d73-47ce-93d9-b95757efe537)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/4545b5a9-d6d4-415c-8951-ce4aa33e47d7)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/5096cabc-0492-4bf7-a86c-9d998a19ea63)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/a52d2a02-a0ee-46f4-b7b5-c69e594f5d60)

### Future Scope:

-   Update logic to make the response time faster, currently too slow
-   Option to select a date range to show the attendance data
