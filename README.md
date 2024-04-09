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
- The SVKM portal doesn't get updated immediately, so any given day's attendance most probably reflects after a few days.
- Since the wait time to get current data is long, last viewed data is stored in local-storage, it can be analyzed till then.
- There are some discrepancies in the data on the NMIMS app vs SVKM portal, verify your attendance to be sure!

### Screenshots of the PWA:

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/cd63c5b7-2eee-4ad0-80a6-43a63b411869)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/1efadbff-a6a8-405e-b9a0-69405f3ea94b)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/6e9d0e83-3ac8-4ee4-a6f8-566dc12dce4a)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/13fea7f2-4020-461f-bdec-ad414d48b4c2)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/9fcc107b-d862-4b22-a62c-251652e7aba8)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/9ce45a0e-cc0b-41d2-acc0-ed8f34662f03)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/bd9a9a59-aaa5-4dd1-8d95-1a0a903bc8b4)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/ee1d4be1-e52c-4564-afd0-0bf53e4376b5)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/4abe318d-081b-4d44-8481-7b8bc46d4976)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/e30089ac-99f6-450f-b8ce-06f2ed7d977a)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/ddf04422-ac07-464c-bf20-348994612bf5)

### Future Scope:

-   Update logic to make the response time faster, currently too slow
-   Option to select a date range to show the attendance data
