<template>
    <div class="house_selector_wrapper" :class="{'maximize' : showHouseSchemas}"
         @mouseleave="awayFromHouseSelectorHandler">
        <div class="house_selector_inner_wrapper">
            <div class="house_selector_top">
                <div class="caption">
                    выбор дома
                </div>
                <ul class="house_selector" @mouseover="showSchemas">
                    <li v-for="house in houses"
                        :key="house.id"
                        :data-number="house.id"
                        @click="houseNumberClickHandler"
                        :class="
                [
                    'num', 'btn',
                    {'ready' : house.isReadyForSale },
                    {'active': house.id === houseNumber}
                ]"
                    >
                        {{ house.id }}
                    </li>
                </ul>
            </div>

            <HouseSchemas :houses="houses" :house-number="houseNumber" />
        </div>
    </div>
</template>

<script>
    import HouseSchemas from '~/components/ApartmentChoosePage/HouseSchemas'

    export default {
        props: ['houses', 'houseNumber'],
        components: {
            HouseSchemas
        },
        data() {
            return {
                showHouseSchemas: false,
            }
        },
        methods: {
            awayFromHouseSelectorHandler() {
                this.hideSchemas();
            },
            showSchemas() {
                this.showHouseSchemas = true;
            },
            hideSchemas() {
                this.showHouseSchemas = false;
            },
            houseNumberClickHandler: function (event) {
                let target = event.target;
                if ((!target.classList.contains('active')) && (target.classList.contains('ready'))) {
                    return this.$bus.$emit('houseChanged', {house: parseInt(target.getAttribute('data-number'))});
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixins&vars.scss";

    .house_selector_wrapper {
        &.maximize {
            .schemes_inner_wrapper {
                height: 202px;
                transition: height 0.3s ease-in-out;
                visibility: visible;
            }
        }
    }
    .house_selector {
        @include desktop() {
            width: 846px;
            height: inherit;
            display: flex;
            align-items: center;
            position: absolute;
            left: 114px;
            padding: 0 23px 0 21px;
            background-color: $indigo;
            border-radius: 25px;
            &_wrapper {
                height: 50px;
                display: flex;
                position: relative;
                .caption {
                    padding-left: 8px;
                    color: $indigo;
                    font-size: 18px;
                    line-height: 18px;
                    display: flex;
                    align-items: center;
                    letter-spacing: 0.5px;
                    width: 147px;
                    height: inherit;
                }
            }
            .num {
                width: 42px;
                height: 42px;
                display: flex;
                align-items: center;
                justify-content: center;
                pointer-events: none;
                color: #949494;
                font-size: 18px;
                line-height: 18px;
                &.ready {
                    pointer-events: auto;
                    cursor: pointer;
                    color: #fff;
                }
                &.active {
                    pointer-events: none;
                    border-radius: 50%;
                }
                span {
                    font-size: 18px;
                    line-height: 18px;
                    letter-spacing: 0.430818px;
                }
            }
        }
    }
</style>