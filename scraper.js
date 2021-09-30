const axios = require('axios');
const cheerio = require('cheerio');


const job_board = ["https://www.indeed.com/", "https://www.linkedin.com/jobs/", "https://www.builtinsf.com/jobs"];

const avoid = ['revature'];
const keywords = ['python', 'junior', 'flask'];
const jobs = {};

// axios response element schema
// response = {data, status, statusText, headers, config} 
function indeedScraper() {
	axios.get(`https://www.indeed.com/jobs?q=${keywords[1]}%20developer%20${keywords[0]}&l=Daly%20City%2C%20CA&vjk`)
		.then((response) => {
			let $ = cheerio.load(response.data);

			// can use .tex(), .html(), .find(), children(), parent() on object
			$('.result').each((index, element) => {
				// job title = <h2 class="jobTitle">
				// company name = <span class="companyName">
				// location = <div class=companyLocation>
				// description = <div class="job-snippet"> --> ul --> li
				// job link = <a class="tapItem fs-unmast result">
				// date = <span class="date">

				const title = $(element)
					.find('.jobTitle')
					.text();
				
				const companyName = $(element)
					.find('.companyName')
					.text();
				
				const location = $(element)
					.find('.companyLocation')
					.text();
					
				const description = $(element)
					.find('.job-snippet')
					.text();

				const link = $(element)
					.attr('href');

				const date = $(element)
					.find('.date')
					.text();

				jobs[index] = [title, companyName, location, description, link, date];
			})
			
		})
		.catch((error) => console.log(error));
	};

indeedScraper();
console.log(jobs);
