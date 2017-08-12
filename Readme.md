<img src="http://static1.squarespace.com/static/57ecb47344024301f57bc8fa/t/598852628419c22ddf382d9d/1502513980501/?format=1500w" alt="Oopsie" style="width: 200px;"/>


JS SDK to use towards Sites created at Oopsie.
Visit http://oopsie.io for more information.

More documentation can be found at http://docs.techoopsie.com/

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

# Handle Users

If you have auth enabled on your site you can manage Users via the SDK.

### Register user

To let Users register via the SDK you need to set this up in the Dashboard for your site. By default no Roles are allowed to register via the API and only the Admin for the Site can add Users in the Dashboard.

```js
var user = {
    email: 'my@email.com',
    password: 'my-super-secret',
    firstname: 'Anja',
    lastname: 'Hrabun'
};
oopsie.register(user, (err) => {
    if (err) {
        // We failed to register user.
        alert(err.message);
        return;
    }
    // User registered.
})
```

### Login user
```js
var user = {
    email: 'my@email.com',
    password: 'my-super-secret'
};
oopsie.login(user, (err) => {
    if (err) {
        // We failed to login.
        alert(err.message);
        return;
    }
    // User logged in.
})
```

### Logout
```js
oopsie.logout((err) => {
    if (err) {
        // We failed to logout.
        alert(err.message);
        return;
    }
    // User logged out.
})
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
