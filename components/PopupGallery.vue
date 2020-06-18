<template>
    <div class="popup_gallery card">
        <div class="popup_gallery_inner_wrapper">
            <div class="title">
                {{ slide.sys.createdAt | date }}
            </div>
            <div class="photo" :style="{'background-image': 'url(' + this.getImgUrl(slide) + ')'}">
            </div>
            <div
                    @click="hide"
                    class="popup_gallery_close_btn btn btn_round close-btn">
            </div>
        </div>
    </div>
</template>

<script>
    const monthsRusNamesGenetive = {
        '1': 'января',
        '2': 'февраля',
        '3': 'марта',
        '4': 'апреля',
        '5': 'мая',
        '6': 'июня',
        '7': 'июля',
        '8': 'августа',
        '9': 'сентября',
        '10': 'октября',
        '11': 'ноября',
        '12': 'декабря',
    };
    
    export default {
        name: 'PopupGallery',
        props: ['slide'],
        computed: {},
        methods: {
            getImgUrl: slide => {
                return 'https:' + slide.fields.file.url;
            },
            hide() {
                return this.$bus.$emit('hideGalleryPopup');
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
    @import "../assets/scss/mixins&vars.scss";

    .popup_gallery {
        margin-top: -50px;
        padding: 19px 50px 53px;
        background-color: #fff;
        height: auto;
        .title {
            color: $indigo;
            padding-bottom: 20px;
        }
        .photo {
            width: 960px;
            height: 630px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .popup_gallery_close_btn {
            background-image: url('~assets/icons/x_white.svg');
            left: calc(50% - 21px);
            position: absolute;
            background-size: cover;
            bottom: -56px;
            cursor: pointer;
        }
    }
</style>