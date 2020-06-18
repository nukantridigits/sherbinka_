<template>
    <div class="text_block">
        <h2 class="text_block_title">
            {{text.fields.title}}
        </h2>
        <template v-if="text.fields.mainContent">
            <div class="text_block_bottom">
                <div class="text_block_descr">
                    {{text.fields.descr}}
                </div>
                <div :class="['text_block_content', {max: maximize}]">
                    <div v-for="(paragraph) in text.fields.mainContent.content">
                        <div class="paragraph" v-for="node in paragraph.content">
                            <div v-html="node.value"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!maximize" class="text_block_more touch" @click="textBlockTrigger">
                Читать дальше
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        props: ['text'],
        data() {
            return {
                maximize: false
            }
        },
        methods: {
            textBlockTrigger: function () {
                return this.maximize = !this.maximize
            },
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/mixins&vars.scss";

    .wrapper{
        &.text_block_wrapper{
            @include touch{
                margin: 20px auto;
            }
            @include desktop{
                margin: 50px auto 43px;
            }
        }
    }
</style>

<style lang="scss" scoped>
    @import "../assets/scss/mixins&vars.scss";

    .text_block {
        color: $indigo;
        display: flex;
        flex-direction: column;
        &_title{
            font-weight: 800;
        }
        &_descr {
            font-weight: bold;
        }
        @include touch {
            padding-left: 20px;
            &_title {
                margin-bottom: 5px;
            }
            &_descr {
                margin-bottom: 13px;

            }
            &_bottom {
                padding-bottom: 9px;
            }
            &_content{
                max-height: 107px;
                overflow: hidden;
                text-overflow: ellipsis;
                transition: max-height .2s;

                &.max{
                    max-height: initial;
                }
            }
            &_more {
                color: $lima;
                &::after {
                    content: '>';
                    margin-left: 4px;
                    color: $lima;
                }
            }
        }
        @include tab{
            &_title{
                margin-bottom: 17px;
            }
            &_content{
                max-height: none;

            }

            &_more{
                display: none;
            }
        }
        @include desktop {
            padding: 0 30px;
            &_title {
                margin-bottom: 27px;
            }
            &_bottom {
                display: flex;
            }

            &_descr {
                min-width: 270px;
                font-size: 14px;
                line-height: 18px;
                letter-spacing: 0.371962px;
                margin-right: 84px;
                font-weight: bold;
            }
            &_content{
                font-size: 15px;
                line-height: 18px;
                letter-spacing: 0.5px;
            }
        }
    }

</style>