<template>
    <div class="about-page_wrapper">
        <div class="title_wrapper touch">
            <h1 class="title">
                {{ post.title }}
            </h1>
        </div>

        <PageContent :content="post.content"></PageContent>

    </div>
</template>

<script>
    import PageContent from '~/components/PageContent'
    import {createClient} from '~/plugins/contentful';

    const client = createClient();

    export default {
        name: 'About',
        scrollToTop: true,
        components: {
            PageContent
        },
        head() {
            return {
                title: this.post.title,
            }
        },
        async asyncData({store, error}) {
            try {
                const content = await client.getEntries({
                    include: 2,
                    content_type: 'mainPage',
                    'fields.id': '9'
                });

                let post = content.items[0].fields;


                return {
                    post: post,
                }
            } catch (e) {
                error(e)
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/mixins&vars.scss";

    .about-page {
        &_wrapper {
            .card_list_top_wrapper {
                position: relative;
                z-index: 1;
            }

            @include mob {
                .title_wrapper {
                    top: 100px;
                }
            }

            @include touch {
                .content {
                    margin-top: 0;
                }
                .title_wrapper {
                    position: absolute;
                    z-index: 10;
                    justify-content: center;
                    width: 100%;
                }
                .card_list_top_wrapper {
                    margin-top: -45px;
                }
                .text_block_wrapper {
                    margin: 30px auto;
                    & > div {
                        line-height: 15px;
                    }
                }
            }

            @include tab {
                .title_wrapper {
                    top: 133px;
                }
            }

            @include desktop {
                .card_list_top_wrapper {
                    margin-top: -70px;
                }
                .card-list {
                    &.top {
                        .card {
                            &:first-of-type {
                                margin-bottom: 30px;
                            }
                        }
                    }
                }
                .about_text_block_wrapper {
                    margin: 80px auto 60px;
                }
            }
        }
    }
</style>