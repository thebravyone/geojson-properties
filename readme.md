# geojson-properties [![Build Status](https://travis-ci.org/thebravyone/geojson-properties.svg?branch=master)](https://travis-ci.org/thebravyone/geojson-properties)

>An easy way to get or replace properties of GeoJSON features.


## Install

```
$ npm install geojson-properties
```


## Usage

```js
const geo = require('geojson-properties');

geo.getProperties(someGeoJSON);
//=> [{id: "01", value: "blue"}, {id: "02", value: "red"}]
```


## API

### .getProperties(geoJSON)

#### geoJSON

Type: `GeoJSON`

Must be a FeatureCollection.

### .replaceProperties(geoJSON, data, key)

#### geoJSON

Type: `GeoJSON`

Must be a FeatureCollection.

#### data

Type: `array`

An array of properties (Objects).

#### key

Type: `string`

A key value used to merge both data and GeoJSON.

## License

MIT © [Guilherme Serradilha](https://github.com/thebravyone)
