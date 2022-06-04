const validate = require("../json-validate");

const schema = {
	"$schema": "http://json-schema.org/draft-07/schema#",
	"type": "object",
	"required": [
		"inner"
	],
	"properties": {
		"inner": {
			"type": "object"
		}
	},
	"additionalProperties": false
};

const validTest = {
	description: "Inner object defined with no additional properties",
	data: {
		inner: {

		}
	}
};

const invalidTest = {
	description: "Inner object defined with additional properties",
	data: {
		inner: {

		},
		additional: {
			test: "this object should cause an error"
		}
	}
}

const logger = {};
logger.info = jest.fn();
logger.error = jest.fn();

test("validates single test against schema", function() {
	const tests = [ validTest ];

	expect(validate(logger, schema, tests)[0].status).toBe(true);
});

test("validates multiple tests against schema", function() {
	const tests = [ validTest, validTest ];

	const results = validate(logger, schema, tests).map(x => x.status);

	expect(results).toMatchObject([true, true]);
});

test("validates single invalid test against schema", function() {
	const tests = [ invalidTest ];

	expect(validate(logger, schema, tests)[0].status).toBe(false);
});

test("validates mix of valid and invalid tests against schema", function() {
	const tests = [ invalidTest, validTest ];

	const results = validate(logger, schema, tests).map(x => x.status);

	expect(results).toMatchObject([false, true]);
});