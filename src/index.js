const get = require("simple-get");

module.exports = function BunnyCDNStorage(API_STORAGE_KEY, API_STORAGE_ZONE) {
  if (!API_STORAGE_KEY || !API_STORAGE_ZONE) {
    throw new Error(
      "BunnyCDNStorage SDK: constructor error: storage key or storage zone missing."
    );
  }
  const _config = {
    API_BASE_URL: "https://storage.bunnycdn.com",
    API_STORAGE_ZONE,
  };
  const _httpHeader = {
    AccessKey: API_STORAGE_KEY,
  };
  return {
    getFile: function (path, fileName, cb = null) {
      path = this.checkPathLastChar(path);
      const _req = {
        url: `${_config.API_BASE_URL}/${_config.API_STORAGE_ZONE}${path}/${fileName}`,
        method: "GET",
        headers: _httpHeader,
      };
      return this.httpRequest(_req, cb);
    },
    getFiles: function (path = "/", cb = null) {
      const _req = {
        url: `${_config.API_BASE_URL}/${_config.API_STORAGE_ZONE}${path}`,
        method: "GET",
        headers: {
          AccessKey: API_STORAGE_KEY,
        },
        json: true,
      };
      return this.httpRequest(_req, cb);
    },
    putFile: function (path, fileName, buff, cb = null) {
      path = this.checkPathLastChar(path);
      const _req = {
        url: `${_config.API_BASE_URL}/${_config.API_STORAGE_ZONE}${path}/${fileName}`,
        method: "PUT",
        headers: {
          AccessKey: API_STORAGE_KEY,
        },
        body: buff,
      };
      return this.httpRequest(_req, cb);
    },
    deleteFile: function (path, fileName = "", cb = null) {
      path = this.checkPathLastChar(path);
      const _req = {
        url: `${_config.API_BASE_URL}/${_config.API_STORAGE_ZONE}${path}/${fileName}`,
        method: "DELETE",
        headers: {
          AccessKey: API_STORAGE_KEY,
        },
        json: true,
      };
      return this.httpRequest(_req, cb);
    },
    checkPathLastChar: function (path) {
      if (path && path[path.length - 1] === "/") {
        path = path.slice(0, -1);
      }
      return path;
    },
    setStorageZone: function (API_STORAGE_ZONE) {
      _config.API_STORAGE_ZONE = API_STORAGE_ZONE;
    },
    getStorageZone: function () {
      return _config.API_STORAGE_ZONE;
    },
    setBaseURL: function (API_BASE_URL) {
      _config.API_BASE_URL = API_BASE_URL;
    },
    getBaseURL: function () {
      return _config.API_BASE_URL;
    },
    setStorageKey: function (API_STORAGE_KEY) {
      _httpHeader.AccessKey = API_STORAGE_KEY;
    },
    getStorageKey: function () {
      return _httpHeader.AccessKey;
    },
    httpRequest: function (opts, cb) {
      return cb
        ? get.concat(opts, cb)
        : new Promise((resolve, reject) => {
            get.concat(opts, function (err, res, data) {
              if (err) {
                return reject(err);
              }
              return resolve(data);
            });
          });
    },
  };
};
