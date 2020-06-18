<template>
    <div class="index-page_wrapper">
        <div class="greeting">
            <v-lazy-image
                    :src="require('~/static/index_greeting.png')"
                    :src-placeholder="require('~/static/index_greeting.png?lqip')"
                    class="greeting_img"
            ></v-lazy-image>
            <div class="wrapper">
                <div class="title_wrapper">
                    <h1 class="title indigo">
                        {{ post.title }}
                    </h1>
                </div>
            </div>
        </div>

        <div class="apartment_filter_wrapper wrapper">
            <ApartmentFilter></ApartmentFilter>
        </div>

        <PageContent :content="post.content"></PageContent>
    </div>
</template>

<script>
    import ApartmentFilter from '~/components/ApartmentFilter/ApartmentFilter'
    import PageContent from '~/components/PageContent'
    import {createClient} from '~/plugins/contentful'
    import {mapState} from 'vuex'
    import houseList from '~/assets/houseList.js'
    import VLazyImage from "v-lazy-image"


    const projectId = '*****';
    const apiKey = '*****';
    const profitbaseApi = {
        url: 'https://pb5822.profitbase.ru/api/v4/json/',
        authParams: {
            type: 'api-app',
            credentials: {
                pb_api_key: apiKey
            }
        },
    };

    const axiosConfig = {
        headers: {
            'Accept': 'application/json'
        }
    };

    const client = createClient();

    export default {
        scrollToTop: true,
        name: 'IndexPage',
        components: {
            ApartmentFilter, PageContent, VLazyImage
        },
        head() {
            return {
                title: this.post.title,
            }
        },
        data() {
            return {
                token: null,
                loading: true
            };
        },
        async asyncData({store, error}) {
            try {
                //get page content:
                const content = await client.getEntries({
                    include: 2,
                    content_type: 'mainPage',
                    'fields.id': '0'
                });

                let post = content.items[0].fields;
                //////////////////////////////////
                let filter = {
                    "flat": [0, 1, 2, 3],
                    "price": [1831800, 6507200],
                    "area": [21, 78]
                };

                store.dispatch('setApartmentsFilter', filter);
                store.dispatch('setHouseList', houseList);

                return {
                    post: post,
                }
            } catch (e) {
                error(e)
            }
        },
        computed: {
            ...mapState({
                filter: state => state.apartmentsFilter,
            }),
        },
        methods: {},
        created() {
        },
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/mixins&vars.scss";

    .index-page {
        &_wrapper {
            .greeting {
                position: relative;
                &_img{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                }
                .title_wrapper{
                    position: relative;
                }
            }
        }

        .apartment_filter {
            background-color: #fff;
        }

        @include mob() {
            .apartment_filter {
                &_wrapper {
                    margin-top: -114px;
                }
            }

            .title_wrapper {
                z-index: 10;
                justify-content: center;
                width: 100%;
                h1.title {
                    font-size: 18px;
                }
            }
            .greeting {
                padding-top: 120px;
                text-align: center;
                background-size: auto;
                height: 513px;
            }
            .apartment_filter_wrapper {
                margin-bottom: 20px;
            }
        }

        @include touch {
            .greeting {
                top: 0;
                width: 100%;
            }
            .apartment_filter {
                &_wrapper {
                    margin-bottom: 20px;
                }
            }
            .video {
                &_wrap {
                    min-height: 513px;
                    max-height: 513px;
                    max-width: 1023px;
                    margin: 0 auto;
                    position: relative;
                    overflow: hidden;
                }
                &_bg {
                    object-fit: cover;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    z-index: 0;
                }
            }
        }

        @include tab {
            .greeting {
                padding-top: 200px;
                background-size: cover;
                .title {
                    font-size: 40px;
                    line-height: 45px;
                    letter-spacing: 1.5px;
                    opacity: 0.96;
                }
            }
            .apartment_filter {
                &_wrapper {
                    margin-top: -190px;
                }
            }
        }

        @include tablet-desktop {
            &_wrapper {
                .greeting {
                    height: 100vh;
                    .title {
                        text-transform: none;
                    }
                }
                .apartment_filter {
                    &_wrapper {
                        margin-bottom: 30px;
                    }
                }
            }
        }

        @include desktop {
            .video {
                &_wrap {
                    opacity: 0.3;
                    position: absolute;
                    z-index: -999;
                    min-height: 800px;
                    max-height: 800px;
                    display: block;
                    max-width: 2560px;
                    width: 100%;
                    overflow: hidden;
                }
                &_bg {
                    display: block;
                    position: relative;
                    z-index: 0;
                    margin: 0 auto;
                    width: 100%;
                }
            }
            &_wrapper {
                .greeting {
                    padding: 205px 0 407px;
                    .title {
                        width: 96.2%;
                        padding-left: 35px;
                        //font-family: RotondaC, sans-serif;
                        font-size: 55px;
                        line-height: 60px;
                        letter-spacing: 1.5px;

                    }
                }
                .apartment_filter {
                    &_wrapper {
                        margin-top: -168px;
                    }
                }
            }
        }
    }
</style>