# College Attendance Analyzer for TY Sem 6

[![Netlify Status](https://api.netlify.com/api/v1/badges/08415c9a-2457-4240-8008-ab7eac2952bc/deploy-status)](https://app.netlify.com/sites/attendance-analyzer/deploys)

This [attendance app](https://attendance-analyzer.netlify.app) provides total attendance from the start of semester upto current date.
It is done by using web scraping to scrape data from the [SVKM Portal](https://portal.svkm.ac.in/usermgmt/login) website.
No database is used, the credentials entered are directly used to get the data, not saved anywhere.

### Attendance analyzer provides details in 3 colored zones:

-   Red zone: attendance < 75% -- shows no. of lectures to attend to have attendance >= 75%
-   Green zone: attendance >= 75% -- shows no. of lectures that can be missed still having attendance >= 75%
-   Yellow zone: attendance >= 75% -- this means, it is not possible to miss even 1 lecture to maintain attendance >-= 75%

### Screenshots of the app:

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/03a3e136-c307-4ac9-ad8a-c337c3e43721)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/c87ea310-89f1-4448-960e-99be953c0ae2)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/941990a1-42e2-4c22-8936-0626ae1182da)

![image](https://github.com/mohitdhatrak/college-attendance-analyzer/assets/91209576/c111e445-00f0-41dc-9707-0bf7ba30b7d5)

### Future Scope:

-   Update logic to make the response time faster, currently too slow
-   Option to select a date range to show the attendance data
