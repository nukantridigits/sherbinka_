<template>
    <div class="slick-slide-wrapper slide_developer">
        <a class="slide" :href="slide.fields.link" target="_blank">
            <div
                    class="slide_inner"
                    :style="{'background-image': 'url(' + this.getImgUrl(slide, device) + ')'}"
            >
            </div>
        </a>
        <a v-if="slide.fields.title"
                class="title indigo"
                :href="slide.fields.link"
                target="_blank">
                {{slide.fields.title}}
        </a>
    </div>
</template>

<script>
    import SlideBaseComponent from './SlideBaseComponent';

    export default {
        name: 'SlideForDevelopeSlider',
        extends: SlideBaseComponent
    }
</script>