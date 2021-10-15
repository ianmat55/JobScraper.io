const axios = require('axios');
const cheerio = require('cheerio');

const jobs = {};

// generate a url from a position and location
const templateURL = (position, location) => {
	let url = `https://www.indeed.com/jobs?q=${position}&l=${location}`
	return url;
}

async function getJobListings(position, location, length, exclude) {
	const { data } = await axios.get(templateURL(position, location));
	const $ = cheerio.load(data);
	const listingTable =  $('.mosaic-provider-jobcards'); 	// name of the class that holds the listings 
	let count = 0;

	listingTable.find('.result').each((i, element) => {

		if (count>=length) {
			return jobs;
		};

		const company = $(element)
			.find('.companyName')
			.text();

		const title = $(element)
			.find('.jobTitle')
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

		
		if (!exclude.includes(company.toLowerCase())) {
			jobs[i] = {};
			jobs[i]["title"] = title;
			jobs[i]['company'] = company;
			jobs[i]['location'] = location;
			jobs[i]['description'] = description;
			jobs[i]['link'] = 'https://www.indeed.com' + link;
			jobs[i]['posted'] = date;
			count ++;
		}
	}
);
	return jobs;
}

// getJobListings('junior developer', 'daly city, CA', 5, ['dummyValue', 'revature']);

module.exports = { getJobListings, templateURL, jobs };