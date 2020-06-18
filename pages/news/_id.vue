<template>
    <div class="post-wrapper default_page_layout">
        <div class="title_wrapper wrapper">
            <h1 class="title">
                {{ post.title }}
            </h1>
        </div>

        <PageContent :content="post.content"></PageContent>

    </div>
</template>

<script>
    import {createClient} from '~/plugins/contentful'
    import PageContent from '~/components/PageContent'

    const client = createClient();

    export default {
        name: "NewsPost",
        scrollToTop: true,
        components: {
            PageContent
        },
        head() {
            return {
                title: this.post.title,
            }
        },
        async asyncData({params, error}) {
            try {
                const content = await client.getEntries({
                    include: 2,
                    content_type: 'post',
                    'fields.id': params.id
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
    @import "../../assets/scss/mixins&vars.scss";

    .post-wrapper {
        @include touch {
            padding-top: 82px;
            .title_wrapper {
                margin-bottom: 10px;
            }
        }
        @include desktop {
            &:not(.page) {
                padding-top: 163px;
            }
            .title_wrapper {
                margin-bottom: 60px;
                h1 {
                    &.title {
                        color: $indigo;
                        text-transform: none;
                    }
                }
            }
        }
    }
</style>