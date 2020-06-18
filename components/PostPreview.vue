<template>
    <nuxt-link
            :class="['post-preview','card','card_sm','full-height', getColor(post)]"
            :style="getStyle(post)"
            :to="{ name: 'news-id', params: { id: post.fields.id}}">

        <div :class="['card_fade', getFadeClass(post), getColor(post)]"></div>

        <div class="card_content">
            <div class="date">
                {{ post.sys.createdAt | date }}
            </div>
            <div class="title">
                {{ post.fields.title }}
            </div>
            <template v-if="post.fields.previewText">
                <div v-html="post.fields.previewText.content['0'].content['0'].value" class="descr"></div>
            </template>

        </div>
    </nuxt-link>
</template>

<script>
    export default {
        name: "PostPreview",
        props: ['post'],
        computed: {},
        methods: {
            getColor(post) {
                let result = '';
                let color = post.fields.bgColor;

                switch (color) {
                    case true:
                        result = 'indigo';
                        break;
                    case false:
                        result = 'lima';
                        break;
                    default:
                        result = 'indigo';
                        break;
                }

                return result;
            },
            getFadeClass(post) {
                let result = '';
                let bg = post.fields.previewBg;
                switch (bg) {
                    case true:
                        result = 'bg_color';
                        break;
                    case false:
                        result = 'bg_gradient';
                        break;
                    default:
                        result = 'bg_color';
                        break;
                }

                return result
            },
            getStyle(post) {
                let bgImgProp = 'background-image';
                let result = bgImgProp + ': none';
                let previewImg = post.fields.hasOwnProperty('previewImg') ? post.fields.previewImg : null;

                if (previewImg !== null && !this.isEmpty(previewImg)) {
                    result = bgImgProp + ':url(https://' + previewImg.fields.file.url + ')';
                }

                return result;
            },
            isEmpty(obj) {
                return Object.keys(obj).length === 0;
            }
        },
        filters: {
            date: function (value) {
                if (!value) return '';
                let dateObj = new Date(value);
                return dateObj.getDate() + '.' + (dateObj.getMonth() + 1) + '.' + dateObj.getFullYear()
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "/../assets/scss/mixins&vars.scss";

    .post-preview {
        @include desktop {
            margin-right: 30px;
            &:nth-child(3n) {
                margin-bottom: 30px;
                margin-right: 0;
            }
        }
        .date {
            margin-bottom: 6px;
        }
        .card {
            &_fade {
                &.bg_gradient {
                    &.lima {
                        background: linear-gradient(180deg, rgba(187, 210, 152, 0.5) 23.23%, #A7C972 66.44%);
                    }
                    &.indigo {
                        background: linear-gradient(180.39deg, rgba(37, 60, 77, 0.53) 20.32%, #253C4D 71.21%);
                    }
                }
                &.bg_color {
                    &.lima {
                        background: $lima;
                    }
                    &.indigo {
                        background: $indigo;
                    }
                }
            }
        }
    }
</style>