'use strict';

const validateGeoJSON = json => {
	if (json !== Object(json)) {
		throw new TypeError(`Expected an JSON Object, got ${typeof json}`);
	}

	if (json.type !== 'FeatureCollection') {
		throw new Error('Only Feature Collection Objects are supported');
	}

	if (!json.features || json.features.length < 1) {
		throw new Error('The object has no features');
	}
};

const validateDataArray = data => {
	if (!data || data.length < 1) {
		throw new TypeError('An array of objects must be provided as properties');
	}

	for (let i = 0; i < data.length; i++) {
		if (data[i] !== Object(data[i])) {
			throw new TypeError(`Expected an Array of Objects, got an Array of ${typeof data[i]}`);
		}
	}
};

const validateKey = key => {
	if (typeof key !== 'string') {
		throw new TypeError(`Expected an string, got ${typeof key}`);
	}
};

exports.getProperties = geojson => {
	validateGeoJSON(geojson);

	const data = [];

	const features = geojson.features;

	for (let i = 0; i < features.length; i++) {
		if (features[i].properties &&
				features[i].properties === Object(features[i].properties)) {
			data[i] = features[i].properties;
		}
	}
	return data;
};

exports.replaceProperties = (geojson, properties, key) => {
	validateGeoJSON(geojson);

	validateDataArray(properties);

	validateKey(key);

	const features = JSON.parse(JSON.stringify(geojson.features));

	for (let i = 0; i < features.length; i++) {
		for (let j = 0; j < properties.length; j++) {
			if (!Object.prototype.hasOwnProperty.call(features[i].properties, key) || !Object.prototype.hasOwnProperty.call(properties[j], key)) {
				throw new Error('Some features are missing a key');
			}
			if (features[i].properties[key] === properties[j][key]) {
				features[i].properties = Object.assign(features[i].properties, JSON.parse(JSON.stringify(properties[j])));
			}
		}
	}

	return {type: 'FeatureCollection', features};
};
