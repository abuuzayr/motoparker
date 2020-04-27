<template>
  <div class="map">
    <MglMap
		v-bind:class="{'select-location': Object.keys(this.$store.state.locationData).length === 0 && this.$store.state.edit === 'new'}"
		:accessToken="accessToken"
		:mapStyle.sync="mapStyle"
		:center="mapCenter"
		:zoom="defaultZoom"
		@load="onMapLoaded"
		@click="mapClick"
    >
		<MglNavigationControl :showZoom="true" :showCompass="false" position="top-left" />
		<MglGeolocateControl position="top-left" />
		<MglMarker
			v-for="marker in filteredLocations"
			:coordinates="[marker.lng, marker.lat]"
			:draggable="
				($store.state.edit && $store.state.location === marker._id) 
				|| ($store.state.edit && $store.state.edit.includes('new'))
			"
			:color="getMarkerColor(marker)"
			:markerId="marker._id"
			:key="marker._id"
			@click="markerClicked"
			@dragend="onDragend"
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

export default {
	components: {
		MglMap,
		MglNavigationControl,
		MglMarker,
		MglGeolocateControl
	},
	props: [
		'locations'
	],
	data() {
		return {
			accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
			defaultZoom: 11,
			mapCenter: [103.819839, 1.352083],
			mapStyle: 'mapbox://styles/mapbox/streets-v11',
			markerColor: 'var(--blue)',
			counter: 0,
			selectedMarker: null,
			initialLocations: this.locations
		};
	},
	watch: {
		locations: function () {
			if (JSON.stringify(this.initialLocations) !== JSON.stringify(this.locations)) {
				this.initialLocations = this.locations
			}
		}
	},
	computed: {
		filteredLocations: function () {
			if (this.$store.state.edit === 'newEdit') return this.initialLocations
			const filters = ['free', 'ura']
			let filtered = this.initialLocations.filter(location => {
				if (!location.active) return false
				if (!this.$store.state.filters.length) return true
				let active = true
				const activeFilters = filters.filter(f => {
					return this.$store.state.filters.includes(f)
				})
				activeFilters.forEach(f => {
					if (!location[f]) active = false
				})
				return active
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

			const location = this.initialLocations.find(location => location._id === markerId)

			const currentZoom = this.map.getZoom()

			await this.map.flyTo({ 
				center: [location.lng, location.lat], 
				zoom: currentZoom < 15 ? 15 : currentZoom
			})
		},
		getMarkerColor(location) {
			if (this.$store.state.edit === 'newEdit') return 'var(--yellow)'
			if (location.ura) return 'var(--orange)'
			if (location.free) return 'var(--green)'
			return this.markerColor
		},
		onDragend(payload) {
			const { lng, lat } = payload.marker.getLngLat()
			// update map
			const currentMarker = this.initialLocations[0]
			currentMarker['lat'] = lat
			currentMarker['lng'] = lng
			this.initialLocations = this.initialLocations.splice(0, 1, currentMarker)
			// update location data which will be saved
			this.$store.dispatch('setLocationData', {
				...this.$store.state.locationData,
				lng,
				lat
			})
		},
		async mapClick(e) {
			if (this.$store.state.edit !== 'new') return
			const { lng, lat } = e.mapboxEvent.lngLat
			if (lng && lat) {
				const currentZoom = this.map.getZoom()

				await this.map.flyTo({ 
					center: [lng, lat], 
					zoom: currentZoom < 15 ? 15 : currentZoom
				})

				const location = {
					lat,
					lng,
					active: true,
					free: this.$store.state.filters.includes('free'),
					ura: this.$store.state.filters.includes('ura'),
				}

				this.initialLocations = [location]
				
				this.$store.dispatch('setEdit', 'newEdit')

				this.$store.dispatch('setLocationData', location)
				
			}
		}
	},
	created() {
		this.map = null;
		this.mapbox = Mapbox;
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
.select-location .mapboxgl-canvas-container.mapboxgl-interactive {
	cursor: pointer;
}
</style>
