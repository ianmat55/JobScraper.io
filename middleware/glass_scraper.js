// https://www.glassdoor.com/Job/daly-city-ca-us-junior-developer-jobs-SRCH_IL.0,15_IC1147343_KO16,32.htm?clickSource=searchBox

const axios = require('axios');
const cheerio = require('cheerio');

const jobs = {};

//generate a url from a position and location
const templateURL = (position, location) => {
	new_position = postion.split("");
	new_location = location.split("");

	let url = ` https://www.glassdoor.com/Job/${new_location}-${new_position}-jobs-SRCH`;
	https://www.glassdoor.com/Job/daly city junior developer-job-SRCH
	return url;
}

async function getJobListings(position, location) {
	const { data } = await axios.get(templateURL(position, location));
	const $ = cheerio.load(data);
	const listingTable =  $('.job-search-key-kgm6qi');

	// can use .text(), .html(), .find(), children(), parent() on object
	// scraping id, title, company, location, description, link, date
	listingTable.find('li').each((i, element) => {

		jobs[i] = {};

		const title = $(element)
			.find('')
			.text()
			.trim()
			.replace(/(\r\n|\n|\r)/gm, "");
		jobs[i]['title'] = title;

		const company = $(element)
			.find('')
			.text()
			.trim()
			.replace(/(\r\n|\n|\r)/gm, "");
		jobs[i]['company'] = company;

		// const description = $(element)
		// 	.find('h3')
		//	.trim
		// 	.text();
		// jobs[i]['description'] = description;
		
		const link = $(element)
			.find('jobLink')
			.attr('href');
		jobs[i]['link'] = link;

		const location = $(element)
			.find('')
			.text()
			.trim()
			.replace(/(\r\n|\n|\r)/gm, "");
		jobs[i]['location'] = location;

		// const icon = $(element)
		// 	.find('img')
		//	.trim()
		// 	.attr('href');
		// jobs[i]['icon'] = icon;

		const posted = $(element) //date posted
			.find('')
			.text()
			.trim()
			.replace(/(\r\n|\n|\r)/gm, "");
		jobs[i]['posted'] = posted; 

		
	});
	return jobs;
}

module.exports = { getJobListings, templateURL, jobs };