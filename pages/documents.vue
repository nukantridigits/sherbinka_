<template>
    <div class="documents-page_wrapper indigo  default_page_layout">
        <div class="wrapper top">
            <div class="title_wrapper">
                <h1 class="title">
                    {{ post.title }}
                </h1>
            </div>
           <div class="description">
                {{ post.description }}
            </div>
        </div>

        <div class="documents_wrapper wrapper">
            <div class="documents">
                <DocumentGroup v-for="documentGroup of documentGroups" :document-group="documentGroup" :key="documentGroup.fields.id" />
            </div>
        </div>

        <PageContent :content="post.content"></PageContent>

    </div>
</template>

<script>
    import PageContent from '~/components/PageContent'
    import DocumentGroup from '~/components/DocumentGroup'
    import {createClient} from '~/plugins/contentful';

    const client = createClient();

    export default {
        name: 'Documents',
        scrollToTop: true,
        components: {
            PageContent,
            DocumentGroup
        },
        head() {
            return {
                title: this.post.title,
            }
        },
        async asyncData() {
            try {
                const content = await client.getEntries({
                    include: 2,
                    content_type: 'mainPage',
                    'fields.id': '4'
                });

                let post = content.items[0].fields;

                const docsContent = await client.getEntries({
                    content_type: 'documentGroup',
                });

                let docs = docsContent.items;

                return {
                    documentGroups: docs,
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

    .documents-page {
        &_wrapper {
            .documents {
                &_wrapper {
                    margin-bottom: 30px;
                }
            }
            .top {
                margin-bottom: 30px;
                @include mob {
                    margin-top: 95px;
                }
                @include desktop {
                    padding-left: 30px;
                }

                .title_wrapper {
                    margin-bottom: 13px;
                }
                .description {
                    @include desktop {
                        width: 60%;
                        line-height: 18px;
                    }
                }
            }
            @include mob {
                .description {
                    text-align: left;
                    padding: 0 24px;
                }
                .card-list {
                    flex-direction: column;
                    .card {
                        &:last-of-type {
                            margin-bottom: 0;
                        }
                    }
                }
            }
            @include desktop {
                padding-top: 146px;
                h1.title {
                    font-size: 24px;
                    line-height: 28px;
                    letter-spacing: 3px;
                }
            }
        }
    }
</style>