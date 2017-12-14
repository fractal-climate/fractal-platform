
// Openlayers rendering styles
var styles = {

	'LineString': new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'green',
			width: 1
		})
	}),
	'MultiLineString': new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'green',
			width: 1
		})
	}),
	'MultiPolygon': new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'black',
			width: 1
		}),
		fill: new ol.style.Fill({
			color: 'rgba(255, 255, 0, 0.1)'
		})
	}),
	'Polygon': new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'blue',
			lineDash: [4],
			width: 3
		}),
		fill: new ol.style.Fill({
			color: 'rgba(0, 0, 255, 0.1)'
		})
	}),
	'GeometryCollection': new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'magenta',
			width: 2
		}),
		fill: new ol.style.Fill({
			color: 'magenta'
		}),
		image: new ol.style.Circle({
			radius: 10,
			fill: null,
			stroke: new ol.style.Stroke({
				color: 'magenta'
			})
		})
	}),
	'Circle': new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'red',
			width: 2
		}),
		fill: new ol.style.Fill({
			color: 'rgba(255,0,0,0.2)'
		})
	})
};


// Map from geometry type to style
var styleFunction = function(feature) {
				return styles[feature.getGeometry().getType()];
};

var map = new ol.Map({
						
	target: 'map',

	layers: [
		new ol.layer.Tile({
			source: new ol.source.OSM()
		}) 
	],

	view: new ol.View({
		center: ol.proj.fromLonLat([0, 0]),
		zoom: 3
	})

});

vectorSource = new ol.source.Vector({
	format: new ol.format.GeoJSON(),
	url: '/static/data/ne_110m_admin_0_countries.json'
})

vectorLayer = new ol.layer.Vector({
	source: vectorSource,
	style: styleFunction
})

map.addLayer(vectorLayer)


var select = new ol.interaction.Select({
      layers: [vectorLayer]
 });

map.addInteraction(select);
selected = select.getFeatures();

var showProperties = function(pixel) {

	var features = [];

	map.forEachFeatureAtPixel(pixel, function(feature, layer) {
		features.push(feature);
	});

	console.log(features[0].getProperties());

    
}


var data = {
	name: '',
	properties: {}
}


selected.on('add', function(evt) {
	
	console.log('selected has been changed');

	feature = evt.target.item(0);

	data.name = feature.get('NAME');
	data.properties.population = parseInt(feature.get('POP_EST'))/1000000;


	UIkit.modal('#modal').show();

});


var app = new Vue({

	el: '#modal-content',

	data: data

})

