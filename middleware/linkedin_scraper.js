const axios = require('axios');
const cheerio = require('cheerio');

const jobs = {};

//generate a url from a position and location
const templateURL = (position, location) => {
	let url = `https://www.linkedin.com/jobs/search?keywords=${position}&location=${location}`
	return url;
}

async function getJobListings(position, location, length, exclude=['Revature']) {
	const { data } = await axios.get(templateURL(position, location));
	const $ = cheerio.load(data);
	const listingTable =  $('.jobs-search__results-list'); // class name that holds the listings
	let count = 0;

	listingTable.find('.base-card').each((i, element) => {

		if (count>=length) {
			return jobs;
		};

		const company = $(element)
			.find('h4')
			.text()
			.trim()
			.replace(/(\r\n|\n|\r)/gm, "");

		const title = $(element)
			.find('h3')
			.text()
			.trim()
			.replace(/(\r\n|\n|\r)/gm, "");

		// const description = $(element)
		// 	.find('h3')
		//	.trim
		// 	.text();
		
		const link = $(element)
			.find('a')
			.attr('href');

		const location = $(element)
			.find('.job-search-card__location')
			.text()
			.trim()
			.replace(/(\r\n|\n|\r)/gm, "");

		const posted = $(element) //date posted
			.find('time')
			.text()
			.trim()
			.replace(/(\r\n|\n|\r)/gm, "");
		
		
		if (exclude.includes(company.toLowerCase())) {
			console.log('removed unwanted')
		} else {
			jobs[i] = {};
			jobs[i]['company'] = company;
			jobs[i]['title'] = title;
			jobs[i]['link'] = link;
			jobs[i]['location'] = location;
			jobs[i]['posted'] = posted; 
			// jobs[i]['description'] = description;
			count ++;
		}
	}
);

	return jobs;
};

// getJobListings('junior developer', 'daly city, CA', 5, ['REvature']);

module.exports = { getJobListings, templateURL, jobs };