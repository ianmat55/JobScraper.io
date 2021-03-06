<div align='center'>
<img src='https://github.com/ianmat55/JobScraper.io/blob/master/public/img/logo.png'>
</div>
<br>

JobScraper.io was built to optimize the job searching process. Job seekers that are casually searching for open positions from various sources on the web might find this app useful.
 
Just create an account with a valid email, enter a desired job title and location, and the server will scrape multiple job boards and display it for you in a nicely formatted table. Current features that are in development include timed emails that contain scraped jobs for the week, application management and a working api that returns a number of jobs listings in json format.

Dev <a href='https://hire-me101.herokuapp.com/'> Link </a>
 
# Contents
- [How to use](#How-to-Use)
- [Development](#Development)
- [Tests](#Tests)
- [License](#License) 
 
# How to Use

### UPDATE: Site can only scrape listings if hosted locally, currently working on production ready site
---

### Register email
Input name, password and email to register an account. Email should be a valid email since the server will use it to send you weekly job listings from different job boards. User information is stored in a postgres database using the node-postgres libray </p> 

### Login
Enter login credentials on the ``users/login`` route. The server will take the form input, check the database for a matching email and decrypted password and redirect to the main home page if the input is valid. If it is not, an error message will display and you will have to enter the correct credentials or create an account. 

### Input Search Query
The search query requires a job title input, location, number of listings to display per job board and companies that should be excluded from the search(optional). 

### Server scrapes various job boards and returns listings!
Viola! The data is scraped from the internet and displayed in tables with working links.

<div align='center'>
<img src='https://github.com/ianmat55/JobScraper.io/blob/master/public/img/Results.png'>
</div>

# Development
JobScraper.io is built with node and express as a backend, postgresql as a db and basic html/css/js and ejs for front end dynamic loading. The ``cheerio`` library is utilized to scrape job listings server side from a select number of popular sites (indeed, linkedin, glassdoor) and display the data client side in a nicely formatted table. Views are rendered with ejs templating. Data and form input is stored in browser cache to reduce future load times. </p> 

### Future Implementations
Might upgrade to React once I learn the libray. There will also be a page to store interesting jobs, add notes and an option to recieve a weekly/daily email with the contained results. These features are currently in development. As of October 25th, 2020, this project is not production ready. Only use for a portfolio piece. Will also create an endpoint that returns the data in json format for other developers to use potentially.

 
# Tests
In development
