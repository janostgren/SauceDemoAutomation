# Sauce-Demo
 
This is a portfolio demo Automation project.

Libraries: Playwright, Node.js

Tools: TypeScript

Implemented Design Patterns: POM & Playwright Fixtures. 

API Testing: High-level API requests methods are defined in the "api-methods" file. They should be used in scope of integration testing, api testing or for generating a user to a particular step in a flow.
(Currently, "SauceDemo" doesn't have an API, so I created only high-level API methods. )

Config: Supports multiple environments: local, adhoc $ staging. 
(Currently, since only one environment exists- only "staging").

Global Parameterization : The home/main page is defined as Global Parameter and can be accessed from any file in the project. Currently, is being accessed only by page objects. 

Test Data:
Test Data is stored in dedicated json files here: src/tests/test-data/
We can choose which test data file to use in our executions by using the following command:
" export TEST_DATA_PATH=src/tests/test-data/[file-name] "
For example : export TEST_DATA_PATH=src/tests/test-data/standard-user-data.json

How to execute test suites?
npm run "Sanity Tests"
npm run "E2E Tests"

If you want to execute on a specific environment: please add first "ENV=[env-name]"
ENV=staging npm run "Sanity Tests" 

GitHub configuration: On every pushed PR, "Sanity Tests" will run on GitHub VM and will block the PR in case of a failure.

