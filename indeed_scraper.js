const axios = require('axios');
const cheerio = require('cheerio');

const keywords = ['python', 'junior', 'flask'];
const jobs = {};
const avoid = ['revature'];

// axios response element schema
// response = {data, status, statusText, headers, config} 
async function getJobListings() {
	const { data } = await axios.get(`https://www.indeed.com/jobs?q=${keywords[1]}%20developer%20${keywords[0]}&l=Daly%20City%2C%20CA&vjk`);
	const labels = ['id', 'title', 'company', 'location', 'description', 'link', 'date'];
	const identifiers = ['.jobTitle', '.companyName', 'companyLocation', '.job-snippet', 'href', 'date'];
	const $ = cheerio.load(data);
	const listingTable =  $('.mosaic-provider-jobcards');

	// can use .text(), .html(), .find(), children(), parent() on object
	listingTable.find('.result').each((i, element) => {
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
				
			jobs['id' + i] = i;
			jobs['title' + i] = title;
			jobs['company' + i] = companyName;
			jobs['location' + i] = location;
			jobs['description' + i] = description;
			jobs['link' + i] = link;
			jobs['date' + i] = date;
	});

	console.log(jobs)
}

getJobListings();