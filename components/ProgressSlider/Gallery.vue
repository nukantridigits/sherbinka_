<template>
        <div class="gallery_wrapper">
            <div :class="['photo_item',{'no-margin': reportsList.length === 1}]"
                 v-for="photo of reportsList" @click="showGalleryPopup(photo)"
            >
                <div class="photo_title">
                    {{ photo.sys.createdAt | date }}
                </div>
                <div
                        class="photo_img"
                        :style="{'background-image': 'url(' + getImgUrl(photo) + ')'}"
                >
                </div>
            </div>
        </div>
</template>

<script>
    import monthsRusNamesGenetive from '~/static/monthRus.json';

    export default {
        props: ['reportsList'],
        name: 'Gallery',
        methods: {
            getImgUrl: img => {
                return 'https:' + img.fields.file.url;
            },
            showGalleryPopup (slide) {
                return this.$bus.$emit('showGalleryPopup', {slide: slide});
            }
        },
        filters: {
            date: function (value) {
                if (!value) return '';
                let dateObj = new Date(value);
                return dateObj.getDate() + ' ' + monthsRusNamesGenetive[(dateObj.getMonth() + 1)];
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixins&vars.scss";

    .gallery_wrapper {
        .photo {
            &_item {
                &.no-margin{
                    margin-right: 0;
                }
            }
            &_title {
                line-height: 18px;
                color: $indigo;
                letter-spacing: 0.5px;
                padding-bottom: 5px;
            }
            &_img {
                border-radius: 10px;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
            }
        }
        @include touch() {
            display: flex;
            justify-content: center;
            margin: 15px 0 20px;
            .photo {
                &_item {

                }
                &_title {

                }
                &_img {
                    height: 86.252vw;
                    width: 86.252vw;
                }
            }
        }

        @include mob() {
            .photo {
                &_item {
                }
                &_title {
                    font-size: 10px;
                    line-height: 12px;
                    padding: 0 0 5px 20px;
                }
                &_img {

                }
            }
        }

        @include tab() {
            margin-bottom: 38px;
            .photo {
                &_item {

                }
                &_title {
                    font-size: 14px;
                    padding-bottom: 10px;
                }
                &_img {

                }
            }
        }

        @include desktop() {
            width: 960px;
            display: flex;
            margin: -2px auto 0;
            flex-wrap: wrap;
            justify-content: center;
            .photo {
                &_item {
                    cursor: pointer;
                    margin: 0 30px 30px 0;
                    &:nth-child(3n) {
                        margin-right: 0;
                    }
                }
                &_title {
                    padding: 0 0 17px 30px;
                }
                &_img {
                    width: 300px;
                    height: 300px;
                }
            }
        }
    }
</style>