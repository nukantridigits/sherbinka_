<template>
    <div class="apartment-choose-page_wrapper" :class="currentState">
        <div class="house_map">
            <transition name="fade">
                <div class="genplan" v-if="genplanShow">
                    <v-lazy-image
                            :src="require('~/assets/img/housesRenders/genplan.jpg')"
                            :src-placeholder="require('~/assets/img/housesRenders/genplan.jpg?lqip')"
                            class="house_bg genplan_bg"
                    ></v-lazy-image>
                    <svg preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 810" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <g id="genplan-layout">
                            <g id="10">
                                <circle id="Ellipse" cx="959" cy="264" r="21" fill="#253C4D"/>
                                <text id="10_2" fill="white" xml:space="preserve" style="white-space: pre" font-family="TTFirs" font-size="18" font-weight="500" letter-spacing="0.430818px"><tspan x="949.109" y="270.646">10</tspan></text>
                            </g>
                            <g id="15">
                                <circle id="Ellipse_2" cx="519" cy="339" r="21" fill="#253C4D"/>
                                <text id="15_2" fill="white" xml:space="preserve" style="white-space: pre" font-family="TTFirs" font-size="18" font-weight="500" letter-spacing="0.430818px"><tspan x="510.41" y="345.646">15</tspan></text>
                            </g>
                            <g id="13">
                                <circle id="Ellipse_3" cx="1001" cy="365" r="21" fill="#253C4D"/>
                                <text id="13_2" fill="white" xml:space="preserve" style="white-space: pre" font-family="TTFirs" font-size="18" font-weight="500" letter-spacing="0.430818px"><tspan x="992.278" y="371.646">13</tspan></text>
                            </g>
                            <g id="11">
                                <circle id="Ellipse_4" cx="1152" cy="255" r="21" fill="#253C4D"/>
                                <text id="11_2" fill="white" xml:space="preserve" style="white-space: pre" font-family="TTFirs" font-size="18" font-weight="500" letter-spacing="0.430818px"><tspan x="1145.89" y="261.646">11</tspan></text>
                            </g>
                            <g id="14">
                                <circle id="Ellipse_5" cx="761" cy="475" r="21" fill="#253C4D"/>
                                <text id="14_2" fill="white" xml:space="preserve" style="white-space: pre" font-family="TTFirs" font-size="18" font-weight="500" letter-spacing="0.430818px"><tspan x="752.278" y="481.646">14</tspan></text>
                            </g>
                            <g id="12">
                                <circle id="Ellipse_6" cx="761" cy="243" r="21" fill="#253C4D"/>
                                <text id="12_2" fill="white" xml:space="preserve" style="white-space: pre" font-family="TTFirs" font-size="18" font-weight="500" letter-spacing="0.430818px"><tspan x="752.366" y="249.646">12</tspan></text>
                            </g>
                            <g id="school" @mouseover="showSchoolInfo" @mouseleave="hideSchoolInfo">
                                <path id="Rectangle 2.1"
                                      d="M1001 210C1001 198.402 1010.4 189 1022 189H1101C1112.6 189 1122 198.402 1122 210V210C1122 221.598 1112.6 231 1101 231H1022C1010.4 231 1001 221.598 1001 210V210Z"
                                      fill="#253C4D"/>
                                <text id="school_2" fill="white" xml:space="preserve" style="white-space: pre" font-family="TTFirs" font-size="18" font-weight="500" letter-spacing="2.5px"><tspan x="1022.66" y="216.762">&#x428;&#x41a;&#x41e;&#x41b;&#x410;</tspan></text>
                            </g>
                        </g>
                    </svg>
                </div>
            </transition>

            <transition name="fade">
                <div class="house_info_wrapper wrapper" v-if="showInfo && hoveredHouse!== null">
                    <HouseInfo :houseData="hoveredHouse"/>
                </div>
            </transition>

            <transition name="fade">
                <div class="house_info_wrapper wrapper" v-if="!showInfo || hoveredHouse=== null">
                    <ApartmentFilter/>
                </div>
            </transition>
        </div>

        <PageContent :content="post.content"
                     :style="{
                        'margin-top': !showInfo || hoveredHouse=== null ? '180px' : '' ,
                        'transition': 'margin-top 200ms ease-in-out'
                     }">
        </PageContent>
    </div>
</template>

<script>
    import PageContent from '~/components/PageContent'
    import HouseInfo from '~/components/HouseInfo'
    import HouseFilter from '~/components/ApartmentChoosePage/HouseFilter'
    import ApartmentFilter from '~/components/ApartmentFilter/ApartmentFilter'
    import {createClient} from '~/plugins/contentful'
    import {mapState} from 'vuex'
    import VLazyImage from "v-lazy-image"
    import houseList from '~/assets/houseList.js'

    const mobBreakpoint = 767;
    const accountId = '****';
    const projectId = 15809;
    const apiKey = '*******';
    const profitbaseApi = {
        url: 'https://pb5822.profitbase.ru/api/v4/json/',
        authParams: {
            type: 'api-app',
            credentials: {
                pb_api_key: apiKey
            }
        },
    };

    const axiosConfig = {
        headers: {
            'Accept': 'application/json'
        }
    };

    const client = createClient();

    export default {
        name: 'ApartmentChoose',
        scrollToTop: true,
        components: {
            PageContent, HouseInfo, HouseFilter, ApartmentFilter, VLazyImage
        },
        mounted() {
            window.addEventListener('resize', this.updateWidth);
            this.updateWidth();

            Object.values(this.houseList).forEach((house) => {
                const el = document.getElementById(house.id);
                el.setAttribute('data-house', house.id);
                el.setAttribute('key', house.id);
                el.addEventListener('click', () => {
                    if (process.client) {
                        pb_front_widget.show({houseId: house.houseId, accountId: accountId})
                    }
                });

                el.addEventListener('mouseover', () => {
                    console.info('houseId', house.houseId);
                    this.hoveredHouse = this.houseList[house.id];
                    return this.showInfo = true;
                });

                el.addEventListener('mouseleave', () => {
                    this.hoveredHouse = null;
                    this.showInfo = false;
                })
            });

            this.$bus.$on('houseChanged', ({house}) => {
                let nextHouse = parseInt(house);
                this.currentHouse = nextHouse;
                this.goToHouse(nextHouse);
            });
        },
        data() {
            return {
                hoveredHouse: null,
                currentHouse: null,
                genplanShow: true,
                showInfo: false,
                token: null,
                width: null
            }
        },
        head() {
            return {
                title: this.post.title,
            }
        },
        computed: {
            isTouch: function () {
                return this.width <= mobBreakpoint;
            },
            ...mapState({
                filter: state => state.apartmentsFilter,
                houseList: state => state.houseList
            }),
            currentState: function () {
                return this.genplanShow ? 'genplan-state' : 'sections-state'
            },
        },
        methods: {
            showSchoolInfo() {
                this.hoveredHouse = this.school;

                return this.showInfo = true;

            },
            hideSchoolInfo() {
                this.hoveredHouse = null;

                return this.showInfo = false;
            },
            getHouseShowProp: function (id) {
                return this.houseList[id]['show']
            },
            onclickStringForSection(id) {
                return 'pb_front_widget.show({houseId: ' + id + ', accountId:' + accountId + '})';
            },
            genplanClickHandler(event) {
                let target = event.target;
                if (target.classList.contains('btn')) {
                    let nextHouseNumber = target.getAttribute('data-house');
                    if (nextHouseNumber.length > 0) {
                        this.currentHouse = parseInt(nextHouseNumber);
                        this.goToHouse(nextHouseNumber);
                    }
                }
            },
            goToHouse(number) {
                this.hideSections();
                this.houseList[number]['show'] = true;
                if (this.genplanShow) {
                    this.genPlanHide();
                }
            },
            genPlanShow() {
                this.currentHouse = null;
                this.genplanShow = true;
            },
            genPlanHide() {
                this.genplanShow = false;
            },
            hideSections() {
                let houses = this.houseList;
                for (let house in houses) {
                    if (houses.hasOwnProperty(house) && (houses[house]['show'] === true)) {
                        houses[house]['show'] = false;
                    }
                }
            },
            hideSectionsAndBack() {
                this.hideSections();
                this.genPlanShow();
            },
            showHouseInfo(event) {
                let target = event.target;
                if (target.classList.contains('house_btn')) {
                    let houseId = parseInt(target.getAttribute('data-house'));
                    let sectionId = parseInt(target.getAttribute('data-section'));
                    //if it's section show info for section else for house
                    console.info('houseId', houseId);
                    console.info('sectionId', sectionId);
                    if (!isNaN(sectionId)) {
                        this.hoveredHouse = this.houseList[houseId]['sections'][sectionId];
                    } else {
                        this.hoveredHouse = this.houseList[houseId];
                    }

                    return this.showInfo = true;
                }

                return false
            },
            hideHouseInfo() {
                this.hoveredHouse = null;
                this.showInfo = false;
            },
            getHousePic(id) {
                return require('../assets/img/housesRenders/house' + id + '.jpg')
            },
            updateWidth() {
                this.width = window.innerWidth;
            }
        },
        async asyncData({store, error}) {
            try {
                //школы-детские сады
                const education = await client.getEntries({
                    content_type: 'education'
                });

                //чтобы отделить школы-сады от домов(при выводе инфо)
                education.items.map(entity => {
                    entity.fields['type'] = "EDUCATIONAL"
                });

                //пока что планируется 1 школа(детский сад) =>
                let school = education.items[0].fields;

                const content = await client.getEntries({
                    include: 2,
                    content_type: 'mainPage',
                    'fields.id': '11'
                });

                let post = content.items[0].fields;

                let filter = {
                    "flat": [0, 1, 2, 3],
                    "price": [1831800, 6507200],
                    "area": [21, 78]
                };

                store.dispatch('setApartmentsFilter', filter);
                store.dispatch('setHouseList', houseList);

                return {
                    post: post,
                    school: school,
                }
            } catch (e) {
                error(e)
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/mixins&vars.scss";

    .apartment-choose-page {
        .card_list_wrapper {
            transition: margin-top 100ms ease-in-out;
        }

        &_wrapper {
            @include touch {
                .house_map {
                    display: none;
                }
            }

            &.genplan-state {
                .compass {
                    height: 98px;
                    background-image: url(~assets/icons/compass2.svg);
                    top: -26px;
                }
            }
            &.sections-state {
                .compass {
                    background-image: url(~assets/icons/compass2.svg);
                    height: 92px;
                    background-size: cover;
                    top: -20px;
                }
            }

            .houses {
                height: inherit;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                .actions_wrapper {
                    position: relative;
                    z-index: 2;
                    .go-back {
                        align-items: center;
                        max-height: 50px;
                        cursor: pointer;
                    }
                    .actions_inner_wrapper {
                        @include desktop {
                            position: absolute;
                            display: flex;
                            top: 129px;
                            z-index: 1;
                            width: 100%;
                            .compass {
                                width: 92px;
                                right: 0;
                                position: absolute;
                                background-repeat: no-repeat;
                                background-position: center;
                            }
                        }
                        .house_selector {
                            position: static;
                            width: auto;
                            &-inner_wrapper {
                                @include desktop {
                                    height: 50px;
                                }
                            }
                            &_top {
                                display: flex;
                                position: relative;
                                z-index: 2;
                                height: 100%;
                                .caption {
                                    position: relative;
                                    text-transform: none;
                                    &:after {
                                        content: '';
                                        background-color: $indigo;
                                        position: absolute;
                                        display: block;
                                        width: 22px;
                                        right: -21px;
                                        top: 0;
                                        height: inherit;
                                    }
                                }
                            }

                            &_wrapper {
                                @include desktop {
                                    margin-left: 15px;
                                    height: 50px;
                                    &.maximize {
                                        height: 228px;
                                        transition: height .3s;
                                        .house_selector_inner_wrapper {
                                            height: 100%;
                                            display: flex;
                                            flex-direction: column;
                                            align-items: flex-start;
                                        }
                                        .house_selector_top {
                                            height: 50px;
                                        }
                                    }
                                }
                                .caption {
                                    width: auto;
                                    background: #253C4D;
                                    color: #fff;
                                    border-top-left-radius: 25px;
                                    border-bottom-left-radius: 25px;
                                    font-size: 15px;
                                    line-height: 18px;
                                    letter-spacing: 0.5px;
                                    @include desktop {
                                        padding-left: 29px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .house {
                height: inherit;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                position: absolute;
                top: 0;
                width: 100%;
                &_bg {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                &_map {
                    position: relative;
                    //overflow: hidden;
                    @include desktop() {
                        height: 100vh;
                        margin-bottom: 20px;
                    }
                }

                &_info_wrapper {
                    position: absolute;
                    left: calc(50% - 480px);
                    //bottom: 12px;
                    top: calc(100vh - 179px - 12px);
                    z-index: 20;
                }
                &_btns {
                    height: inherit;
                    position: relative;
                }
            }

            .genplan {
                height: inherit;
                position: relative;
            }
            .genplan svg {
                position: absolute;
                min-height: 100vh;
                width: 100vw;
                height: 100vh;
                z-index: 1;
            }
            #genplan-layout text {
                z-index: 0;
                pointer-events: none;
            }
            #genplan-layout circle {
                background: $indigo;
                position: absolute;
                z-index: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                r: 24px;
                width: 42px;
                height: 42px;
                font-size: 18px;
                line-height: 17px;
                border-radius: 50%;
                cursor: pointer;
                transition: .3s;

                &:not(.disabled) {
                    &:hover {
                        fill: $lima;
                    }
                }
                &.disabled {
                    pointer-events: none;
                    color: #949494;
                }
            }
            #genplan-layout #school path {
                transition: .3s;
                cursor: pointer;
                &:hover {
                    fill: $lima;
                }
            }
        }
    }
</style>