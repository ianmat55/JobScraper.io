const axios = require('axios');
const cheerio = require('cheerio');

const jobs = {};

//generate a url from a position and location
const templateURL = (position, location) => {
	let url = `https://www.linkedin.com/jobs/search?keywords=${position}&location=${location}`
	return url;
}

async function getJobListings(position, location, length, remove) {
	const { data } = await axios.get(templateURL(position, location));
	const $ = cheerio.load(data);
	const listingTable =  $('.jobs-search__results-list');

	// can use .text(), .html(), .find(), children(), parent() on object
	// scraping id, title, company, location, description, link, date
	listingTable.find('.base-card').each((i, element) => {

		jobs[i] = {};

		const title = $(element)
			.find('h3')
			.text()
			.trim()
			.replace(/(\r\n|\n|\r)/gm, "");
		jobs[i]['title'] = title;

		const company = $(element)
			.find('h4')
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
	return jobs;
}

// getJobListings('junior developer', 'daly city, CA');

module.exports = { getJobListings, templateURL, jobs };