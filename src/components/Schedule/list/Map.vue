<template>
  <div>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
      ref="mapRef"
    >
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  props: {
    location: {
      type: Object
    }
  },
  data() {
    return {
      center: {
        lat: 45.508,
        lng: -73.587
      }
    };
  },
  watch: {
    location() {
      this.$refs.mapRef.$mapPromise.then(map => {
        map.panTo({
          lat: Number(this.location.lat),
          lng: Number(this.location.lng)
        });
      });
    }
  }
};
</script>
