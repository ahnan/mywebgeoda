importScripts("https://unpkg.com/comlink/dist/umd/comlink.js", "./jsgeoda.js");

// thanks @ https://stackoverflow.com/questions/31054910/get-functions-methods-of-a-class/31055217
function getAllFuncs(toCheck) {
  var props = [];
  var obj = toCheck;
  do {
    props = props.concat(Object.getOwnPropertyNames(obj));
  } while ((obj = Object.getPrototypeOf(obj)) && obj != Object.prototype);

  return props.sort().filter(function (e, i, arr) {
    if (e != arr[i + 1] && typeof toCheck[e] == "function") return true;
  });
}


var dummyData = new Uint8Array([123,34,116,121,112,101,34,58,34,70,101,97,116,117,114,101,34,44,34,103,101,111,109,101,116,114,121,34,58,123,34,116,121,112,101,34,58,34,80,111,105,110,116,34,44,34,99,111,111,114,100,105,110,97,116,101,115,34,58,91,48,44,48,93,125,125])

function encodeAb(content){
  return new TextEncoder().encode(JSON.stringify(content))
}

/**
 * @class
 * @classdesc geodaWorkerProxy is the equivalent of entry point to getting a geoda proxy in through comlink.
 * Call the worker, then {@link New}() to get access to geoda functions.
 */
class GeodaWorkerProxy {
  constructor() {
    this.geoda = null;
  }

  /**
   * Initialize the worker with jsgeoda.
   * Populated all jsgeoda functions in the worker for exposure through Comlink.
   * @returns {Boolean} True, after loaded.
   */
  async New() {
    if (this.geoda !== null) return true;
    var jsgeoda = await exports.New();
    try{jsgeoda.readGeoJSON(dummyData)}catch{}
    this.geoda = jsgeoda;
    var allFunctions = getAllFuncs(this.geoda);
    for (const key of allFunctions) {
      this[key] = (...args) => this.handleFunction(key, args);
    }
    return true;
  }
  /**
   * Pass through of readGeoJson.
   * @param {String} url The url of the geojson file to be fetched.
   * @returns {String} A unique id of the geoda object.
   * @returns {GeoJson} Fetched geodata
   */
  async loadGeoJSON(url, geoIdColumn) {
    if (this.geoda === null) await this.New();
    var response = await fetch(url);
    var responseClone = await response.clone();
    var [geojsonData, ab] = await Promise.all([
      response.json(),
      responseClone.arrayBuffer(),
    ]);

    if (
      !(isNaN(+geojsonData.features[0].properties[geoIdColumn])) 
      && "number" !== typeof geojsonData.features[0].properties[geoIdColumn])
    {   
      for (var i=0; i<geojsonData.features.length; i++) {
        geojsonData.features[i].properties[geoIdColumn] = +geojsonData.features[i].properties[geoIdColumn]
      }
    }
    
    for (var i=0; i<10; i++){
      try {
        var id = this.readGeoJSON(ab);
        return [id, geojsonData];
      } catch {}
    }
  }

  async attemptSecondGeojsonLoad(url){
    if (this.geoda === null) await this.New();
    var response = await fetch(url);
    var ab = await response.arrayBuffer();
    try {
      var id = this.readGeoJSON(ab);
      return id;
    } catch {
      return null;
    }
  }

  /**
   * Worker functions are slightly obfuscated, so this lists out availble Prototype functions.
   * @returns {Array} List of available functions.
   */
  async listFunctions() {
    if (this.geoda === null) await this.New();
    return getAllFuncs(this);
  }

  handleFunction(fn, args) {
    if (["New", "loadGeoJSON", "listFunctions"].includes(fn)) {
      return this[fn](...args);
    } else {
      return this.geoda[fn](...args);
    }
  }
}

// Instantiate the worker proxy
const geodaWorker = new GeodaWorkerProxy();

// Expose it to Comlink
Comlink.expose(geodaWorker);
