<template>
    <div class="developer-page_wrapper  default_page_layout">
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
        name: 'Developer',
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
                    'fields.id': '12'
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

    .developer-page {
        h2 {
            color: $indigo;
        }
        &_wrapper {
            .title_wrapper {
                margin-bottom: 23px;
            }
            @include mob {
                padding-top: 100px;
            }
            @include desktop {
                padding-top: 151px;
            }
        }

        @include touch() {
            .content {
                margin-top: 0;
            }
        }
    }
</style>