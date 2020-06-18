import axios from 'axios'

const nodeExternals = require('webpack-node-externals');
const config = require('./contentful.json');

export default {
    generate: {
        routes: function () {
            let news = axios.get('https://cdn.contentful.com/spaces/' + config.CTF_SPACE_ID + '/environments/master/entries?content_type=post&fields.type=%D0%BD%D0%BE%D0%B2%D0%BE%D1%81%D1%82%D1%8C&select=fields.id&access_token=' + config.CTF_CDA_ACCESS_TOKEN)
                .then((res) => {
                    return res.data.items.map((item) => {
                        return '/news/' + item.fields.id
                    })
                });

            let pages = axios.get('https://cdn.contentful.com/spaces/' + config.CTF_SPACE_ID + '/environments/master/entries?content_type=post&fields.type=%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0&select=fields.slug&access_token=' + config.CTF_CDA_ACCESS_TOKEN)
                .then((res) => {
                    return res.data.items.map((item) => {
                        return '/pages/' + item.fields.slug
                    })
                });

            return Promise.all([news, pages]).then(values => {
                return values.join().split(',');
            })
        }
    },
    env: {
        CTF_SPACE_ID: config.CTF_SPACE_ID,
        CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
        CTF_MAIN_PAGE_ID: config.CTF_MAIN_PAGE_ID,
        CTF_ENVIRONMENT: config.CTF_ENVIRONMENT
    },
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ],
        script: [
            {src: '//pb5822.profitbase.ru/assets/js/sw.js', async: true, defer: true},
            {src: 'https://cdn.domclick.ru/widget/mortgage/inject.js', async: true, defer: true},
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#253C4D'},
    /*
    ** Global CSS
    */
    css: [
        // '~/assets/fonts/RotondaC/stylesheet.css',
        '~/assets/fonts/TTFirs/stylesheet.css',
        '~assets/mortgage.css',
        '~assets/slick.css',
        '~/assets/scss/app.scss'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        { src: '~/plugins/intersection-observer', ssr: false },
        '~/plugins/bus',
        {src: '~/plugins/google-maps', ssr: true},
        {src: '~/plugins/pbwidget-watcher', mode: 'client'},
        '~/plugins/vue-lazy-image',
        { src: '~/plugins/masked-input', ssr: false },
        { src: '~/plugins/vue-input-mask', ssr: false }
    ],

    /*
    ** Nuxt.js dev-modules
    */
    devModules: [],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@bazzite/nuxt-optimized-images',
        [
            'vue-currency-input/nuxt',
            {
                globalOptions: {
                    currency: 'RUB',
                    locale: 'ru',
                    precision: 0
                }
            }
        ]
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {},

     optimizedImages: {
         optimizeImages: true
     },

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        vendor: ['axios'],
        devtools: true,
        extend(config, {isDev, isClient}) {
            if (isDev) {
                config.devtool = 'eval-source-map'  // Something you like
            }
        },
        transpile: [/^vue2-google-maps($|\/)/],
        extractCSS: true,
        babel: {
            presets: function ({isServer}, [preset, options]) {

                const r = [
                    [
                        preset, {
                        buildTarget: isServer ? 'server' : 'client',
                        ...options
                    }]
                    // [ Other presets ]
                ];

                r[0][1].targets = {
                    "browsers": ["> 1%", "last 2 versions"],
                    ie: 11
                };

                r[0][1].polyfills = [
                    'es6.array.iterator',
                    'es6.promise',
                    'es6.object.assign',
                    'es6.symbol',
                    'es6.array.find',
                    'es6.array.from',
                    'es7.promise.finally',
                    'es7.object.entries',
                ];

                return r;
            },
            plugins: ['@babel/plugin-transform-runtime']
        }
    },
    router: {
        scrollBehavior: async (to, from, savedPosition) => {
            if (savedPosition) {
                return savedPosition
            }

            const findEl = async (hash, x) => {
                return document.querySelector(hash) ||
                    new Promise((resolve, reject) => {
                        if (x > 50) {
                            return resolve()
                        }
                        setTimeout(() => {
                            resolve(findEl(hash, ++x || 1))
                        }, 100)
                    })
            };

            if (to.hash) {
                let el = await findEl(to.hash);
                if ('scrollBehavior' in document.documentElement.style) {
                    return window.scrollTo({top: el.offsetTop - 150, behavior: 'smooth'})
                } else {
                    return window.scrollTo(0, el.offsetTop - 150)
                }
            }

            return {x: 0, y: 0}
        },
        extendRoutes(routes, resolve) {
            routes.push({
                name: 'custom',
                path: '*',
                component: resolve(__dirname, 'pages/404.vue')
            })
        },
        linkPrefetchedClass: 'nuxt-link-prefetched'
    }
}