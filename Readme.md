# OWSJS

This is an repository with an JS SDK for use towards OWSAPI.

# Example

    var oopsie = new Oopsie(webServiceId, function(err, oopsie) {
    
        // We are done loading meta data...
    
    });
    
    var oopsieResource = oopsie.createResource(resourceName);
    
    oopsie.save(oopsieResource, callback);
    oopsie.delete(resourceName, id, callback);
    oopsie.getAll(resourceName, callback);
    oopsie.get(resourceName, id, callback);


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
