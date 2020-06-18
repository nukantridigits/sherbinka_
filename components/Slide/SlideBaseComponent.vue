<template></template>

<script>
    import VLazyImage from "v-lazy-image"

    const tabBreakpoint = 768;
    const desktopBreakpoint = 1024;
    const touchBreakpoint = desktopBreakpoint - 1;

    export default {
        name: "SlideBaseComponent",
        components: {
            VLazyImage
        },
        props: {
            slide:{
                type: Object,
            },
            isFullWidthOnDesktop: {
                type: Boolean,
                default: false
            },
            isFullWidthOnTouch: {
                type: Boolean,
                default: false
            },
        },
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
            isTouch: function () {
                return this.width <= touchBreakpoint;
            },
            //определяем устройство по ширине viewport
            device: function () {
                let result = {
                    type: null,
                };

                if (this.width < tabBreakpoint) {
                    result.type = 'mob';
                } else if (this.width >= tabBreakpoint && this.width < desktopBreakpoint) {
                    result.type = 'tab';
                } else if (this.width >= desktopBreakpoint) {
                    result.type = 'desktop';
                }

                return result;
            },
        },
        methods: {
            getImgUrl: (slide, device, isFullWidthOnDesktop, isFullWidthOnTouch, isTouch) => {
                let type = device.type;

                let queryParams = {
                    w: null,
                    h: null
                };

                    if ((isTouch) && isFullWidthOnTouch === true) {
                        queryParams.w = 1024;
                        queryParams.h = 768;
                    } else {
                        if (type === 'mob') {
                            queryParams.w = 353;
                            queryParams.h = 388;
                        }

                        if (type === 'tab') {
                            queryParams.w = 630;
                            queryParams.h = 630;
                        }
                    }

                if (type === 'desktop') {
                    if(isFullWidthOnDesktop){
                        queryParams.w = 1920;
                        queryParams.h = 1080;
                    } else {
                        queryParams.w = 960;
                        queryParams.h = 600;
                    }
                }

                return 'https:' + slide.fields.bg.fields.file.url + '?w=' + queryParams.w + '&h=' + queryParams.h;
            },
            getIconUrl: slide => {
                let iconUrl = '';

                if (slide.fields.isIcon) {
                    iconUrl = 'https:' + slide.fields.icon.fields.file.url;
                }

                return iconUrl;
            },
            updateWidth() {
                this.width = window.innerWidth;
            },
        },
    }
</script>