<template>
  <div class="map">
    <MglMap
		class=""
		:accessToken="accessToken"
		:mapStyle.sync="mapStyle"
		:scrollZoom="false"
		:center="mapCenter"
		:zoom="defaultZoom"
		@load="onMapLoaded"
    >
		<MglNavigationControl :showZoom="true" :showCompass="false" />
		<MglGeolocateControl position="top-right" />
		<MglMarker
			v-for="marker in locations"
			:coordinates="[marker.lng, marker.lat]"
			:draggable="true"
			:color.sync="markerColor"
			:markerId="marker._id"
			:key="marker._id"
			@click="markerClicked"
			ref="markers"
		>
		</MglMarker>
    </MglMap>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl'
import { 
	MglMap, 
	MglNavigationControl, 
	MglMarker,
	MglGeolocateControl
} from 'vue-mapbox'
import axios from 'axios'

export default {
	components: {
		MglMap,
		MglNavigationControl,
		MglMarker,
		MglGeolocateControl
	},
	data() {
		return {
			accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
			defaultZoom: 11,
			mapCenter: [103.819839, 1.352083],
			mapStyle: 'mapbox://styles/mapbox/streets-v11',
			markerColor: 'blue',
			counter: 0,
			selectedMarker: null,
			payload: [],
			address: '',
			locations: []
		};
	},
	methods: {
		onMapLoaded(event) {
			this.map = event.map;
			this.addMarkers();
		},
		itemClicked(index) {
			this.$refs['markers'][index].togglePopup();
			this.selectedMarker = index;
			this.$refs.markers.forEach((marker, i) => {
				if (i != index) {
					marker.marker._popup.remove();
				}
			});

			this.$nextTick(() => {
				this.map.panTo(this.$refs['markers'][index].coordinates);
			});
		},
		addMarkers() {
			this.payload = this.locations;
		},
		removeMarkers() {
			this.payload = [];
		},
		async markerClicked(event) {
			let markerId = event.component.$attrs.markerId
			this.selectedMarker = markerId
			
			await this.map.flyTo({ center: [103.946728268616, 1.33213553610024], zoom: 15 })
		},
	},
	created() {
		this.map = null;
		this.mapbox = Mapbox;
	},
	async mounted() {
		const response = await axios.get('/locations')
		this.locations = response.data.locations
	},
};
</script>

<style>
.map {
	height: calc(100vh - 50px);
}
.mapboxgl-canvas {
	left: 0;
}
</style>
