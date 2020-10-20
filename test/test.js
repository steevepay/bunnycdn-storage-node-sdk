const bunnyCDNStorage = require("../src/index");
const assert = require("assert");
const nock = require("nock");
const fs = require("fs");

const API_URL = "https://storage.bunnycdn.com";
const API_KEY = "ThisIsAnAPIKey1234";
const STORAGE_ZONE = "website1";
const MOCK_DATA = require("./mock.json");

describe("BunnyCDN Tests", function () {
  const storage = bunnyCDNStorage(API_KEY, STORAGE_ZONE);

  describe("Get files", function () {
    it("should retreive a list of files inside a storage zone [PROMISE]", (done) => {
      const path = "/path/to/the/directory/";
      nock(API_URL, {
        reqheaders: {
          AccessKey: API_KEY,
          "accept-encoding": "gzip, deflate",
          accept: "application/json",
        },
      })
        .get("/" + STORAGE_ZONE + path)
        .reply(200, MOCK_DATA);

      storage.getFiles(path).then((data) => {
        assert.strictEqual(JSON.stringify(data), JSON.stringify(MOCK_DATA));
        done();
      });
    });

    it("should retreive a list of files inside a storage zone [CALLBACK]", (done) => {
      const path = "/path/to/the/directory/";
      nock(API_URL, {
        reqheaders: {
          AccessKey: API_KEY,
          "accept-encoding": "gzip, deflate",
          accept: "application/json",
        },
      })
        .get("/" + STORAGE_ZONE + path)
        .reply(200, MOCK_DATA);

      storage.getFiles(path, (err, resp, data) => {
        assert.strictEqual(err + "", "null");
        assert.strictEqual(JSON.stringify(data), JSON.stringify(MOCK_DATA));
        done();
      });
    });
  });

  describe("Get file", function () {
    it("should retreive a file inside a storage zone [PROMISE]", (done) => {
      const fileName = "mock.json";
      const path = "/path/to/the/directory";
      const fileExpected = fs.readFileSync(__dirname + "/" + fileName);
      nock(API_URL, {
        reqheaders: {
          AccessKey: API_KEY,
          "accept-encoding": "gzip, deflate",
        },
      })
        .get("/" + STORAGE_ZONE + path + "/" + fileName)
        .replyWithFile(200, __dirname + "/" + fileName);

      storage.getFile(path, fileName).then((data) => {
        assert.strictEqual(data.toString(), fileExpected.toString());
        done();
      });
    });

    it("should retreive a file inside a storage zone [CALLBACK]", (done) => {
      const fileName = "mock.json";
      const path = "/path/to/the/directory";
      const fileExpected = fs.readFileSync(__dirname + "/" + fileName);
      nock(API_URL, {
        reqheaders: {
          AccessKey: API_KEY,
          "accept-encoding": "gzip, deflate",
        },
      })
        .get("/" + STORAGE_ZONE + path + "/" + fileName)
        .replyWithFile(200, __dirname + "/" + fileName);

      storage.getFile(path, fileName, (err, resp, data) => {
        assert.strictEqual(err + "", "null");
        assert.strictEqual(data.toString(), fileExpected.toString());
        done();
      });
    });
  });

  describe("Delete file", function () {
    it("should delete a file inside a storage zone [PROMISE]", (done) => {
      const fileName = "mock.json";
      const path = "/path/to/the/directory";
      const expectedResponse = {
        HttpCode: 200,
        Message: "File deleted successfuly.",
      };
      nock(API_URL, {
        reqheaders: {
          AccessKey: API_KEY,
          "accept-encoding": "gzip, deflate",
        },
      })
        .delete("/" + STORAGE_ZONE + path + "/" + fileName)
        .reply(201, expectedResponse);

      storage.deleteFile(path, fileName).then((data) => {
        assert.strictEqual(
          JSON.stringify(data),
          JSON.stringify(expectedResponse)
        );
        done();
      });
    });

    it("should delete a file inside a storage zone [CALLBACK]", (done) => {
      const fileName = "mock.json";
      const path = "/path/to/the/directory";
      const expectedResponse = {
        HttpCode: 200,
        Message: "File deleted successfuly.",
      };
      nock(API_URL, {
        reqheaders: {
          AccessKey: API_KEY,
          "accept-encoding": "gzip, deflate",
        },
      })
        .delete("/" + STORAGE_ZONE + path + "/" + fileName)
        .reply(201, expectedResponse);

      storage.deleteFile(path, fileName, (err, resp, data) => {
        assert.strictEqual(err + "", "null");
        assert.strictEqual(
          JSON.stringify(data),
          JSON.stringify(expectedResponse)
        );
        done();
      });
    });
  });

  describe("Put file", function () {
    it("should add a file inside a storage zone [PROMISE]", (done) => {
      const fileName = "mock.json";
      const path = "/path/to/the/directory2";

      const expectedResponse = { HttpCode: 201, Message: "File uploaded." };
      const mockBuffer = new Buffer.from("This is a random text1234");

      nock(API_URL, {
        reqheaders: {
          AccessKey: API_KEY,
          "accept-encoding": "gzip, deflate",
          "content-length": mockBuffer.length,
        },
      })
        .put(`/${STORAGE_ZONE}${path}/${fileName}`, mockBuffer)
        .reply(201, expectedResponse, {
          "Content-Type": "application/json",
        });

      storage.putFile(path, fileName, mockBuffer).then((data) => {
        assert.strictEqual(data.toString(), JSON.stringify(expectedResponse));
        done();
      });
    });

    it("should add a file inside a storage zone [CALLBACK]", (done) => {
      const fileName = "mock.json";
      const path = "/path/to/the/directory2";

      const expectedResponse = { HttpCode: 201, Message: "File uploaded." };
      const mockBuffer = new Buffer.from("This is a random text1234");

      nock(API_URL, {
        reqheaders: {
          AccessKey: API_KEY,
          "accept-encoding": "gzip, deflate",
          "content-length": mockBuffer.length,
        },
      })
        .put(`/${STORAGE_ZONE}${path}/${fileName}`, mockBuffer)
        .reply(201, expectedResponse, {
          "Content-Type": "application/json",
        });

      storage.putFile(path, fileName, mockBuffer, (err, resp, data) => {
        assert.strictEqual(err + "", "null");
        assert.strictEqual(data.toString(), JSON.stringify(expectedResponse));
        done();
      });
    });
  });

  describe("Update config & outils", function () {
    it("the sdk constructor should throw an error if it is missing the storage key or storage zone", (done) => {
      assert.throws(bunnyCDNStorage, Error);
      assert.throws(function () {
        bunnyCDNStorage("Key");
      }, Error);
      assert.throws(function () {
        bunnyCDNStorage(null, "zone");
      }, Error);
      assert.throws(function () {
        bunnyCDNStorage("key", "");
      }, Error);
      done();
    });
    it("should update the API_ZONE_STORAGE variable", (done) => {
      const expectedValue = "123456qwerty";
      storage.setStorageZone(expectedValue);
      assert.strictEqual(storage.getStorageZone(), expectedValue);
      done();
    });
    it("should update the API_BASE_URL variable", (done) => {
      const expectedValue = "https://......";
      storage.setBaseURL(expectedValue);
      assert.strictEqual(storage.getBaseURL(), expectedValue);
      done();
    });
    it("should update the API_STORAGE_KEY variable", (done) => {
      const expectedValue = "FOIEJWOIJ)(J#@)(J";
      storage.setStorageKey(expectedValue);
      assert.strictEqual(storage.getStorageKey(), expectedValue);
      done();
    });
    it("should remove the last slash at the end of the path", (done) => {
      assert.strictEqual(
        storage.checkPathLastChar("/this/is/a/path/"),
        "/this/is/a/path"
      );
      assert.strictEqual(
        storage.checkPathLastChar("/this/is/a/path"),
        "/this/is/a/path"
      );
      done();
    });
  });
});
