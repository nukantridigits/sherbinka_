<template>
    <div class="document_group">
        <div class="document_group_title" @click="docTitleClickHandler">
            <div class="text active_trigger">
                {{ documentGroup.fields.title }}
            </div>
            <BtnMore class="active_trigger" />
        </div>
        <ul class="doc_list">
            <li class="doc_list_item" v-for="doc of documentGroup.fields.docs" :key="doc.fields.id">
                <a :href="getDocUrl(doc)" target="_blank">
                    <div class="doc_icon sheet"></div>
                    <div class="doc_info">
                        <div class="doc_title">
                            {{ doc.fields.title }}
                        </div>
                        <div class="doc_date_update">
                           Документ размещен <BR class="mob" />
                           {{ getCreatedAt(doc) | date }}
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import BtnMore from '~/components/Buttons/ButtonMore'
    import monthsRusNamesGenetive from '~/static/monthRus.json';

    export default {
        props: ['documentGroup'],
        name: 'DocumentGroup',
        components: {
            BtnMore
        },
        filters: {
            date: function (value) {
                if (!value) return '';
                let dateObj = new Date(value);

                return dateObj.getDate() + ' ' + monthsRusNamesGenetive[(dateObj.getMonth() + 1)];
            }
        },
        methods: {
            docTitleClickHandler: function (event) {
                let target = event.target;
                let classList = target.classList;

                if(classList.contains('document_group_title')){
                    target.parentElement.classList.toggle('active');
                } else if(classList.contains('active_trigger')) {
                    target.parentElement.parentElement.classList.toggle('active');
                }
            },
            getDocUrl: doc => {
                return 'https:' + doc.fields.file.fields.file.url;
            },
            getCreatedAt: doc => {
                return doc.fields.file.sys.createdAt;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/mixins&vars.scss";

    .document_group {
        margin-bottom: 20px;
        padding: 20px 30px 20px 20px;
        height: 68px;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0 7px 20px rgba(37, 60, 77, 0.2);
        transition: .3s;
        &:last-of-type {
            margin-bottom: 0;
        }
        &_title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            letter-spacing: 2.5px;
            text-transform: uppercase;

            @include mob {
                font-size: 12px;
                line-height: 17px;
            }

            @include desktop {
                height: 64px;
                font-size: 18px;
                line-height: 18px;
                cursor: pointer;
                &:not(.active) {
                    &:hover .btn-more {
                        background-color: $lima;
                    }
                }
            }
        }
        &.active {
            height: auto;
            padding-bottom: 31px;
            .doc_list {
                visibility: visible;
                opacity: 1;
            }
        }
        .doc {
            &_list {
                padding-top: 12px;
                visibility: hidden;
                opacity: 0;
                transition: .3s;
                @include mob {
                    padding-top: 30px;
                }
                &_item {
                    margin-bottom: 22px;
                    a {
                        display: inline-flex;
                        align-items: center;
                        color: $indigo;
                        &:hover{
                            transition: .3s;
                            color: $lima;
                            .sheet{
                                transition: background-image .3s;
                                background-image: url(~assets/icons/sheet_lima.svg);
                            }
                        }
                    }
                    &:last-of-type {
                        margin-bottom: 0;
                    }
                }
            }
            &_title {
                font-weight: bold;
                padding-bottom: 5px;
                @include mob {
                    padding-bottom: 10px;
                }
            }
            &_icon {
                width: 28px;
                height: 38px;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                @include mob() {
                    margin-right: 14px;
                    min-width: 26px;
                    max-width: 26px;
                    min-height: 34px;
                    max-height: 34px;
                }

                @include tab {
                    margin-right: 18px;
                }

                @include desktop {
                    min-width: 37px;
                    height: 48px;
                    margin-right: 30px;
                }
            }
        }

        @include desktop {
            margin-bottom: 30px;
            padding: 0 30px;
            height: 64px;
        }
    }
</style>