# UI assignment 

**Table of Contents**

## task description
Write an automated test for an e-commerce site, feel free to pick any:
(e.g. http://automationpractice.com/index.php):
- You could implement some of the following tests:
    - Login, searching for products using 3 different criteria, adding products to the cart, removing products from the cart, checkout process, if possible, implement a login and sign-up test;
    - Report any bugs you find by writing a bug ticket
- Please prepare a document with the test flows and test cases. The documents have to be clear both to the developer and to someone who is not familiar with the technology;
- Run tests in a continuous integration tool and optionally in the cloud.
- Please provide us steps how to run the written test

## todo
- add allure steps.
- create "fast login", add products to cart and other operations using post requests.
- update local run preconditions section
- create Dockerfile for tests with proper node environment ?

## local run
### Preconditions and environment
* Test should work on any linux/unix (CentOS, RedHat, Fedora, etc.) and Windows 10 (start from GitBash)
* node.js version v12.20.0 (or higher)
```bash
node -v
v12.20.0
```
* npm version 6.14.8. (package lock will be ignored with npm v less than 5)
```bash
npm -v
6.14.8
```
* (optioal) webdriver-manager (installed with protractor), run `webdriver-manager update` to get the latest versions of drivers
```bash
npm ls -g webdriver-manager
/usr/local/lib
└─┬ protractor@7.0.0
  └── webdriver-manager@12.1.7

# status after update
webdriver-manager status
[12:02:16] I/status - selenium standalone version available: 3.141.59 [last]
[12:02:16] I/status - chromedriver version available: 84.0.4147.30 [last]
[12:02:16] I/status - geckodriver version available: v0.27.0 [last]
[12:02:16] I/status - IEDriverServer is not present
[12:02:16] I/status - android-sdk is not present
[12:02:16] I/status - appium is not present
```
* Start selenium server
```bash
webdriver-manager start
```

### How to run
* Unzip repo
* Install dependencies (`npm i`)
* Run test (`npm t`)
* Open html report (```npm run report```)
```bash
cd protractor-automationpractice/
npm i
# ...
npm t
# ...
npm run report
# ...
Report successfully generated to allure-report
Starting web server...
# ...
```

![console output](screenshots/ADD-IMAGE.png "console output")

## Run on CI
I will use the easiest setup: local jenkins + local selenoid. Jenkins can be installed locally or run as a [docker container](https://hub.docker.com/r/jenkins/jenkins).

### run selenoid
You can find details how to start selenoid locally here: [start selenoid](https://aerokube.com/selenoid/latest/)
Alternatevly there is an existing Digital Ocean droplet with selenoid: [selenoid droplet](https://marketplace.digitalocean.com/apps/selenoid)

## Run on github actions
Repository contains .github/workflows folder with 1 workflow for github actions.
![github actions run](screenshots/github-actions.png "github-actions")

## Alternatives
I used Jenkins and GitHub Actions only as an expample, but there are plenty of other good tools: Bamboo, TravisCI, GitLab, etc.

## Run tests in cloud
There are at least 2 popular platforms: saucelab and [browserstack](https://www.browserstack.com/), I ran my tests on browserstack
(Setup for protractor)[https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/protractor]
