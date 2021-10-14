const axios = require('axios');
const cheerio = require('cheerio');

const jobs = {};

// generate a url from a position and location
const templateURL = (position, location) => {
	let url = `https://www.indeed.com/jobs?q=${position}&l=${location}`
	return url;
}

// set job object

async function getJobListings(position, location, length, exclude) {
	const { data } = await axios.get(templateURL(position, location));
	const $ = cheerio.load(data);
	const listingTable =  $('.mosaic-provider-jobcards');
	let count = 0;

	// result is the name of the class that holds the listings 
	listingTable.find('.result').each((i, element) => {

		if (i>=length) {
			return jobs;
		};

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
		jobs[i]['posted'] = date;
	});
	console.log(jobs);
	return jobs;
}

getJobListings('junior developer', 'daly city, CA', 5, ['Revature']);

module.exports = { getJobListings, templateURL, jobs };