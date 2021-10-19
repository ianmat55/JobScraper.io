const { describe } = require('jest-circus');
const supertest = require('supertest');
const app = require('../../app')

describe('Index status codes', () => {
	test('GET returns status code 200', (done) => {
		supertest(app)
			.get('/')
			.expect(200, done);
	});
	test('POST returns status code 200', (done) => {
		supertest(app)
			.post('/')
			.type('form')
			.send('position=junior developer&location=honolulu&company=')
			.expect(200, done);
	});
	test('POST invalid form request', (done) => {
		supertest(app)
			.post('/')
			.expect(400, done);
	}) 

})