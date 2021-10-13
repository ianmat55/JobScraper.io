const indeed = require('../../middleware/indeed_scraper');
const linkedin = require('../../middleware/linkedin_scraper');

const dummy_title = 'junior developer';
const dummy_location = 'daly city, CA';

// Indeed
test('returns correct url format', () => {
	expect(indeed.templateURL(dummy_title, dummy_location)).toBe(`https://www.indeed.com/jobs?q=${dummy_title}&l=${dummy_location}`);
});

test('returns object', async () => {
	await indeed.getJobListings('junior developer', 'daly city');
	
	let object = indeed.jobs[1];
	let keys = Object.keys(object);
	let titles = ['title', 'companyName', 'link', 'location', 'description', 'posted', 'date'];
	keys.forEach((key) => {
		expect(titles.includes(key));
	});
	
});

// Linkedin
test('returns correct url format', () => {
	expect(linkedin.templateURL(dummy_title, dummy_location)).toBe(`https://www.linkedin.com/jobs/search?keywords=${dummy_title}&location=${dummy_location}`);
});

test('returns object', async () => {
	await linkedin.getJobListings('junior developer', 'daly city');
	
	let object = linkedin.jobs[1];
	let keys = Object.keys(object);
	let titles = ['title', 'companyName', 'link', 'location', 'description', 'posted', 'date'];
	keys.forEach((key) => {
		expect(titles.includes(key));
	});
	
});