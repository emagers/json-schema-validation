const fs = require('fs').promises;
const core = require('@actions/core');
const validate = require('./json-validate');

async function run() {
  try {
		const schemaFile = core.getInput('schema');
		const testFile = core.getInput('testFile');

		const schema = await fs.readFile(schemaFile, 'utf8');
		const tests = await fs.readFile(testFile, 'utf8');

		const testResults = validate(core, JSON.parse(schema), JSON.parse(tests));
		const success = !testResults.some(x => !x.status);

		await core.summary
			.addHeading(`Test Results ${success ? '✅' : '❌'}`)
			.addTable([
				[{data: "Test", header: true}, {data: "Result", header: true}],
				testResults.map(x => [x.name, x.status ? '✅' : '❌'])
			])
			.write();

		if (!success) {
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
