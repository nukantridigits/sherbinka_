<template>
    <div :class="[
                    'slider_wrapper',
                     {'full-width-desktop': this.slider.isFullWidthOnDesktop},
                     {'top-slider': this.slider.isTopSlider},
                     {'hide-content': !this.slider.isShowText},
                     {'slider_sm': this.slider.slidesToShow === 3}
                 ]">

        <template v-if="this.slider.title">
            <h2 class="wrapper slider_title">
                {{this.slider.title}}
            </h2>
        </template>

        <div class="slick_slider_comp">
            <Slick :is="slickComp" ref="slick"
                   :options="slickOptions"
                   @edge="this.handleEdge"
                   @afterChange="this.handleAfterChange"
            >
                <SlideWithTextLink
                        v-if="isWithTextLinkType(slider.type[0])"
                        v-for="slide of this.slider.slides"
                        :key="makeId()"
                        :slide="slide"
                        :isFullWidthOnDesktop="slider.isFullWidthOnDesktop"
                        :isFullWidthOnTouch="slider.isFullWidthOnTouch"
                />

                <SlideDefault
                        v-if="isDefaultType(slider.type[0])"
                        v-for="slide of this.slider.slides"
                        :key="makeId()"
                        :slide="slide"
                        :isFullWidthOnDesktop="slider.isFullWidthOnDesktop"
                        :isFullWidthOnTouch="slider.isFullWidthOnTouch"
                />

                <SlideDeveloper
                        v-if="isDeveloperType(slider.type[0])"
                        v-for="slide of this.slider.slides"
                        :key="makeId()"
                        :slide="slide"
                        :isFullWidthOnDesktop="slider.isFullWidthOnDesktop"
                        :isFullWidthOnTouch="slider.isFullWidthOnTouch"
                />

                <SlideLink v-if="isLinkType(slider.type[0])"
                           v-for="slide of this.slider.slides"
                           :key="makeId()"
                           :slide="slide"
                           :isFullWidthOnDesktop="slider.isFullWidthOnDesktop"
                           :isFullWidthOnTouch="slider.isFullWidthOnTouch"
                />

                <SlideConstructionProgress
                        v-if="isConstructionProgress(slider.type[0])"
                        v-for="slide of this.slider.slides"
                        :key="makeId()" :slide="slide"
                        :isFullWidthOnDesktop="slider.isFullWidthOnDesktop"
                        :isFullWidthOnTouch="slider.isFullWidthOnTouch"
                />
            </Slick>
            <div class="slick_navigation_wrapper">
                <ul class="slick_navigation">
                    <li class="arrow arrow_left" @click="prev"></li>
                    <li class="arrow arrow_right" @click="next"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import SlideDefault from './Slide/SlideDefault'
    import SlideDeveloper from './Slide/SlideDeveloper'
    import SlideLink from './Slide/SlideLink'
    import SlideWithTextLink from './Slide/SlideWithTextLink'
    import SlideConstructionProgress from './Slide/SlideConstructionProgress'

    const SLIDE_DEFAULT = 'default';
    const SLIDE_DEVELOPER = 'slideDeveloper';
    const SLIDE_LINK = 'slideLink';
    const SLIDE_WITH_TEXT_LINK = 'slideWithTextLink';
    const SLIDE_CONSTRUCTION_PROGRESS = 'slideConstructionProgress';


    export default {
        name: "SlickSlider",
        props: ['slider'],
        components: {
            SlideDefault,
            SlideDeveloper,
            SlideLink,
            SlideWithTextLink,
            SlideConstructionProgress,
            Slick: () => import('vue-slick')
        },
        data() {
            return {
                currentSlide: 0,
                slickComp: '',
                slickOptions: {
                    infinite: false,
                    arrows: false,
                    dots: true,
                    slidesToShow: this.slider.slidesToShow,
                    slidesToScroll: this.slider.slidesToScroll,
                    autoplay: this.slider.autoplay,
                    autoplaySpeed: this.slider.autoplaySpeed ? this.slider.autoplaySpeed : 7000,
                    useTransform: true,
                    draggable: !this.slider.draggable,
                    responsive: [{
                        breakpoint: 768,
                        settings: {
                            infinite: false,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: false,
                            autoplay: false,
                            centerMode: !this.slider.isFullWidthOnTouch,
                            centerPadding: !this.slider.isFullWidthOnTouch ? '29px' : '0',
                        }
                    },
                        {
                            breakpoint: 1024,
                            settings: {
                                infinite: false,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                dots: false,
                                autoplay: false,
                                centerMode: !this.slider.isFullWidthOnTouch,
                                centerPadding: !this.slider.isFullWidthOnTouch ? '69px' : '0',
                            }
                        }]
                },
            }
        },
        methods: {
            handleAfterChange(event, slick, currentSlide) {
                this.currentSlide = currentSlide;
            },
            handleEdge(event, slick, direction) {
                let next = direction !== 'right' ? 0 : this.slider.slides.length - 1;

                slick.goTo(next, false);
            },
            makeId() {
                let text = '';
                let possible = 'a5bc7def2ghij90klmn3opq4rst1uvwx8yz';

                for (let i = 0; i < 16; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));

                return text;
            },
            prev() {
                let slick = this.$refs.slick;

                if (this.currentSlide === 0) {
                    let next = this.slider.slides.length - 1;

                    return slick.goTo(next, false);
                }

                return slick.prev();
            },
            next() {
                let first = 0;
                let slick = this.$refs.slick;
                let last = this.slider.slides.length - 1;

                if (this.currentSlide === last) {
                    return slick.goTo(first, false);
                }

                return slick.next();
            },
            isDefaultType: type => {
                return type === SLIDE_DEFAULT;
            },
            isDeveloperType: type => {
                return type === SLIDE_DEVELOPER;
            },
            isLinkType: type => {
                return type === SLIDE_LINK;
            },
            isWithTextLinkType: type => {
                return type === SLIDE_WITH_TEXT_LINK;
            },
            isConstructionProgress: type => {
                return type === SLIDE_CONSTRUCTION_PROGRESS;
            },
        },
        mounted: function () {
            this.$nextTick(function () {
                this.slickComp = 'Slick'
            })
        },
    }
</script>