# College Attendance Analyzer for TY Sem 6

It provides total attendance from the start of lectures upto current date.
It is done by using web scraping to scrape data from the [SVKM Portal website](https://portal.svkm.ac.in/usermgmt/login).
No database is used, the credentials entered are directly used to get the data, not saved anywhere.

### Attendance analyzer provides details in 3 colored zones:

-   Red zone: attendance < 75% -- shows no. of lectures to attend to have attendance >= 75%
-   Green zone: attendance >= 75% -- shows no. of lectures that can be missed still having attendance >= 75%
-   Yellow zone: attendance >= 75% -- this means, it is not possible to miss even 1 lecture to maintain attendance >-= 75%

### Future Scope:

-   Option to select a date range to show the attendance data
