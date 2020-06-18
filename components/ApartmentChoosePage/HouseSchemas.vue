<template>
    <div class="schemes_wrapper">
        <div class="schemes_inner_wrapper">
            <div class="caption">
                схема
            </div>
            <div class="schemes_list_wrapper">
                <ul class="schemes_list">
                    <li v-for="house of houses"
                        :key="house.id"
                        :class="['scheme',{active: house.id === houseNumber}]"
                        :data-house="house.id"
                        :style="getBgSrc(house.id)"
                        :id="['scheme' + house.id ]"
                        @click="houseNumberClickHandler"
                    >
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SectionSchemas",
        props: ['houses', 'houseNumber'],
        methods: {
            getBgSrc(id) {
                return 'background-image:url(/house_schemes/' + id + '.svg)';
            },
            houseNumberClickHandler: function (event) {
                let target = event.target;
                if ((!target.classList.contains('active'))) {
                    return this.$bus.$emit('houseChanged', {house: parseInt(target.getAttribute('data-house'))});
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixins&vars.scss";

    .schemes {
        &_list {
            &_wrapper {
                padding-left: 40px;
            }
        }
        &_wrapper {
            z-index: 1;
            width: 100%;
            height: auto;
            position: relative;
            border-bottom-left-radius: 25px;
            border-bottom-right-radius: 25px;
            background: #253c4d;
            .schemes_inner_wrapper {
                visibility: hidden;
                height: 0;
                overflow: hidden;
                //transition: height .3s;
                transition: height 0.3s cubic-bezier(0, 1, 0, 1);
                background: #253c4d;
                width: 100%;
                position: absolute;
                top: -23px;
                display: flex;
                border-bottom-left-radius: 25px;
                border-bottom-right-radius: 25px;
                .caption {
                    width: 110px !important;
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-start;
                    text-transform: none;
                    height: auto;
                    padding-top: 42px;
                }
            }
            .scheme {
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                position: absolute;
                transition: filter .3s;
                cursor: pointer;
                &.active {
                    filter: invert(13%) sepia(54%) saturate(308%) hue-rotate(28deg) brightness(91%) contrast(83%);
                }
            }
            #scheme15 {
                top: 50px;
                width: 74px;
                height: 54px;
            }
            #scheme14 {
                top: 120px;
                width: 74px;
                height: 50px;
            }
            #scheme12 {
                top: 50px;
                right: 114px;
                width: 54px;
                height: 53px;
            }
            #scheme13 {
                top: 119px;
                right: 114px;
                width: 54px;
                height: 53px;
            }
            #scheme10 {
                right: 89px;
                top: 80px;
                height: 60px;
                width: 12px;
            }
            #scheme11 {
                right: 28px;
                top: 127px;
                width: 52px;
                height: 12px;
            }
        }
    }
</style>