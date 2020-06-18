<template>
    <div class="slick-slide-wrapper slide_with_text_link">
        <div class="slide">
            <div
                 class="slide_inner"
                 :style="{'background-image': isTouch ? 'url(' + this.getImgUrl(slide,device) + ')': ''}"
            >
                <template v-if="!isTouch">
                    <v-lazy-image :src="this.getImgUrl(slide, device)" class="slide_desktop_image" />
                </template>
                <div class="slide_content">
                    <h2 v-if="slide.fields.title" class="title">
                        {{slide.fields.title}}
                    </h2>

                    <template v-if="slide.fields.description">
                        <div v-html="slide.fields.description.content['0'].content['0'].value" class="descr"></div>
                    </template>
                    <nuxt-link v-if="slide.fields.link && slide.fields.linkText"
                               class="link"
                               :to="slide.fields.link">
                        {{slide.fields.linkText}}
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SlideBaseComponent from './SlideBaseComponent';

    export default {
        name: 'SlideWithTextLink',
        extends: SlideBaseComponent
    }
</script>