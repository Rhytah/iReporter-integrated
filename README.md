[![Build Status](https://travis-ci.org/Rhytah/iReporter-integrated.svg?branch=develop)](https://travis-ci.org/Rhytah/iReporter-integrated)  [![Coverage Status](https://coveralls.io/repos/github/Rhytah/iReporter-integrated/badge.svg?branch=develop)](https://coveralls.io/github/Rhytah/iReporter-integrated?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/9c17afd46ba149329df3/maintainability)](https://codeclimate.com/github/Rhytah/iReporter-integrated/maintainability)

# iReporter

**Corruption is a huge bane to Africa’s development. African countries must develop novel and localised solutions that will curb this menace, hence the birth of iReporter.
iReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that needs government intervention**

## Features(UI).
* user signup.
* user login.
* users can create red-flag record.
* Users can create an intervention record.
* Users can view all red-flag and intervention records.
* Users can delete a red-flag or intervention record.
* Admin has the privilege of changing status of a record.
* Admin can view all records from different users.
 

## Getting Started
clone the github repo to your computer:
* $git clone https://github.com/Rhytah/iReporter-integrated.git
* Extract the zip file to another file
* Open using text editor
* Run it using web browser 

### Prerequisites

* Text editor where we write our project files. (VScode)
* Web browser (Mozilla, Chrome) to preview project files

## Technologies Used
* HTML.
* CSS.
* JAVASCRIPT.

### Usage
* launch <a href="https://rhytah.github.io/iReporter-integrated/UI/index.htm">Index</a>  to access Sign Up/ Sign In options
* On successful login, you will be redirected to webpage that contains information relevant to your logged in account(either user or Admin).
* <a href="https://rhytah.github.io/iReporter-integrated/UI/forum.htm">User interface</a> 
  - click `create red-flag` tab to display input fields.
  - click `create intervention record` tab to display input fields.
  - click `My records` tab to display past records.
  - click `Logout` tab to leave page.
  - top right corner contains brief user profile information.
* <a href="https://rhytah.github.io/iReporter-integrated/UI/admin.htm">Admin interface</a> 
  - click on status to display options to change status of a record

## GH-Pages.
my site is published at https://rhytah.github.io/iReporter-integrated/UI/index.htm


# API-VERSION2 


## Tools

* Text editor where we write our project files. (VScode)
* Flask Python Framework -Server-side framework
* Pytest - a Python Testing Framework
* Pylint - a Python linting library
* Postman -Application to test and consume endpoints
* PEP8 - Style guide



# Create virtual environment and activate it

```
$pip install virtualenv
$ virtualenv venv
$ venv\Scripts\activate

```
 **Install all the necessary tools by**
 ```
 $pip insatll -r requirements.txt
 ```
## Start app server in console/terminal/commandprompt

```
$python app.py
```
## Test app in terminal

```
$pytest
```
## Versioning
```
This is version two "v2" of the API
```
## End Points(Required Features)
|           End Point                                           |            Functionality                       |
|   --------------------------------------------------------    | ---------------------------------------------  |
|     POST   api/v2/auth/login/                                 |             Login to application               |
|     POST   api/v2/auth/signup/                                |             Register an account                |
|     POST   api/v2/red-flags/                                  |             Create a red-flag                  |
|     GET    api/v2/red-flags/                                  |             Fetch all red-flags                |
|     GET    api/v2/red-flags/<int:redflag_Id>                  |             Fetch a red-flag                   |
|     PATCH  api/v2/red-flags/<int:redflag_Id>/location         |             Edit red-flag location             |
|     PATCH  api/v2/red-flags/<int:redflag_Id>/comment          |             Edit red-flag comment              |
|     PATCH  api/v2/red-flags/<int:redflag_Id>/status           |             Edit red-flag status               |
|     POST   api/v2/interventions/                              |             Create a intervention              |
|     GET    api/v2/interventions/                              |             Fetch all interventions            |
|     GET    api/v2/interventions/<int:intervention_Id>         |             Fetch a intervention               |
|     DELETE api/v2/interventions/<int:intervention_Id>         |             Fetch a intervention               |
|     PATCH  api/v2/interventions/<int:intervention_Id>/location|             Edit intervention location         |
|     PATCH  api/v2/interventions/<int:intervention_Id>/comment |             Edit intervention comment          |



## Run app in postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/e3f48c296918745740fd)

## Hosted application link

[Heroku hosted link](https://rhytah-ireporterv2.herokuapp.com/)
https://rhytah-ireporterv2.herokuapp.com/

## API Documentation link

[Documentation](https://documenter.getpostman.com/view/4755480/RztprTuB)
https://documenter.getpostman.com/view/4755480/RztprTuB
