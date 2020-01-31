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
			v-for="marker in filteredLocations"
			:coordinates="[marker.lng, marker.lat]"
			:draggable="false"
			:color="getMarkerColor(marker)"
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
			locations: []
		};
	},
	computed: {
		filteredLocations: function () {
			// filter active locations
			let filtered = this.locations.filter(location => {
				return location.active
			})
			// filter based on filters
			// -> HDB
			filtered = filtered.filter(location => {
				return this.$store.state.filters.includes('hdb') ? location.hdb : !location.hdb
			})
			// -> URA
			filtered = filtered.filter(location => {
				return this.$store.state.filters.includes('ura') ? location.ura : !location.ura
			})
			// -> free
			filtered = filtered.filter(location => {
				return this.$store.state.filters.includes('free') ? location.free : !location.free
			})
			return filtered
		}
	},
	methods: {
		onMapLoaded(event) {
			this.map = event.map;
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
		async markerClicked(event) {
			const markerId = event.component.$attrs.markerId
			this.selectedMarker = markerId

			this.$store.dispatch('setLocation', markerId)

			const location = this.locations.filter(location => location._id === markerId)[0]

			const currentZoom = this.map.getZoom()

			await this.map.flyTo({ 
				center: [location.lng, location.lat], 
				zoom: currentZoom < 15 ? 15 : currentZoom
			})
		},
		getMarkerColor(location) {
			if (location.hdb) return 'var(--orange)'
			if (location.ura) return 'var(--red)'
			if (location.free) return 'var(--green)'
			return this.markerColor
		}
	},
	created() {
		this.map = null;
		this.mapbox = Mapbox;
	},
	async mounted() {
		const response = await axios.get('/.netlify/functions/locations-get')
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
