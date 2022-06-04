const Ajv = require("ajv");

const validate = function (logger, schema, tests) {
	const ajv = new Ajv();
	let results = [];

	for (let i = 0; i < tests.length; i++) {
		results.push(validate_object(logger, ajv, schema, tests[i]));
	}

	return results;
};

const validate_object = function(logger, ajv, schema, obj) {
	const validator = ajv.compile(schema);
	const valid = validator(obj.data);

	if (!valid) {
		logger.error(`X ${obj.description} failed with the following errors:`);
		logger.error(validator.errors);
		return { status: false, name: obj.description };
	}
	else {
		logger.info(`✓ ${obj.description} is valid`);
		return { status: true, name: obj.description };
	}
}

module.exports = validate;
