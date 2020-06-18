<template>
    <ul class="year_filter">
        <li v-for="year of years"
            @click="yearClickHandler"
            :data-year="year.year"
            :class="['year_item', 'btn','btn_indigo',
                    {'active': isActive(year, currentYear ) },
                    {'ready': year.isNotEmpty}]"
        >
            {{ year.year }}
        </li>
    </ul>
</template>

<script>
    export default {
        name: "YearFilter",
        props: ['years', 'currentYear'],
        methods: {
            isActive: (year, currentYear) => {
                return year.year === currentYear;
            },
            yearClickHandler() {
                let target = event.target;
                if ((!target.classList.contains('active')) && (target.classList.contains('ready'))) {
                    return this.$bus.$emit('yearChanged', {year: parseInt(target.getAttribute('data-year'))});
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixins&vars.scss";

    .year {
        &_filter {
            display: flex;
            justify-content: center;
        }
        &_item {
            width: 80px;
            height: 35px;
            margin-right: 2px;
            font-size: 17px;
            display: flex;
            justify-content: center;
            align-items: center;
            letter-spacing: 0.663578px;
            cursor: pointer;
            &:first-of-type {
                border-top-left-radius: 17px;
                border-bottom-left-radius: 17px;
            }
            &:last-of-type {
                border-top-right-radius: 17px;
                border-bottom-right-radius: 17px;
                margin-right: 0;
            }
            &.active {
                cursor: default;
            }
        }
    }
</style>