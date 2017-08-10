# Oopsie SDK

JS SDK to use towards Sites created at Oopsie.
Visit http://oopsie.io for more information.

# Example

### Initialization

```js
var oopsie = new OopsieSite(apiEndpoint, siteId, customerId);
oopsie.init((err) => {
    
    // We are done loading meta data...
    // Now we can use oopsie to create, get, save, delete entities.
});
```

### Chooce Application and Resource

```js
var app = oopsie.getApp('BookApp');
var bookResource = app.getResource('Book');
```

### Get entities 

```js
bookResource.get().withParams({}).limit(100).execute(callback);
bookResource.get().withParams({}).limit(100).expandRelations().execute(callback);

// You 
var query = bookResource.get({}).byView('myView').limit(100).expandRelations().execute(callback);
query.nextPage(callback);
query.prevPage(callback);
query.hasNextPage();
query.hasPrevPage();
```

### Create entity
```js
bookResource.create().withParams({}).execute((err, resp) => {});
```

### Update entity
```js
bookResource.save().withParams({}).execute((err, resp) => {});
```

### Delete entity
```js
bookResource.delete().withParams({}).execute((err) => {});
```

# Promises

Oopsie SDK follows nodejs callback pattern so you can use bluebird to promisefy the functions if you rather use promises then callbacks.

# Development

## Prerequisite

Node and npm

```sh
npm install
```

## Build dev and watch

    npm run dev

## Build production

    npm run build

## Run tests once
  
    npm run test
    
## Run tests with watch

    npm run tdd
