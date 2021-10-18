const { describe } = require('jest-circus');
const request = require('supertest');
const app = require('../../app');

describe("GET /users/register", () => {
	test("status code 200", (done) => {
		request(app)
			.get('/')
			.expect(200, done);
	});
});

describe("POST /users/register", () => {
	test("successful registration form input", (done) => {
		request(app)
			.post('/users/register')
			.send('username=ianmats')
			.send('email=ianmat55@gmail.com')
			.send('password=Password')
			.send('password2=Password')
			.expect(200, done);
	})
	test("successful registration form input", (done) => {
		request(app)
			.post('/users/register')
			.send('username=ianmats')
			.send('email=ianmat55@gmail.com')
			.send('password=p')
			.send('password2=Password')
			.expect(400, done);
	})
});

describe("GET /users/login", () => {
	test("status code 200", (done) => {
		request(app)
			.get('/')
			.expect(200, done);
	});
})