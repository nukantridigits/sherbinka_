<template>
    <div class="content-blocks">
        <div v-for="blockObj in content" :key="blockObj.sys.id"
             :class="[
                'content-block-wrapper',
                {'top_slider_wrapper': blockObj.sys.contentType.sys.id === 'slider' && blockObj.fields.isTopSlider === true},
                {'slider_default_wrapper': blockObj.sys.contentType.sys.id === 'slider' && blockObj.fields.isTopSlider === false},
                {'card_list_wrapper': blockObj.sys.contentType.sys.id === 'cardList'},
             ]
        ">
            <div v-if="blockObj.sys.contentType.sys.id === 'slider'">
                <SlickSlider :slider="blockObj.fields"/>
            </div>

            <div v-if="blockObj.sys.contentType.sys.id === 'textBlock'" class="wrapper text_block_wrapper">
                <TextBlock :text="blockObj"/>
            </div>

            <div v-if="blockObj.sys.contentType.sys.id === 'cardList'" class="card-list fsb">
                <card v-for="card in blockObj.fields.list" :card="card" :key="card.fields.id"/>
            </div>

            <div v-if="blockObj.sys.contentType.sys.id === 'card' && blockObj.fields.size === 'fullwidth'"
                 class="fullwidth_wrapper">
                <card :card="blockObj"/>
            </div>
        </div>
    </div>
</template>

<script>
    import SlickSlider from '~/components/SlickSlider'
    import Card from '~/components/Card'
    import TextBlock from '~/components/TextBlock'

    export default {
        name: "PageContent",
        props: ['content'],
        scrollToTop: true,
        components: {
            Card,
            SlickSlider,
            TextBlock
        },
        computed: {
        },
        methods: {
        },
    }
</script>