<template>
    <div class="contacts-page_wrapper default_page_layout">
        <div class="title_wrapper touch">
            <h1 class="title">
                {{ post.title }}
            </h1>
        </div>

        <div class="map_wrapper">
            <Map :initCoords="initCoords" :officeList="officeList"/>
        </div>

        <div class="wrapper office_list">
            <Office v-for="office of officeList" :key="office.fields.id" :office="office"/>
        </div>

        <PageContent :content="post.content"></PageContent>
    </div>
</template>

<script>
    import PageContent from '~/components/PageContent'
    import Map from '~/components/Map'
    import {createClient} from '~/plugins/contentful';
    import Office from "../components/Office";

    const client = createClient();

    export default {
        name: 'Contacts',
        scrollToTop: true,
        components: {
            Office,
            PageContent,
            Map
        },
        head() {
            return {
                title: this.post.title,
            }
        },
        async asyncData({error}) {
            try {
                const content = await client.getEntries({
                    include: 2,
                    content_type: 'mainPage',
                    'fields.id': '5'
                });

                let post = content.items[0].fields;

                let offices = await client.getEntries({
                    content_type: 'office'
                });

                let officeListOrderFromCMS = offices.items;

                //to get init office coords
                let officeListAscById = officeListOrderFromCMS.sort(function (a, b) {
                    return a.fields.id - b.fields.id;
                });

                return {
                    post: post,
                    officeList: officeListOrderFromCMS,
                    officeListAscById: officeListAscById
                }
            } catch (e) {
                error(e)
            }
        },
        computed: {
            initCoords: function () {
                return this.officeListAscById[0].fields.coords
            }
        },
    }
</script>

<style lang="scss">
    @import "../assets/scss/mixins&vars.scss";

    .contacts-page {
        &_wrapper {
            @include mob() {
                padding-top: 95px;
            }
        }

        .office_list {
            display: flex;
        }

        @include touch() {
            .office_list {
                margin-top: 24px;
                flex-direction: column;
                .office_item {
                    margin-bottom: 20px;
                    &:last-of-type {
                        margin-bottom: 0;
                    }
                }
                .phone {
                    display: none;
                }
            }

            .card_phone {
                background: $indigo;
                border: 1px solid #fff;
                color: #fff;
                height: 60px;
                box-shadow: 0 7px 20px rgba(37, 60, 77, 0.2);
                margin: 20px 0;
                padding: 0 20px;
                display: flex;
                align-items: center;
                background-image: url(~assets/icons/handset_light_touch.svg);
                background-size: 32px 32px;
                background-repeat: no-repeat;
                background-position: right 20px center;
                a {
                    color: #fff;
                }
            }
        }

        @include desktop() {
            .office_list {
                margin-top: -125px;
                justify-content: space-between;
            }
        }
    }
</style>