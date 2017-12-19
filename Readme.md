<img src="http://static1.squarespace.com/static/57ecb47344024301f57bc8fa/t/598852628419c22ddf382d9d/1502513980501/?format=1500w" alt="Oopsie" style="width: 200px;"/>


JS SDK to use towards Sites created at Oopsie.
Visit http://oopsie.io for more information.

More documentation can be found at http://docs.techoopsie.com/

This SDK works both for node application and browsers applications.

# Installation

### npm

```npm install @techoopsie/oopsie```

### Script tag

To get latest:

```html
<script src="https://cdn.jsdelivr.net/npm/@techoopsie/oopsie/dist/oopsie.min.js"></script>
``` 

Or to get a specific version:

```html
<script src="https://cdn.jsdelivr.net/npm/@techoopsie/oopsie@<version>/dist/oopsie.min.js"></script>

<!-- For example -->
<script src="https://cdn.jsdelivr.net/npm/@techoopsie/oopsie@0.0.6/dist/oopsie.min.js"></script>
```


### Webpack

If you are using webpack you might need to add 

```
node: {
    fs: "empty"
}
```

to your webpack.config.js


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


// Get data from a View. 
var query = bookResource.get().byView('myView').withParams({example: 'test'}).limit(100).expandRelations().execute(callback);


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

# Api key

If you are using auth on your Site, you can create Api Keys to protect your data.
You can use it in the JS SDK as below, but be carefull, you shouldn't do this in the frontend.
If you do put it in the frontend, be sure it's not any secret data you want to protect.
For example, you may put a read only Api Key in the frontend because you want anyone to be able to read your data, 
but you create data in your backend where you use another Api key with read permissions.

```js
var oopsie = new OopsieSite(apiEndpoint, siteId, customerId);
oopsie.init((err) => {
    
    // We are done loading meta data...
    // Now we can use oopsie to create, get, save, delete entities.
    var apiKey = 'api-key-from-dashboard'; 
    oopsie.setApiKey(apiKey);
});
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

# Examples

Examples can be found in the *examples* folder. Each example will be in a subfolder and include everything needed to run the example. They need a working Oopsie site to run, and we will most likely provide them for you, but you can also create your own Site in the sandbox and try the examples against your own Site.

**NOTE: the examples are meant to give you a better understanding of how you can use Oopsie to store your data and handle your Users, they are not meant to be a beauty for the eye ;)**

**If you can't stand the awesome design of the examples, feel free to give us a pull request**

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
