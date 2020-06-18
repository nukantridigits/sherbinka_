<template>

    <div class="lottie_wrapper" :style="getStyle()" ref="lottieContainer"></div>
</template>

<script>
    import lottie from 'lottie-web';
    export default {
        props: {
            options: {
                type: Object,
                required: true
            },
            height: Number,
            width: Number,
        },
        methods: {
            getStyle: function () {
                return 'width:' + this.width + 'px;height:' + this.height + 'px';
            },
        },
        mounted () {
            // console.log(this.options.animationData.default);
            this.anim = lottie.loadAnimation({
                    container: this.$refs.lottieContainer,
                    renderer: 'svg',
                    loop: false,
                    autoplay: false,
                    animationData: this.options.animationData.default,
                    rendererSettings: this.options.rendererSettings
                }
            );
            this.$emit('animCreated', this.anim)
        }
    }
</script>