const get = require("simple-get");

/**
 * @description Constructor used to init the SDK
 * @param {String} API_STORAGE_KEY Storage API KEY
 * @param {String} API_STORAGE_ZONE Storage Zone
 * @returns Return an object of functions to interact with the storage API
 */
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
    /**
     * @description Return a file as a buffer
     * @param {String} path Path to the file
     * @param {String} fileName File name
     * @param {Function} cb [OPTIONAL] callback function with 3 arguments: (err, resp, data)
     */
    getFile: function (path, fileName, cb = null) {
      path = this.checkPathLastChar(path);
      const _req = {
        url: `${_config.API_BASE_URL}/${_config.API_STORAGE_ZONE}${path}/${fileName}`,
        method: "GET",
        headers: _httpHeader,
      };
      return this.httpRequest(_req, cb);
    },
    /**
     * @description Return a list of file
     * @param {String} path Path to a directory
     * @param {Function} cb [OPTIONAL] callback function with 3 arguments: (err, resp, data)
     */
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
    /**
     * @description Add or update a file
     * @param {String} path path to access to the file
     * @param {String} fileName file name
     * @param {Buffer} buff Buffer of the file
     * @param {Function} cb [OPTIONAL] callback function with 3 arguments: (err, resp, data)
     */
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
    /**
     * @description delete a file
     * @param {String} path path to access to the file
     * @param {String} fileName file name
     * @param {Function} cb [OPTIONAL] callback function with 3 arguments: (err, resp, data)
     */
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
    /**
     * @description Remove the last slash on a path
     * @param {String} path path
     */
    checkPathLastChar: function (path) {
      if (path && path[path.length - 1] === "/") {
        path = path.slice(0, -1);
      }
      return path;
    },
    /**
     * @description Set the storage zone used to request the API.
     * @param {String} API_STORAGE_ZONE
     */
    setStorageZone: function (API_STORAGE_ZONE) {
      _config.API_STORAGE_ZONE = API_STORAGE_ZONE;
    },
    /**
     * @description Return the storage zone used to request the API.
     */
    getStorageZone: function () {
      return _config.API_STORAGE_ZONE;
    },
    /**
     * @description Set the BASE URL used to request the API
     * @param {String} API_BASE_URL
     */
    setBaseURL: function (API_BASE_URL) {
      _config.API_BASE_URL = API_BASE_URL;
    },
    /**
     * @description Return the BASE URL used to request the API
     */
    getBaseURL: function () {
      return _config.API_BASE_URL;
    },
    /**
     * @description Set the storage API key
     * @param {String} API_STORAGE_KEY
     */
    setStorageKey: function (API_STORAGE_KEY) {
      _httpHeader.AccessKey = API_STORAGE_KEY;
    },
    /**
     * @description Return the storage API KEY
     */
    getStorageKey: function () {
      return _httpHeader.AccessKey;
    },
    /**
     * @description Function to make HTTP request
     * @param {Object} opts
     * @param {Function} cb
     * @returns a callback function or a promise
     */
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
