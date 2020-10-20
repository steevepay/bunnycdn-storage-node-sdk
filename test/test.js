const bunnyCDNStorage = require('../src/index');
const assert = require('assert');
const nock = require('nock');
const fs = require('fs');

const API_URL = 'https://storage.bunnycdn.com'
const API_KEY = 'ThisIsAnAPIKey1234';
const STORAGE_ZONE = 'website1';
const MOCK_DATA = require('./mock');

describe('BunnyCDN Tests', function () {

  const storage = bunnyCDNStorage(API_KEY, STORAGE_ZONE);

  describe('Get files', function () {
    it('should retreive a list of files inside a storage zone', (done) => {
      const path = "/path/to/the/directory/"
      nock(API_URL, { reqheaders : {
          AccessKey: API_KEY,
          "accept-encoding": "gzip, deflate",
          "accept": "application/json"
        }})
        .get('/' + STORAGE_ZONE + path)
        .reply(200, {
          success: true,
          data: MOCK_DATA
        });

      // eslint-disable-next-line no-unused-vars
      storage.getFiles(path).then(({res, data}) => {
        assert.strictEqual(JSON.stringify(data.data), JSON.stringify(MOCK_DATA));
        done();
      });
    })
  });

  describe('Get file', function () {
    it('should retreive a file inside a storage zone', (done) => {
      const fileName = "mock.js";
      const path = "/path/to/the/directory"
      const fileExpected = fs.readFileSync(__dirname + '/mock.js');
      nock(API_URL, { reqheaders : {
          AccessKey: API_KEY,
          "accept-encoding": "gzip, deflate"
        }})
        .get('/' + STORAGE_ZONE + path + '/' + fileName)
        .replyWithFile(200, __dirname + '/mock.js');

      // eslint-disable-next-line no-unused-vars
      storage.getFile(path, '/' + fileName).then(({res, data}) => {
        console.log(data);

        assert.strictEqual(data.toString(), fileExpected.toString());
        done();
      });
    })
  });

  describe.skip('Delete file', function () {
    it('should delete a file inside a storage zone', (done) => {
      const fileName = "mock.js";
      const path = "/path/to/the/directory";
      const expectedResponse = { success: true };
      const fileExpected = fs.readFileSync(__dirname + '/mock.js');
      nock(API_URL, {
        reqheaders : {
          AccessKey: API_KEY,
          "accept-encoding": "gzip, deflate"
        }})
        .delete('/' + STORAGE_ZONE + path + '/' + fileName)
        .reply(201, expectedResponse);

      // eslint-disable-next-line no-unused-vars
      storage.deleteFile(path, '/' + fileName).then(({res, data}) => {
        assert.strictEqual(JSON.stringify(data), JSON.stringify(expectedResponse));
        done();
      });
    })
  });

  describe.skip('Put file', function () {
    it('should add a file inside a storage zone', (done) => {
      const fileName = "mock.js";
      const path = "/path/to/the/directory";

    });
  });
});