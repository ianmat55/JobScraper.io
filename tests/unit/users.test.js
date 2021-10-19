const { describe } = require('jest-circus');
const supertest = require('supertest');
const app = require('../../app')

describe('Status codes', () => {
	describe('Register status codes', () => {
		test('GET returns status code 200', (done) => {
			supertest(app)
				.get('/users/register')
				.expect(200, done);
			});
		test('POST returns status code 200', (done) => {
			supertest(app)
				.post('/users/register')
				.type('form')
				.send('name=Ian&email=ianmat55@gmail.com&password=G10grAfy&password2=G10grAfy')
				.expect(200, done);
			});
	});
	describe('Login status codes', () => {
		test('GET login status code 200', (done) => {
			supertest(app)
				.get('/users/login')
				.expect(200, done);
			});
	});
})