# Install the package in a project using GH tag (Change the tag# to the version)
`npm install sails-hook-jwtvalidation https://github.com/electrily/sails-hook-jwtvalidation.git#v1.1.0 --save`
# Install the package in a project using GH project (Change the tag# to the version)
`npm install sails-hook-jwtvalidation https://github.com/electrily/sails-hook-jwtvalidation.git --save`

`is-logged-in` policy used. also add `authUrl: `http://localhost:1337` to `custom.js` and `authUrl: `https://auth-api-dot-greencityfund.uc.r.appspot.com` to `production.js` `custom` section.

# Testing the package localy checked out with a project
`git clone https://github.com/electrily/sails-hook-jwtvalidation.git`

`cd <project_dir>
npm install sails-hook-jwtvalidation file:../sails-hook-jwtvalidation --save`