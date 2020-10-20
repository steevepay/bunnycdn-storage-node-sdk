// const bunnyCDNStorage = require('./index.js');
// const API_STORAGE_KEY = '04f4c208-22a8-4a6e-b695ab73285a-6b83-472e';
// const API_STORAGE_ZONE = 'cheerydolls';
// const storage = bunnyCDNStorage(API_STORAGE_KEY, API_STORAGE_ZONE)

// storage.getFiles().then(({res, data}) => {
//   console.log(data);
// }).catch(err => {
//   console.log(err);
// })

// const FILE_NAME = 'tromport.jpg';
// const fs = require('fs');
// const fileBuffer = fs.readFileSync('./' + FILE_NAME);
// console.log(fileBuffer);
// storage.putFile('/', FILE_NAME, fileBuffer).then(({res, data}) => {
//   console.log(data);
// })

// storage.getFile('/', FILE_NAME).then(({res, data}) => {
//   console.log(data);
// });

// storage.deleteFile('/', FILE_NAME).then(({res, data}) => {
//   console.log(data);
// });
