<template>
    <header :class="['header', {max: max}, {opened: mobileHeader}]"
    >
        <transition name="fade">
            <div class="fade_wrapper" v-if="isFade">
                <div class="fade">
                </div>
                <div class="popup_wrapper" v-if="showGalleryPopup">
                    <div class="popup_inner_wrapper">
                        <div class="popup_gallery_wrapper popup">
                            <PopupGallery :slide="this.slide"/>
                        </div>
                    </div>
                </div>
                <div class="popup_wrapper" v-if="showCallPopup">
                    <div class="popup_inner_wrapper">
                        <div class="popup_call popup">
                            <div class="popup_call_caption">
                                Заказать звонок
                            </div>
                            <div class="popup_call_body">
                                <div class="msg">
                                    Наши менеджеры помогут подобрать<BR/>квартиру для Вас!
                                </div>
                                <input type="text" name="phone" placeholder="+7" v-model.lazy="phone">
                                <div class="btn btn_sm btn_indigo btn_rect">
                                    заказать
                                </div>
                            </div>
                            <div
                                    @click="hideCallbackForm"
                                    class="popup_call_close_btn btn btn_indigo btn_round close-btn"></div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <HeaderMobileMenu/>
        <!--<HeaderDesktopMenu :isHeaderMaximized="maximize"/>-->
        <div class="header_menu_wrapper desktop">
            <div class="header_top">
                <nuxt-link to="/" class="brand_logo"/>

                <nav class="header_menu">
                    <ul class="header_menu_list">
                        <li id="root1" class="root"
                            @mouseenter="root1_mouseEnterHandler" @mouseleave="root1_mouseLeaveHandler"
                        >
                            <nuxt-link to="/about" :class="{active: showRoot1}">
                                О проекте
                            </nuxt-link>
                            <ul :class="['sub-menu','list-one', {show: showRoot1 || root1mouseEnter}]">
                                <li>
                                    <nuxt-link to="/developer">
                                        О застройщике
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link to="/documents">
                                        Документы
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link to="/mortgage">
                                        Ипотека
                                    </nuxt-link>
                                </li>
                                <!--<li>
                                    <nuxt-link to="/stocks">
                                        Акции
                                    </nuxt-link>
                                </li>-->
                                <!--    <li>
                                        <nuxt-link to="/shop">
                                            Коммерческие помещения
                                        </nuxt-link>
                                    </li>-->
                            </ul>
                        </li>

                        <li>
                            <nuxt-link to="/construction-progress">
                                Ход строительства
                            </nuxt-link>
                            <!--<ul class="sub-menu list-two">-->
                            <!--<li>
                                <nuxt-link to="/webcam">
                                    Веб-камеры
                                </nuxt-link>
                            </li>-->
                            <!--<li>
                                <nuxt-link to="/gallery">
                                    Фотоотчет
                                </nuxt-link>
                            </li>-->
                            <!--</ul>-->
                        </li>

                        <li>
                            <nuxt-link to="/apartment-choose">
                                Выбор квартир
                            </nuxt-link>
                            <!--                        <ul class="sub-menu list-three">
                                                        <li>
                                                            <nuxt-link to="/parking">
                                                                Машиноместа
                                                            </nuxt-link>
                                                        </li>
                                                    </ul>-->
                        </li>

                        <li>
                            <nuxt-link to="/news">
                                Новости
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/contacts">
                                Контакты
                            </nuxt-link>
                        </li>
                    </ul>
                </nav>
                <div class="header_top_right">
                    <div class="header_phone" @click="showCallbackForm">
                    <span class="number">
                       +7 (906) 020-02-05
                    </span>
                        <span class="msg">
                        Заказать звонок
                    </span>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import HeaderMobileMenu from '~/components/HeaderMobileMenu'
    import PopupGallery from '~/components/PopupGallery'

    export default {
        components: {
            HeaderMobileMenu,
            PopupGallery
        },
        data() {
            return {
                slide: null,
                mobileHeader: false,
                isFade: false,
                showCallPopup: false,
                showGalleryPopup: false,
                phone: '+7',
                max: false,
                root1mouseEnter: false,
            };
        },
        computed: {
            showRoot1: function () {
                if (['developer', 'documents', 'mortgage'].includes(this.$route.name)) {
                    this.maximize();

                    return true
                } else {
                    if (!this.root1mouseEnter) {
                        this.minimize();

                        return false
                    }
                }
            }
        },
        methods: {
            maximize() {
                this.max = true;
            },
            minimize() {
                this.max = false;
            },
            root1_mouseEnterHandler() {
                this.root1mouseEnter = true;
                this.maximize()
            },
            root1_mouseLeaveHandler() {
                this.root1mouseEnter = false;
            },
            showCallbackForm() {
                this.isFade = true;
                this.showCallPopup = true;
            },
            hideCallbackForm() {
                this.isFade = false;
                this.showCallPopup = false;
            },
            showGallery(slide) {
                this.slide = slide;
                this.isFade = true;
                this.showGalleryPopup = true;
            },
            hideGallery() {
                this.slide = null;
                this.showGalleryPopup = false;
                this.isFade = false;
            }
        },
        created() {
            this.$bus.$on('showMobileHeader', ({show}) => {
                this.mobileHeader = show;
            });
            this.$bus.$on('showCallPopup', () => {
                this.showCallbackForm();
            });
            this.$bus.$on('showGalleryPopup', ({slide}) => {
                this.showGallery(slide);
            });
            this.$bus.$on('hideGalleryPopup', () => {
                this.hideGallery();
            });
        },
    }
</script>