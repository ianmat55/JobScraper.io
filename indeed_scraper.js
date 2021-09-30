const axios = require('axios');
const cheerio = require('cheerio');

const job_board = ["https://www.indeed.com/", "https://www.linkedin.com/jobs/", "https://www.builtinsf.com/jobs"];
const keywords = ['python', 'junior', 'flask'];
const jobs = {};
const avoid = ['revature'];

// axios response element schema
// response = {data, status, statusText, headers, config} 

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
				.text()
				.replace(/(\r\n|\n|\r)/gm, "");

			const link = $(element)
				.attr('href');

			const date = $(element)
				.find('.date')
				.text();
				
			jobs['id' + index] = index;
			jobs['title' + index] = title;
			jobs['company' + index] = companyName;
			jobs['location' + index] = location;
			jobs['description' + index] = description;
			jobs['link' + index] = link;
			jobs['date' + index] = date;
		});
	})

	.catch((error) => console.log(error))
	.then(() => console.log(jobs));


