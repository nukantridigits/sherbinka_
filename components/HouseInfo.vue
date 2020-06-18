<template>
    <div class="house_info indigo">
        <template v-if="house.type !== 'EDUCATIONAL'">
<!--            <div class="house_info_col">
                <div class="caption">
                    Цена от
                </div>
                <div class="value">
                    {{house.minPrice | toMillions}}
                    <span>млн.</span>
                </div>
            </div>-->
            <div class="house_info_col">
                <div class="caption">
                    Всего квартир
                </div>
                <div class="value">
                    {{house.propertyCount}}
                </div>
            </div>
            <div class="house_info_col">
                <div class="caption">
                    Доступно квартир
                </div>
                <div class="value">
                    {{house.countFilteredProperty}}
                </div>
            </div>
            <div class="house_info_col">
                <div class="caption">
                    Год сдачи
                </div>
                <div class="value">
                    {{house.developmentEndQuarter.year}}
                </div>
            </div>

         <!--   <div class="house_info_col">
                <div class="caption">
                    Этажность
                </div>
                <div class="value">
                    {{house.minFloor}}-{{house.maxFloor}}
                </div>
            </div>-->
            <!--<div class="house_info_col">
                <div class="caption">
                    Цена за квадратный метр от
                </div>
                <div class="value">
                    {{ house.minPriceArea | toThousands }}
                    <span>тыс.</span>
                </div>
            </div>-->
        </template>
        <template v-if="house.type === 'EDUCATIONAL'">
            <div class="house_info_col">
                <div class="caption">
                    Назначение
                </div>
                <div class="value">
                    {{house.destination ? "Школа" : "Детский сад"}}
                </div>
            </div>
            <div class="house_info_col">
                <div class="caption">
                    Количество мест
                </div>
                <div class="value">
                    {{house.capacity}}
                </div>
            </div>
            <div class="house_info_col">
                <div class="caption">
                    Год ввода в эксплуатацию
                </div>
                <div class="value">
                    {{house.start_year}}
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        props: ['houseData'],
        name: 'HouseInfo',
        computed: {
            house: function () {
                return this.houseData
            },
        },
        filters: {
            toMillions: function (value) {
                return Math.floor(value / 1000000 * 10) / 10;
            },
            toThousands: function (value) {
                return Math.ceil(value / 1000 * 10) / 10;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/mixins&vars.scss";

    .house_info {
        background-color: #fff;
        box-shadow: 0 7px 20px rgba(37, 60, 77, 0.2);
        border-radius: 10px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        @include desktop(){
            height: 179px;

        }
        &_col {
            display: flex;
            flex-direction: column;
            align-items: center;
            @include desktop() {
                min-width: 200px;
                .caption {
                    font-size: 14px;
                    line-height: 18px;
                    letter-spacing: 0.371962px;
                    padding-bottom: 34px;
                }
                .value {
                    display: flex;
                    align-items: baseline;
                    font-size: 80px;
                    line-height: 60px;
                    text-align: center;
                    span{
                        font-size: 44px;
                        line-height: 40px;
                        margin-left: 5px;
                    }
                }
            }
        }
    }
</style>