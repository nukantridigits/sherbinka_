<template>
    <div id="main-wrapper" :class="routeClass">
        <div class="header-wrapper wrapper">
            <Header/>
        </div>
        <div class="content">
            <nuxt/>
        </div>
        <div class="footer-wrapper wrapper">
            <Footer/>
        </div>
    </div>
</template>

<script>
    import Header from '~/components/Header.vue'
    import Footer from '~/components/Footer.vue'


    export default {
        components: {
            Header, Footer
        },
        head() {
            return {
                script: [
                    {src: '//pb5822.profitbase.ru/assets/js/sw.js', async: true, defer: true},
                    {src: 'https://cdn.domclick.ru/widget/mortgage/inject.js', async: true, defer: true}
                ],
            }
        },
        computed: {
            routeClass: function () {
                let route = this.$route.path;
                console.log('default-layout router:', route);
                if (route === '/') {
                    route = 'index';
                } else {
                    route = route.substring(1);
                }

                let result = route + '-page';

                if (route === '404') {
                    result = 'page-404';
                }

                return result;
            }
        },
        methods: {},
    }
</script>