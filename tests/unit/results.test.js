const { describe } = require('jest-circus');
const request = require('supertest');
const app = require('../../app');

describe("GET /results/app", () => {
	test("status code 200", (done) => {
		request(app)
			.get('/')
			.expect(200, done);
	});
})