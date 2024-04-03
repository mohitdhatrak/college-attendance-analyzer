# College Attendance Analyzer PWA for TY Sem 6

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

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/808e42c1-e7b4-4aac-b79e-9dc9fb6356e7)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/1a2509d2-0340-4e17-b0c2-349fe3eecc25)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/5333a207-1ec6-4615-a49c-401816fce09c)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/11b106d6-646b-4a6d-b006-46561d6ef5d9)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/bd9a9a59-aaa5-4dd1-8d95-1a0a903bc8b4)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/ee1d4be1-e52c-4564-afd0-0bf53e4376b5)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/4abe318d-081b-4d44-8481-7b8bc46d4976)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/1bf70d91-03fa-427f-8196-78e991a08673)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/4cd83ee4-a112-4161-a4f0-6ac6bfd57fe9)

### Future Scope:

-   Update logic to make the response time faster, currently too slow
-   Option to select a date range to show the attendance data
