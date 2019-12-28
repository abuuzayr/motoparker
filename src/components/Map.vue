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
      <MglMarker
        v-for="marker in payload"
        :coordinates="[marker.lng, marker.lat]"
        :draggable="true"
        :color.sync="markerColor"
        :markerId="marker.id"
        :key="marker.id + '' + markerColor + (useCustomMarker ? 1 : 0)"
        @click="markerClicked"
        ref="markers"
      >
        <template slot="marker" v-if="useCustomMarker">
          <span
            class="text-xs inline-flex items-center justify-center p-3 mr-2 w-4 h-4 rounded-full"
            :class="{
              'bg-teal-800 text-teal-100': markerColor == 'blue',
              'bg-red-600 text-red-100': markerColor == 'red',
            }"
          >
            {{ marker.id }}
          </span>
        </template>
        <MglPopup>
          <div class="flex items-center">
            <span
              class="text-xs inline-flex items-center justify-center p-3 mr-2 w-4 h-4 rounded-full"
              :class="{
                'bg-teal-800 text-teal-100': markerColor == 'blue',
                'bg-red-800 text-red-100': markerColor == 'red',
              }"
            >
              {{ marker.id }}
            </span>
            <span class="text-sm">{{ marker.label }}</span>
          </div>
        </MglPopup>
      </MglMarker>
    </MglMap>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl';
import { MglMap, MglNavigationControl, MglMarker, MglPopup } from 'vue-mapbox';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export default {
	components: {
		MglMap,
		MglNavigationControl,
		MglMarker,
		MglPopup,
	},
	data() {
		return {
			accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
			defaultZoom: 11,
			mapCenter: [103.819839, 1.352083],
			mapStyle: 'mapbox://styles/mapbox/streets-v11',
			markerColor: 'blue',
			useCustomMarker: false,
			buttonDisabled: false,
			counter: 0,
			selectedMarker: null,
			payload: [],
			// Geocoder
			address: '',
		};
	},
	methods: {
		onMapLoaded(event) {
			this.map = event.map;
			this.addMarkers();
			this.addGeocoder();
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
			this.buttonDisabled = true;
			const bounds = this.map.getBounds();
			let lat_min = bounds.getSouthWest().lat,
				lat_range = bounds.getNorthEast().lat - lat_min,
				lng_min = bounds.getSouthWest().lng,
				lng_range = bounds.getNorthEast().lng - lng_min;
			let limit = this.counter + 0;
			for (this.counter; this.counter < limit; this.counter++) {
				this.payload.push({
					id: this.counter,
					lat: lat_min + Math.random() * lat_range,
					lng: lng_min + Math.random() * lng_range,
					label: Math.random()
						.toString(36)
						.substring(2, 15),
				});
			}
			this.buttonDisabled = false;
		},
		removeMarkers() {
			this.payload = [];
			this.counter = 0;
		},
		markerClicked(event) {
			let markerId = event.component.$attrs.markerId;
			this.selectedMarker = markerId;
			this.$refs.items[markerId].scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'center',
			});
		},
		addGeocoder() {
			this.geocoder = new MapboxGeocoder({
				accessToken: this.mapbox.accessToken,
				maboxgl: this.mapbox,
				marker: false,
			});
			// this.$refs.mapSearch.appendChild(this.geocoder.onAdd(this.map));

			let $this = this;
			this.geocoder.on('result', function() {
				$this.$nextTick(() => {
					$this.addMarkers();
				});
			});
		},
	},
	created() {
		this.map = null;
		this.mapbox = Mapbox;
	},
};
</script>

<style>
.map {
	height: 100vh;
}
.mapboxgl-canvas {
	left: 0;
}
@media screen and (min-width: 640px) {
	.mapboxgl-ctrl-geocoder {
		width: 100% !important;
		max-width: 100% !important;
	}
}
</style>
