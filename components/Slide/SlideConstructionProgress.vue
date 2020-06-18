<template>
    <div class="slick-slide-wrapper slide_construction_progress" @click="showGalleryPopup(slide)">
        <div class="slide">
            <div
                    class="slide_title indigo"
            >
                {{ slide.sys.createdAt | date }}
            </div>

            <div
                    class="slide_inner"
                    :style="{'background-image': 'url(' + this.getProgressImageUrl(slide) + ')'}"
            >
            </div>
        </div>

    </div>
</template>

<script>
    import monthsRusNamesGenetive from '~/static/monthRus.json';

    export default {
        name: 'SlideForConstructionProgressSlider',
        props: ['slide'],
        computed: {},
        methods: {
            getProgressImageUrl: slide => {
                return 'https:' + slide.fields.file.url;
            },
            showGalleryPopup(slide) {
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