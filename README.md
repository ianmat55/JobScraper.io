<div align='center'>
<img src='https://github.com/ianmat55/HireMe/blob/master/public/img/hireme_logo.png'>
</div>
<br>
Hire.me helps optimize your job search. Just create an account with a valid email, enter a desired job title and location, and Hire.me will scrape multiple job boards and display it for you in a nicely formatted table. Current features that are in development include timed emails that contain scraped jobs for the week, application management and a working api that returns a number of jobs listings in json format.

# Contents
- How to use
- Development
- Tests
- Liscense 
 
# How to Use

### Register email
Input name, password and email to register an account. Email should be a valid email since the server will use it to send you weekly job listings from different job boards. User information is stored in a postgres database using the node-postgres libray </p> 

### Login
Enter login credentials on the ``users/login`` route. The server will take the form input, check the database for a matching email and decrypted password and redirect to the main home page if the input is valid. If it is not, an error message will display and you will have to enter the correct credentials or create an account. 

### Input Search Query
The search query requires a job title input, location, number of listings to display per job board and companies that should be excluded from the search(optional). 

### Server scrapes various job boards and returns listings!
Viola! The data is scraped from the internet and displayed in tables with working links.

<div align='center'>
<img src='https://github.com/ianmat55/HireMe/blob/master/public/img/hireme_searchresults.png'>
</div>

# Tests
In development

# Liscense 
