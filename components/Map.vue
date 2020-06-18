<template>
    <div id="map">
        <GmapMap
                ref="map"
                :center="getCoords(initCoords)"
                :zoom="mapOptions.zoom"
                :map-type-id="mapOptions.type"
                style="width: 100vw; height: 726px"
        >
            <GmapInfoWindow
                    :options="infoOptions"
                    :position="infoWindowPos"
                    :opened="infoWinOpen"
                    @closeclick="infoWinOpen=false"
            >
                <div v-html="infoContent"></div>
            </GmapInfoWindow>

            <GmapMarker
                    ref="marker"
                    v-for="office in officeList"
                    :id="office.fields.id"
                    :key="office.fields.id"
                    :position="getCoords(office.fields.coords)"
                    :icon="mapOptions.iconUrl"
                    :clickable="true"
                    @click="markerClickHandler(office, office.fields.id)"
            />
        </GmapMap>
    </div>
</template>

<script>
    export default {
        name: 'Map',
        props: ['initCoords', 'officeList'],
        data() {
            return {
                officeId: 1,
                mapOptions: {
                    zoom: 17,
                    type: 'roadmap',
                    iconUrl: '/gmap_marker.svg'
                },
                infoContent: '',
                infoWindowPos: {
                    lat: 0,
                    lng: 0
                },
                infoWinOpen: false,
                currentMidx: null,
                infoOptions: {
                    pixelOffset: {
                        width: 0,
                        height: -75
                    }
                }
            }
        },
        computed: {
            map: function () {
                return this.$refs.map.$mapObject
            },
            markers: function () {
                return this.$refs.marker
            }
        },
        methods: {
            markerClickHandler: function (office, index) {
                this.go(this.getCoords(office.fields.coords));
                this.toggleInfoWindow(office, index);
            },
            getCoords: coords => {
                return {
                    lat: parseFloat(coords.lat),
                    lng: parseFloat(coords.lng)
                }
            },
            goToNextOffice: function (officeId) {
                this.officeList.forEach(office => {
                    if (office.fields.id === officeId) {
                        this.go(this.getCoords(office.fields.coords));
                        this.toggleInfoWindow(office, officeId);
                    }
                });
            },
            go(coords) {
                this.map.setCenter(coords);
                this.map.setZoom(this.mapOptions.zoom);
            },
            toggleInfoWindow: function (office, index) {
                this.infoWindowPos = this.getCoords(office.fields.coords);
                this.infoContent = this.getInfoWindowContent(office);

                if (this.currentMidx === index) {
                    this.infoWinOpen = !this.infoWinOpen;
                }
                else {
                    this.infoWinOpen = true;
                    this.currentMidx = index;
                }
            },
            getInfoWindowContent: function (office) {
                return (`
                    <div class="info_window">
                            <div class="info_window_title">
                                ${office.fields.title}
                            </div>
                            <div class="info_window_address">
                                ${office.fields.address}
                            </div>
                     </div>`);
            }
        },
        mounted() {
            this.$bus.$on('officeClicked', ({officeId}) => {
                if (officeId !== this.officeId) {
                    this.officeId = officeId;
                    this.goToNextOffice(officeId);
                } else {
                    this.officeList.forEach(office => {
                        if (office.fields.id === officeId) {
                            this.map.setCenter(this.getCoords(office.fields.coords))
                        }
                    });
                }
            });

            this.officeList.forEach(office => {
                if (office.fields.id === this.officeId) {
                    this.toggleInfoWindow(office, this.officeId);
                }
            });
        },
    }
</script>


<style lang="scss">
    @import "../assets/scss/mixins&vars.scss";

    #map {
        .info_window {
            padding: 5px 24px 10px 0;
            color: $indigo;
            box-shadow: 0 7px 20px rgba(37, 60, 77, 0.2);
            border-radius: 10px;
            font-family: 'TTFirs', sans-serif;
            &_title {
                font-weight: bold;
                font-size: 25px;
                line-height: 18px;
                letter-spacing: 0.5px;
                padding-bottom: 17px;
            }
            &_address {
                font-size: 15px;
                line-height: 18px;
                letter-spacing: 0.5px;
                @include desktop() {
                    width: 257px;
                }
            }
        }
    }
</style>

<style lang="scss" scoped>
    @import "../assets/scss/mixins&vars.scss";

    #map {
        @include touch {
            display: none;
        }
    }
</style>