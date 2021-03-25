# JSON Schema Validation

A GitHub action which validates that a set of JSON objects conforms to the defined schema. This came out of a need to track how changes to a developing JSON schema will impact the required use cases of the schema. This also helps to ensure that the examples of how to properly form a conforming JSON object is up-to-date.

This Action was created by using the [javascript-action template](https://github.com/actions/javascript-action).

# Defining tests

Tests are defined in the following format:

``` json
[{
	"description": "A brief description of what is trying to be expressed by the test",
	"data": { }
}]
```
> the root array can contain any number of test objects

> data can be any JSON object. This is the object that will be validated against the schema.

# Inputs

There are two required inputs:

`schema`:
  * The file name which contains the JSON schema under test

`testFile`:
  * The file name which contains the JSON tests



