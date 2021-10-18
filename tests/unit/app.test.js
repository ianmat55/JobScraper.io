const { describe } = require('jest-circus');
const request = require('supertest');
const app = require('../../app');

describe("GET /", () => {
	test("status code 200", (done) => {
		request(app)
			.get('/')
			.expect(200, done);
	});
})

describe("POST /", () => {
	test("status code 200", (done) => {
		request(app)
			.get('/')
			.expect(200, done);
	});
})

describe("GET /users/register", () => {
	test("status code 200", (done) => {
		request(app)
			.get('/')
			.expect(200, done);
	});
})

describe("GET /users/login", () => {
	test("status code 200", (done) => {
		request(app)
			.get('/')
			.expect(200, done);
	});
})

describe("GET /results/app", () => {
	test("status code 200", (done) => {
		request(app)
			.get('/')
			.expect(200, done);
	});
})

describe("GET /notreal", () => {
	test("status code 404", (done) => {
		request(app)
			.get('/notreal')
			.expect(404, done);
	});
})