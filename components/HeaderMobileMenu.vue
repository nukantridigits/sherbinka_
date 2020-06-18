<template>
    <div class="header_menu_wrapper touch" :class="{opened: showHeader}">
        <transition name="slide">
            <div class="header_content" @click="navClick">
                <div class="header_content_wrapper">
                    <div class="header_top">
                        <div class="header_trigger_wrapper" @click="headerTrigger">
                            <Lottie :key="lottieKey" :options="lottieOptions" :height="32" :width="32"
                                    v-on:animCreated="handleAnimation"/>
                        </div>
                        <a href="/" class="brand_logo"></a>
                        <!--<nuxt-link to="/" class="brand_logo" />-->
                        <div class="phone-widget handset-icon" @click="showCallPopup"></div>
                    </div>
                    <template v-if="showHeader">
                        <vue-scrollbar
                                :isMobile="true"
                                :scrollTo="0"
                                :maxHeight="'65vh'"
                        >
                            <nav class="header_menu">
                                <ul class="header_menu_list">
                                    <li class="root">
                                        <nuxt-link to="/about">
                                            О проекте
                                        </nuxt-link>
                                        <ul class="sub-menu">
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
                                            <!--                                            <li>
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
                                        <!--<ul class="sub-menu">-->
                                        <!--<li>
                                            <nuxt-link to="/webcam">
                                                Веб-камеры
                                            </nuxt-link>
                                        </li>-->
                                        <!-- <li>
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
                                        <!--                                        <ul class="sub-menu">
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
                        </vue-scrollbar>
                        <div class="header_bottom">
                            <div class="copyright">
                                © 2019. Новая Щербинка
                            </div>
                            <div class="madeby">
                                Дизайн и верстка - STD127
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import * as animationIn from "assets/lottie/menu_in.json"
    import * as animationOut from "assets/lottie/menu_out.json"
    import VueScrollbar from 'vue-scrollbar-live';
    import Lottie from "~/components/lottie";

    export default {
        components: {
            VueScrollbar, Lottie
        },
        name: 'HeaderMobileMenu',
        data() {
            return {
                lottieKey: 0,
                showHeader: false,
                lottieOptions: {animationData: animationIn},
                animationSpeed: 1
            };
        },
        methods: {
            showCallPopup() {
                return this.$bus.$emit('showCallPopup');
            },
            handleAnimation: function (anim) {
                this.anim = anim;
            },
            play: function () {
                if (this.showHeader) {
                    this.lottieOptions.animationData = animationIn;
                } else {
                    this.lottieOptions.animationData = animationOut;
                }

                this.anim.play();
                setTimeout(() => this.lottieKey++, 800);
            },
            navClick: function (event) {
                let target = event.target;
                if (!target.classList.contains('brand_logo') && target.tagName === 'A') {
                    this.headerTrigger();
                }
            },
            headerTrigger() {
                if (this.anim.isLoaded && this.anim.isPaused) {
                    window.scrollTo(0, 0);
                    this.play();
                    this.showHeader = !this.showHeader;

                    return this.$bus.$emit('showMobileHeader', {show: this.showHeader})
                } else return false
            },
        },
    }
</script>
