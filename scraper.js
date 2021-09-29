const axios = require('axios');
const cheerio = require('cheerio');


const job_board = ["https://www.indeed.com/", "https://www.linkedin.com/jobs/", "https://www.builtinsf.com/jobs"];

const avoid = ['revature'];
const keywords = ['python', 'junior', 'flask'];
const count = 0;
const jobs = {};

// axios response element schema
// response = {data, status, statusText, headers, config} 
function indeedScraper() {
	axios.get(`https://www.indeed.com/jobs?q=${keywords[1]}%20developer%20${keywords[0]}&l=Daly%20City%2C%20CA&vjk`)
		.then((response) => {
			let $ = cheerio.load(response.data);

			const job_board = $('#mosaic-provider-jobcards');

			// can use .tex(), .html(), .find(), children(), parent() on job_board object
			const listings = job_board.children(); // want to get all listings in the job board

			// loop over elements to grab specific tags and attrs
			$('#mosaic-provider-jobcards a').each((i, el) => {
				const item = $(el).text();
				const link = $(el).attr('href');
				console.log(item, '\n');
			})
			
		})
		.catch((error) => console.log(error));
	};

indeedScraper();