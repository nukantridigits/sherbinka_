<template>
    <div class="posts-wrapper default_page_layout">
        <div class="news-page_wrapper">
            <div class="title_wrapper touch">
                <h1 class="title">
                    {{ post.title }}
                </h1>
            </div>

            <div class="card-list post-list row fsb wrapper">
                <PostPreview v-for="post of news" :key="post.fields.id" :post="post"/>

                <div class="pagination_wrapper">
                    <Paginate
                            ref="paginate"
                            :pageCount="totalPagesCount"
                            :clickHandler="getNewsQuery"
                            :page-class="'btn btn_round btn_indigo btn_sm'"
                            :prev-class="'arrow arrow_left'"
                            :next-class="'arrow arrow_right'"
                            :prevText="''"
                            :nextText="''"
                            :hide-prev-next="true"
                            :containerClass="'pagination'">
                    </Paginate>
                </div>
            </div>

            <PageContent :content="post.content"></PageContent>

        </div>
    </div>
</template>

<script>
    import PageContent from '~/components/PageContent'
    import PostPreview from '~/components/PostPreview'
    import {createClient} from '~/plugins/contentful'
    import {mapState} from 'vuex';
    import Paginate from 'vuejs-paginate/src/components/Paginate.vue';

    const client = createClient();
    const pageRange = 3;
    const POST_TYPE_NEWS = 'новость';

    export default {
        name: 'News',
        components: {
            PageContent, PostPreview, Paginate
        },
        head() {
            return {
                title: this.post.title,
            }
        },
        scrollToTop: true,
        computed: {
            ...mapState({
                news: state => state.modules.post.news.items,
                total: state => state.modules.post.news.total
            }),
            totalPagesCount: function () {
                return Math.ceil(this.total / pageRange);
            },
            skip: function () {
                return pageRange * (this.$refs.paginate.selected - 1);
            }
        },
        async asyncData({store, error}) {
            try {
                const news = await client.getEntries({
                    content_type: 'post',
                    'fields.type': POST_TYPE_NEWS,
                    limit: pageRange,
                    skip: 0,
                    order: '-fields.id'
                });

                store.dispatch('modules/post/setNews', news);

                const content = await client.getEntries({
                    include: 2,
                    content_type: 'mainPage',
                    'fields.id': '6'
                });

                let post = content.items[0].fields;

                return {
                    post: post,
                }
            } catch (e) {
                error(e)
            }
        },
        methods: {
            async getNewsQuery() {
                const news = await client.getEntries({
                    content_type: 'post',
                    'fields.type': POST_TYPE_NEWS,
                    limit: pageRange,
                    skip: this.skip,
                    order: '-fields.id'
                });

                this.$store.dispatch('modules/post/setNews', news);
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixins&vars.scss";

    .posts-wrapper {
        @include touch {
            padding-top: 95px;
            .title_wrapper {
                margin-bottom: 30px;
            }
        }

        @include desktop {
            padding-top: 120px;
        }

        .post-list {
            @include tab{
                .post-preview{
                    &.card{
                        &:last-of-type{
                            margin-bottom: 0;
                        }
                    }
                }
            }

            @include desktop {
                justify-content: flex-start;
            }
        }
    }
</style>