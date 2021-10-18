const { describe } = require('jest-circus');
const request = require('supertest');
const app = require('../../app');

describe("GET /", () => {
	test("status code 200", (done) => {
		request(app)
			.get('/')
			.expect(200, done);
	})
});

describe("POST /", () => {
	test("status code 200", (done) => {
		request(app)
			.post('/')
			.send('position=web developer')
			.send('location=Honolulu')
			.send('company=revature')
			.expect(200, done);
	})
});

describe("GET /notreal", () => {
	test("status code 404", (done) => {
		request(app)
			.get('/notreal')
			.expect(404, done);
	})
});