<template>
    <nuxt-link v-if="card.fields.isLink"
               :to="card.fields.link"
               :class="
               [
                    'card', classList, 'card_link',
                    {'full-height': card.fields.isFullHeightContent}
               ]"
               :style="{'background-image': 'url(' + this.getImgUrl(card,device) + ')'}">

        <div v-if="card.fields.isIcon"
             class="card_icon"
             :style="{'background-image': 'url(' + this.getIconUrl(card) + ')'}"></div>

        <div v-if="card.fields.isFade"
             class="card_fade">
        </div>

        <div class="card_content">
            <div class="title">
                {{card.fields.title}}
            </div>

            <template v-if="card.fields.description">
                <div class="descr" v-html="card.fields.description.content['0'].content['0'].value"></div>
            </template>

            <div class="link" v-if="card.fields.textMore">
                {{ card.fields.textMore }}
            </div>
        </div>
    </nuxt-link>
    <div v-else :class="[
                            'card', classList,
                            {'full-height': card.fields.isFullHeightContent}
                        ]"
         :style="{'background-image': 'url(' + this.getImgUrl(card,device) + ')'}">
        <div v-if="card.fields.isIcon"
             class="card_icon"
             :style="{'background-image': 'url(' + this.getIconUrl(card) + ')'}"></div>

        <div v-if="card.fields.isFade"
             class="card_fade"></div>

        <div class="card_content">
            <div class="title">
                {{card.fields.title}}
            </div>
            <template v-if="card.fields.description">
                <div class="descr" v-html="card.fields.description.content['0'].content['0'].value"></div>
            </template>
        </div>
    </div>

</template>

<script>
    const tabBreakpoint = 768;
    const desktopBreakpoint = 1024;

    export default {
        props: ['card'],
        data() {
            return {
                width: null,
            };
        },
        computed: {
            device: function () {
                let result = {
                    type: null,
                };

                if (this.width < tabBreakpoint) {
                    result.type = 'mob';
                } else if (this.width >= tabBreakpoint && this.width < desktopBreakpoint) {
                    result.type = 'tab';
                } else if (this.width >= desktopBreakpoint) {
                    result.type = 'desktop';
                }

                return result;
            },
            classList: function () {
                let someClass = '';
                let props = this.card.fields;
                let result = ['card_' + props.size];

                if (props.faderColor) {
                    if (!props.isFade && !props.isBg) {
                        someClass = props.faderColor
                    } else {
                        someClass = 'card_' + props.faderColor;
                    }
                }

                if (!props.faderColor && !props.isFade && !props.isBg) {
                    someClass = 'no-bg'
                }

                result.push(someClass);

                return result;
            }
        },
        methods: {
            getImgUrl: (card, device) => {
                let type = device.type;
                let size = card.fields.size;

                let queryParams = {
                    w: null,
                    h: null
                };

                if (type === 'mob') {
                    queryParams.w = 662;
                    if (size !== 'xxl') {
                        queryParams.h = 276;
                    } else {
                        queryParams.h = 457;
                    }
                }

                if (type === 'tab') {
                    queryParams.w = 882;
                    if (size !== 'xxl') {
                        queryParams.h = 300;
                    } else {
                        queryParams.h = 533;
                    }
                }

                if (type === 'desktop') {
                    queryParams.h = 300;

                    if (size === 'sm') {
                        queryParams.w = 300;
                    } else if (size === 'lg') {
                        queryParams.w = 630;
                    } else if (size === 'xxl') {
                        queryParams.w = 1024;
                        queryParams.h = 366;
                    } else if (size === 'fullwidth') {
                        queryParams.w = 1903;
                        queryParams.h = 729;
                    }
                }

                if (card.fields.isBg) {
                    return 'https:' + card.fields.bg.fields.file.url + '?w=' + queryParams.w + '&h=' + queryParams.h;
                }

                return false;
            },
            getIconUrl: card => {
                let iconUrl = '';
                if (card.fields.isIcon) {
                    iconUrl = 'https:' + card.fields.icon.fields.file.url;
                }

                return iconUrl;
            },
            updateWidth() {
                this.width = window.innerWidth;
            },
        },
        mounted() {
            window.addEventListener('resize', this.updateWidth);
            this.updateWidth();
        }
    }

</script>