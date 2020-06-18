<template>
    <div class="apartment_filter filter card card_xxl">
        <h2 class="title indigo">
            1500 квартир в домах с разноэтажными секциями
        </h2>

        <div class="filters-row">
            <FlatFilter :initValue="flatFilter"/>
            <AreaFilter :initValue="areaFilter"/>
            <PriceFilter :initValue="priceFilter"/>
        </div>


        <div class="btn-wrapper">
            <a :href="profitBaseLink" class="btn btn_sm btn_indigo btn_rect">
                показать варианты
            </a>
        </div>
    </div>
</template>

<script>
    import FlatFilter from './FlatFilter'
    import PriceFilter from './PriceFilter'
    import AreaFilter from './AreaFilter'
    import {mapState} from 'vuex'

    const filterString = '&filter=property.';
    const studio = filterString + 'roomType.isStudio:true';
    const room1 = filterString + 'count:1';
    const room2 = filterString + 'count:2';
    const room12 = filterString + 'count:1,2';
    const room3 = filterString + 'maxCount:3';

    export default {
        name: 'ApartmentFilter',
        components: {
            AreaFilter,
            FlatFilter,
            PriceFilter
        },
        computed: {
            ...mapState({
                flatFilter: state => state.apartmentsFilter.flat,
                priceFilter: state => state.apartmentsFilter.price,
                areaFilter: state => state.apartmentsFilter.area,
            }),
            profitBaseLink() {
                let baseLink = this.$route.name + "/#/profitbase/projects/list?filter=property.status:AVAILABLE";

                //flatfilter part
                let flatFilter = this.flatFilter.slice();

                flatFilter.sort(function (a, b) {
                    return a - b
                });

                if (flatFilter.length === 4) {
                    baseLink = baseLink += room3 + room12 + studio;
                } else {
                    for (let i = 0; i < flatFilter.length; i++) {
                        if (flatFilter[i] === 0) {
                            baseLink += studio;
                        }

                        if (flatFilter[i] === 1) {
                            if (!flatFilter.includes(2)) {
                                baseLink += room1;
                            } else {
                                baseLink += room12;
                                flatFilter.splice(flatFilter.indexOf(1), 1);
                                flatFilter.splice(flatFilter.indexOf(2), 1);
                            }
                        }

                        if (flatFilter[i] === 2) {
                            if (!flatFilter.includes(1)) {
                                baseLink += room2;
                            } else {
                                baseLink += room12;
                                flatFilter.splice(flatFilter.indexOf(1), 1);
                                flatFilter.splice(flatFilter.indexOf(2), 1);
                            }
                        }

                        if (flatFilter[i] === 3) {
                            baseLink += room3;
                        }
                    }
                }

                //pricefilter part
                const [priceMin, priceMax] = this.priceFilter;
                let PriceMinString = priceMin > 0 ? '&filter=property.price.priceMin:' + priceMin : '';
                let PriceMaxString = priceMax > 0 ? '&filter=property.price.priceMax:' + priceMax : '';
                baseLink += PriceMinString + PriceMaxString;

                //areafilter part
                const [areaMin, areaMax] = this.areaFilter;
                let AreaMinString = areaMin > 0 ? '&filter=property.area.min:' + areaMin : '';
                let AreaMaxString = areaMax > 0 ? '&filter=property.area.max:' + areaMax : '';
                baseLink += AreaMinString + AreaMaxString;

                // console.info(baseLink);
                return baseLink;
            },
        },
    }
</script>
<style lang="scss">
    @import "../../assets/scss/mixins&vars.scss";

    .apartment_filter {
        .caption {
            @include mob{
                padding-bottom: 16px;
                font-size: 10px;
                line-height: 12px;
                font-weight: 500;
            }
            @include tablet-desktop {
                padding-bottom: 12px;
            }
        }
        input[type=text] {
            color: $indigo;
            border: 1px solid $lima;
            text-align: center;
            letter-spacing: 0.5px;
            border-radius: 21px;
            height: 26px;
            @include mob{
                font-size: 10px;
                line-height: 12px;
                font-weight: 500;
            }
            @include tab{
                font-size: 15px;
            }
            @include tablet-desktop{
                height: 42px;
                border: 2px solid $lima;
            }
        }

        .filter_item {
            @include desktop {
                margin-right: 24px;
            }
            &:last-of-type {
                margin-right: 0;
            }
        }

        .filter_item_input {
            &_min, &_max {
                display: flex;
                align-items: center;
            }
            &_row {
                display: flex;
                justify-content: space-between;
            }
            &_caption {
                color: $disable;
                @include touch{
                    margin-right: 6px;
                }
                @include desktop {
                    margin-right: 11px;
                }
            }
        }

        .vue-slider{
            @include desktop{
                margin-top: 5px;
            }
        }
    }
</style>

<style lang="scss" scoped>
    @import "../../assets/scss/mixins&vars.scss";

    .apartment_filter {
        .btn_rect {
            box-shadow: none;
        }

        @include mob {
            .area_filter,.price_filter {
                margin-bottom: 20px;
            }
            .btn-wrapper {
                margin-top: 0;
                .btn {
                    padding: 10px 0;
                    width: 100%;
                }
            }
        }

        @include touch {
            height: auto;
            .title {
                margin-bottom: 37px;
            }
            .filters-row {
                margin-bottom: 32px;
            }
            .btn-wrapper {
                .btn {
                    display: flex;
                    justify-content: center;
                }
            }
        }

        @include mob{
            padding: 20px;
        }

        @include tab() {
            padding: 20px 32px 28px;
            .flat_filter {
                margin-bottom: 28px;
            }
            .area_filter {
                margin-bottom: 28px;
            }
            .price_filter {
                margin-bottom: 30px;
            }
            .btn-wrapper {
                margin-top: 45px;
                .btn {
                    padding: 10px 23px;
                }
            }
        }

        @include desktop() {
            height: 280px;
            padding: 25px 30px 30px;
            h2.title {
                margin-bottom: 42px;
            }

            .filters-row {
                display: flex;
                align-items: baseline;
                margin-bottom: 25px;
            }

            .price_filter {
                width: 357px;
                margin: 0;
            }
        }
    }
</style>