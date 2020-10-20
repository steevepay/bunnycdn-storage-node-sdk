const simpleGet = require("simple-get");

module.exports = function BunnyCDNStorage(
  API_STORAGE_KEY,
  API_STORAGE_ZONE = ""
) {
  const _config = {
    API_BASE_URL: "https://storage.bunnycdn.com",
    API_STORAGE_ZONE,
  };
  const _httpHeader = {
    AccessKey: API_STORAGE_KEY,
  };
  return {
    setStorageZone: function (API_STORAGE_ZONE) {
      _config.API_STORAGE_ZONE = API_STORAGE_ZONE;
    },
    setBaseURL: function (API_BASE_URL) {
      _config.API_BASE_URL = API_BASE_URL;
    },
    httpRequest: function (opts) {
      return new Promise((resolve, reject) => {
        simpleGet.concat(opts, function (err, res, data) {
          if (err) {
            return reject(err);
          }
          return resolve({ res, data });
        });
      });
    },
    getFile: function (path, fileName) {
      const _req = {
        url: `${_config.API_BASE_URL}/${_config.API_STORAGE_ZONE}${path}${fileName}`,
        method: "GET",
        headers: _httpHeader,
      };
      return this.httpRequest(_req);
    },
    getFiles: function (path = "/") {
      const _req = {
        url: `${_config.API_BASE_URL}/${_config.API_STORAGE_ZONE}${path}`,
        method: "GET",
        headers: {
          AccessKey: API_STORAGE_KEY,
        },
        json: true,
      };
      return this.httpRequest(_req);
    },
    putFile: function (path, fileName, fileBuffer) {
      const _req = {
        url: `${_config.API_BASE_URL}/${_config.API_STORAGE_ZONE}${path}${fileName}`,
        method: "PUT",
        headers: {
          AccessKey: API_STORAGE_KEY,
        },
        body: fileBuffer,
        json: true,
      };
      return this.httpRequest(_req);
    },
    deleteFile: function (path, file = "") {
      const _req = {
        url: `${_config.API_BASE_URL}/${_config.API_STORAGE_ZONE}${path}${file}`,
        method: "DELETE",
        headers: {
          AccessKey: API_STORAGE_KEY,
        },
        json: true,
      };
      return this.httpRequest(_req);
    },
  };
};
