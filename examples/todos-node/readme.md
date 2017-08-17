# Simple Todo app.

It might be possible to run this app straight away if we still have the Site running in Oopsie.

## Prerequisits

Install dependencies ( as @techoopsie/oopsie etc ).

```npm install```

## Run

```node server.js```

or

```nodemon server.js```

the application will be served at http://localhost:3000


# Run toward your own Site.

You can create a Site containing an Application that is called "TodoApp" with a Resource by name "Todo".

The Todo Resource should have the Attributes

```
name: String
description: String
done: boolean
```

Then you can change the first lines in public/app.js

```js
// These should be your customerId and the siteId of the Site you created.
var siteId = "6a4a3a28-23af-4693-a5fb-ab93bca9c803";
var customerId = "fefa1dbf-5f6d-4d38-aac1-1298fa80d4cf";
```

If you named your Application, Resource and Attributes the same way as expected you should now be able to start the app and test it out.