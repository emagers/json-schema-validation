const Ajv = require("ajv");

const validate = function (logger, schema, tests) {
	const ajv = new Ajv();
	let valid = true;

	for (let i = 0; i < tests.length; i++) {
		valid = valid && validate_object(logger, ajv, schema, tests[i]);
	}

	return valid;
};

const validate_object = function(logger, ajv, schema, obj) {
	const validator = ajv.compile(schema);
	const valid = validator(obj.data);

	if (!valid) {
		logger.error(`\u001b[38;2;255;0;0mX \u001b[38;2;255;255;255m${obj.description} failed with the following errors:`);
		logger.error(`${validator.errors}\n`);
	}
	else {
		logger.info(`\u001b[38;2;0;255;0m✓ \u001b[38;2;255;255;255m${obj.description} is valid\n`);
	}

	return valid;
}

module.exports = validate;
