<template>
    <div class="mortgage-page_wrapper default_page_layout">
        <div class="title_wrapper touch">
            <h1 class="title indigo">
                {{ post.title }}
            </h1>
        </div>

        <div class="calc-wrapper wrapper">
            <div ref="calc_widget" class="calc" id="calculator"></div>
        </div>

        <PageContent :content="post.content"></PageContent>
    </div>
</template>

<script>
    import PageContent from '~/components/PageContent'
    import {createClient} from '~/plugins/contentful';
    import 'assets/mortgage.css'

    const client = createClient();
    const calculatorOptions = {
        apiKey: '****************',
        excludedProduct: [], // продукт, который нужно исключить
        schema: {
            product: 4, // 4 новостройка
            realtyDiscount: false // оставить одно значение
        },
    };

    export default {
        scrollToTop: true,
        name: 'Mortgage',
        components: {
            PageContent
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
                    'fields.id': '8'
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
            domclick.mortgage.ready(function (mortgage) {
                mortgage(
                    'calculator',
                    {calculator: calculatorOptions},
                    {cssSuffix: 'universal'}
                );
            });
        },
        watch: {}
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/mixins&vars.scss";

    .mortgage-page {
        #calculator #domclick__signup-button {
            display: none !important;
        }

        @include mob {
            &_wrapper {
                padding-top: 95px;

                .title_wrapper {
                    margin-bottom: 18px;
                }

                .calc-wrapper {
                    margin-bottom: 30px;
                }
            }
        }

        @include tab {
            &_wrapper {
                .title_wrapper {
                    margin-bottom: 30px;
                }
            }
        }

        @include desktop {
            &_wrapper {
                padding-top: 151px;
            }

            #calculator {
                margin-bottom: 57px;
            }
        }
    }
</style>