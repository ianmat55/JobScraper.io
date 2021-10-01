const axios = require('axios');
const cheerio = require('cheerio');

const keywords = ['python', 'junior', 'flask'];
const jobs = {};
const avoid = ['revature'];

//generate a url from a position and location
const templateURL = (position, location) => {
	let url = `https://www.indeed.com/jobs?q=${position}&l=${location}`
	return url;
}

// axios response element schema
// response = {data, status, statusText, headers, config} 
async function getJobListings() {
	const { data } = await axios.get(templateURL('junior developer', 'Daly City'));
	const $ = cheerio.load(data);
	const listingTable =  $('.mosaic-provider-jobcards');

	// can use .text(), .html(), .find(), children(), parent() on object
	// scraping id, title, company, location, description, link, date
	listingTable.find('.result').each((i, element) => {
		jobs[i] = {};

		const title = $(element)
			.find('.jobTitle')
			.text();
		jobs[i]["title"] = title;

		const companyName = $(element)
			.find('.companyName')
			.text();
		jobs[i]['company'] = companyName;
				
		const location = $(element)
			.find('.companyLocation')
			.text();
		jobs[i]['location'] = location;

		const description = $(element)
			.find('.job-snippet')
			.text()
			.replace(/(\r\n|\n|\r)/gm, "");
		jobs[i]['description'] = description;

		const link = $(element)
			.attr('href');
		jobs[i]['link'] = 'https://www.indeed.com' + link;

		const date = $(element)
			.find('.date')
			.text();
		jobs[i]['date'] = date;
	});

	console.log(jobs)
}

getJobListings();