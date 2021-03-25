const fs = require('fs').promises;
const core = require('@actions/core');
const validate = require('./json-validate');

async function run() {
  try {
		const schemaFile = core.getInput('schema');
		const testFile = core.getInput('testFile');

		const schema = await fs.readFile(schemaFile, 'utf8');
		const tests = await fs.readFile(testFile, 'utf8');

		const valid = validate(core, JSON.parse(schema), JSON.parse(tests));

		if (!valid) {
			core.setFailed("Some tests failed validation");
		}
		else {
			core.setOutput("Successfully validated all tests");
		}
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
