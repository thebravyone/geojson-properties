import fs from 'fs';
import path from 'path';

import test from 'ava';
import m from '.';

const geojson = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'fixture_1.json')));
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'fixture_2.json')));

test('get properties', t => {
	const properties = m.getProperties(geojson);
	t.is(properties[0].id, '01');
	t.is(properties[1].id, '02');
	t.is(properties[2].id, '03');
});

test('replace properties', t => {
	const replaced = m.replaceProperties(geojson, data, 'id');
	t.is(replaced.type, 'FeatureCollection');
	t.is(replaced.features.length, 3);
	t.is(replaced.features[0].properties.name, 'one');
	t.is(replaced.features[1].properties.name, 'two');
	t.is(replaced.features[2].properties.name, 'three');
});

test('blank get properties', t => {
	const error = t.throws(() => {
		m.getProperties();
	}, TypeError);

	t.is(error.message, 'Expected an JSON Object, got undefined');
});

test('blank replace properties', t => {
	let error = t.throws(() => {
		m.replaceProperties();
	}, TypeError);

	t.is(error.message, 'Expected an JSON Object, got undefined');

	error = t.throws(() => {
		m.replaceProperties(geojson);
	}, TypeError);

	t.is(error.message, 'An array of objects must be provided as properties');
});
