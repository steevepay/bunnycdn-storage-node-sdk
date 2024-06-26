# Node SDK for the BunnyCDN Edge Storage API 

Small and simple node SDK to use the BunnyCDN [Edge Storage API](https://docs.bunny.net/reference/storage-api) 🐰

## Setup

```
npm install --save bunnycdn-storage-api-node-sdk
```

## Examples

All function can be used with a promise or a callback as a response.

### Upload a file


```javascript
const fs = require('fs');
const storage = require('bunnycdn-storage-api-node-sdk')(API_STORAGE_KEY, API_STORAGE_ZONE);

const PATH = '/path/';
const FILE_NAME = 'superPicture.jpeg';
const FILE_BUFFER = fs.readFileSync('./' + FILE_NAME);

// Promise version
storage.putFile(PATH, FILE_NAME, FILE_BUFFER).then(data => {
  console.log(data.toString()); // { "HttpCode" : 201, "Message" : "File uploaded." }
}).catch(err => {
  console.log(err);
});

// callback version
storage.putFile(PATH, FILE_NAME, FILE_BUFFER, (err, resp, data) => {
  console.log(data.toString()); // { "HttpCode" : 201, "Message" : "File uploaded." }
});
```

### Get a file

```javascript
const storage = require('bunnycdn-storage-api-node-sdk')(API_STORAGE_KEY, API_STORAGE_ZONE);
const FILE_NAME = 'superPicture.jpeg'

// promise version
storage.getFile(PATH, FILE_NAME).then(data => {
  // data is a buffer
}).catch(err => {
  console.log(err);
});

// callback version
storage.getFile(PATH, FILE_NAME, (err, resp, data) => {
  // data is a buffer
});
```

### Delete a file

```javascript
const storage = require('bunnycdn-storage-api-node-sdk')(API_STORAGE_KEY, API_STORAGE_ZONE);

// promise version
storage.deleteFile(PATH, FILE_NAME).then(data => {
  console.log(data); // { HttpCode: 200, Message: 'File deleted successfuly.' }
}).catch(err => {
  console.log(err);
});

// callback version
storage.deleteFile(PATH, FILE_NAME, (err, resp, data) => {
  console.log(data); // { HttpCode: 200, Message: 'File deleted successfuly.' }
});
```

### Get files

```javascript
const storage = require('bunnycdn-storage-api-node-sdk')(API_STORAGE_KEY, API_STORAGE_ZONE);

storage.getFiles('/').then(data => {
  console.log(data) // data is an array of objects, a list of files
}).catch(err => {
  console.log(err);
});
```
### Update the storage zone

```js
storage.setStorageZone('newStorageZone');
```

### Update the API key

```js
storage.setStorageKey('newStorageKey');
```

### Update the API Base URL

```js
storage.setBaseURL('https://');
```

## Run tests

```
$ npm run test
```

## Contributing

Contributions, issues and feature requests are welcome!

## Show your support

Give a ⭐️ if this project helped you!
