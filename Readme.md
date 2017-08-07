# OWSJS

This is an repository with an JS SDK for use towards OWSAPI.

# Example

    var oopsie = new OopsieSite(apiEndpoint, siteId, customerId);
    oopsie.init((err) => {
    
        // We are done loading meta data...
        // Now we can use oopsie to create, get, save, delete entities.
    });

    var app = oopsie.getApp('PersonRepository');

    var personResource = app.getResource('Person');

    personResource.create().withParams({}).execute((err, resp) => {});
    personResource.save().withParams({}).execute((err, resp) => {});
    personResource.delete().withParams({}).execute((err) => {});

    personResource.get().withParams({}).limit(100).execute(callback);
    personResource.get().withParams({}).limit(100).expandRelations().execute(callback);
    var query = personResource.get({}).byView('myView').limit(100).expandRelations().execute(callback);
    query.nextPage(callback);
    query.prevPage(callback);
    query.hasNextPage();
    query.hasPrevPage();


# Development

Install NodeJs (Current node version: 2.14.7, but will probably work with later versions as well.) 

Install dependencies:

    npm install

## Build dev and watch

    npm run dev

## Build production

    npm run build

## Run tests once
  
    npm run test
    
## Run tests with watch

    npm run tdd
