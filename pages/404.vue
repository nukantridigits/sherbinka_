<template>
    <div class="wrapper_404">
        <div class="inner_wrapper wrapper">
            <div class="title_wrapper">
                <h1 class="title_xxl indigo">
                    {{ post.title }}
                </h1>
            </div>

            <div class="text_wrapper">
                <h2 class="msg_sorry indigo msg_wrapper">
                    извините, мы не можем найти страницу, которую вы ищете
                </h2>

                <div class="apartment_choose">
                    <h2 class="msg_apartment_choose white msg_wrapper">
                        вы можете вернуться к покупке квартир
                    </h2>
                    <div class="btn-wrapper">
                        <nuxt-link to="/apartment-choose" class="btn btn_lg btn_indigo btn_rect">
                            подобрать квартиру
                        </nuxt-link>
                    </div>
                </div>
            </div>

            <PageContent :content="post.content"></PageContent>

        </div>
    </div>
</template>

<script>
    import {createClient} from '~/plugins/contentful';
    import PageContent from '~/components/PageContent';

    const client = createClient();

    export default {
        name: 'page404',
        props: ['error'],
        scrollToTop: true,
        head() {
            return {
                title: this.post.title,
            }
        },
        components: {
            PageContent
        },
        asyncData: async function ({store, error}) {
            try {
                const content = await client.getEntries({
                    include: 2,
                    content_type: 'mainPage',
                    'fields.id': '2'
                });

                let post = content.items[0].fields;

                return {
                    post: post,
                }
            } catch (e) {
                error(e)
            }
        },
        mounted() {
            this.$router.replace('/404');
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/mixins&vars.scss";

    .wrapper_404 {
        .msg_wrapper {
            margin: 0 auto;
            text-align: center;
        }
        @include mob {
            .inner_wrapper {
                width: 100%;
            }
            .title_wrapper {
                padding-top: 140px;
                margin-bottom: 20px;
            }

            .msg_wrapper {
                width: 234px;
            }

            .card-list {
                .card {
                    &:last-of-type {
                        margin-bottom: 0;
                    }
                }
            }
            .msg_sorry {
                margin-bottom: 47px;
            }

            .msg_apartment_choose {
                margin-bottom: 21px;
            }

            .btn-wrapper {
                margin-bottom: 30px;
            }

            .footer {
                &-wrapper {
                    padding-bottom: 50px;
                }
            }
        }
        @include tab {
            .text_wrapper {
                margin-bottom: 30px;
            }
            .msg_sorry {
                width: 633px;
                margin-bottom: 124px;
            }
            .msg_apartment_choose {
                width: 429px;
                margin-bottom: 25px;

            }
        }
        @include desktop {
            .text_wrapper {
                margin-bottom: 60px;
            }
            .msg_sorry {
                width: 633px;
                margin-bottom: 124px;
            }
            .msg_apartment_choose {
                width: 429px;
                margin-bottom: 20px;
            }
        }
        .title {
            &_wrapper {
                display: flex;
                justify-content: center;
                @include tab {
                    padding: 223px 0 30px;
                }
                @include desktop {
                    padding: 207px 0 30px;
                }
            }
        }
        .footer {
            margin-bottom: 0;
        }
    }
</style>