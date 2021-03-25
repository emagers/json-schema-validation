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
		logger.error(`X ${obj.description} failed with the following errors:`);
		logger.error(validator.errors);
	}
	else {
		logger.info(`✓ ${obj.description} is valid`);
	}

	return valid;
}

module.exports = validate;
