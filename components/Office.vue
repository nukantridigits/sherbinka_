<template>
    <div class="office-item">
        <a
                :href="getOfficeHref(office)"
                :data-office-id="office.fields.id"
                :class="['office_item','card','full-height', office.fields.bgColor, 'card_'+office.fields.size]"
                @click="officeClickHandler"
                target="_blank"
        >

            <div class="card_icon"
                 :style="{'background-image': 'url(' + this.getIconUrl(office) + ')'}">
            </div>

            <div class="card_content">
                <div class="title">
                    {{office.fields.title}}
                </div>
                <div class="descr">
                    <div class="phone">
                        {{office.fields.phone}}
                    </div>
                    <div class="address">
                        {{office.fields.address}}
                    </div>
                </div>
            </div>
        </a>

        <div class="touch card card_phone">
            <h2>
                <a :href="getTelHref(office)">
                    {{office.fields.phone}}
                </a>
            </h2>
        </div>
    </div>
</template>

<script>
    const mobBreakpoint = 1023;

    export default {
        name: 'Office',
        props: ['office'],
        mounted() {
            window.addEventListener('resize', this.updateWidth);
            this.updateWidth();
        },
        data() {
            return {
                width: null,
            };
        },
        computed: {
            isMob: function () {
                return this.width <= mobBreakpoint;
            },
        },
        methods: {
            getTelHref: function (office) {
                let href = '#';

                if (office.fields.phone) {
                    href = 'tel:' + office.fields.phone;
                }

                return href;
            },
            getOfficeHref: function (office) {
                let href = '#';
                let lat = office.fields.coords.lat;
                let lng = office.fields.coords.lng;

                if (lat && lng) {
                    href = 'https://www.google.com/maps/place/' + lat + ',' + lng;
                }

                return href;
            },
            officeClickHandler: function (event) {
                if (!this.isMob) {
                    event.preventDefault();
                    let target = event.target;

                    if (!target.classList.contains('office_item')) {
                        target = target.closest('.office_item');
                    }

                    return this.$bus.$emit('officeClicked', {officeId: parseInt(target.getAttribute('data-office-id'))});
                }
            },
            updateWidth() {
                this.width = window.innerWidth;
            },
            getIconUrl: office => {
                return 'https:' + office.fields.icon.fields.file.url;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/mixins&vars.scss";

    .office {
        @include desktop(){
            &_item{
                cursor: pointer;
            }
        }
    }
</style>