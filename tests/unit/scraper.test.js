const { describe } = require('jest-circus');
const indeed = require('../../middleware/indeed_scraper');
const linkedin = require('../../middleware/linkedin_scraper');

const dummy_title = 'junior developer';
const dummy_location = 'daly city, CA';
const length = 5;
const remove = ['revature'];

describe('Indeed scraper functionality', () => {
	test('returns correct url format', () => {
		expect(indeed.templateURL(dummy_title, dummy_location)).toBe(`https://www.indeed.com/jobs?q=${dummy_title}&l=${dummy_location}`);
	});
	
	test('returns object', async () => {
		await indeed.getJobListings(dummy_title, dummy_location, length, remove);
		
		let object = indeed.jobs;
		let keys = Object.keys(object);
		let titles = ['title', 'companyName', 'link', 'location', 'description', 'posted', 'date'];
		keys.forEach((key) => {
			expect(titles.includes(key));
		});
		
	});
	
	test('number of jobs matches length param', async () => {
		await indeed.getJobListings(dummy_title, dummy_location, length, remove);
	
		let listingLength = Object.keys(indeed.jobs).length;
		expect(listingLength).toBe(length);
	});
	
	test('job listings excludes specified companies', async () => {
		await indeed.getJobListings(dummy_title, dummy_location, length, remove);
	
		// inject mock object to test removes. Need to properly mock json which scraper pulls from
	});

});

describe('Linked in scraper functionality', () => {
	test('returns correct url format', () => {
		expect(linkedin.templateURL(dummy_title, dummy_location, length, remove)).toBe(`https://www.linkedin.com/jobs/search?keywords=${dummy_title}&location=${dummy_location}`);
	});
	
	test('returns object', async () => {
		await linkedin.getJobListings(dummy_title, dummy_location, length, remove);
		
		let object = linkedin.jobs;
		let keys = Object.keys(object);
		let titles = ['title', 'companyName', 'link', 'location', 'description', 'posted', 'date'];
		keys.forEach((key) => {
			expect(titles.includes(key));
		});
		
	});
	
	test('number of jobs matches length param', async () => {
		await linkedin.getJobListings(dummy_title, dummy_location, length, remove);
	
		let listingLength = Object.keys(linkedin.jobs).length;
		expect(listingLength).toBe(length);
	});
});
