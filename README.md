
## Deployment

The repository contains 2 folders opencops-tm-bo (Backend) &  opencops-tm-fe (Frontend).

### opencops-tm-bo (Backend) Prerequisites

* Net 7 SDK
* MSSQL Server 2019 or above

**Run code locally by following steps**

* Find the file 'schema.sql' and execute the sql script in sql Server
* Click on opencops-tm-bo.sln file present in opencops-tm-bo folders
* Click Run button on visual studio


### opencops-tm-fe (Frontend) Prerequisites
* Angular
* Node

**Run code locally by following steps**

* Open the opencops-tm-fe in Visual code
* Edit environment.development and add apiUrl to the URL provided from running opencops-tm-bo
* Open terminal and execute below commands

```bash
  npm install
```
```bash
  ng serve
```

