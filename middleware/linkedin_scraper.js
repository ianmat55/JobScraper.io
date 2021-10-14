const axios = require('axios');
const cheerio = require('cheerio');

const jobs = {};

//generate a url from a position and location
const templateURL = (position, location) => {
	let url = `https://www.linkedin.com/jobs/search?keywords=${position}&location=${location}`
	return url;
}

async function getJobListings(position, location, length) {
	const { data } = await axios.get(templateURL(position, location));
	const $ = cheerio.load(data);
	const listingTable =  $('.jobs-search__results-list');

	// base-card is the element class that holds the listings
	listingTable.find('.base-card').each((i, element) => {

		if (i>=length) {
			return jobs;
		};

		jobs[i] = {};

		const company = $(element)
			.find('h4')
			.text()
			.trim()
			.replace(/(\r\n|\n|\r)/gm, "");
		jobs[i]['company'] = company;

		const title = $(element)
			.find('h3')
			.text()
			.trim()
			.replace(/(\r\n|\n|\r)/gm, "");
		jobs[i]['title'] = title;

		// const description = $(element)
		// 	.find('h3')
		//	.trim
		// 	.text();
		// jobs[i]['description'] = description;
		
		const link = $(element)
			.find('a')
			.attr('href');
		jobs[i]['link'] = link;

		const location = $(element)
			.find('.job-search-card__location')
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
			.find('time')
			.text()
			.trim()
			.replace(/(\r\n|\n|\r)/gm, "");
		jobs[i]['posted'] = posted; 

		
	});
};

// getJobListings('junior developer', 'daly city, CA', 5);

module.exports = { getJobListings, templateURL, jobs };