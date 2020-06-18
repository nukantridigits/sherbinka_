<template>
    <div class="progress_slider">
        <vue-slider
                tooltip="always"
                :tooltip-formatter="num => this.months[num]"
                v-model="value"
                @change="sliderValueChangeHandler()"
                :data="data"
                :useKeyboard="true"
                :marks="months"
                :dotSize="26"
                :hide-label="false"
                ref="slider"
        >
        </vue-slider>

        <div class="year_filter_wrapper">
            <YearFilter :years="years" :currentYear="currentYear"/>
        </div>
    </div>
</template>

<script>
    import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
    import 'vue-slider-component/dist-css/vue-slider-component.css'
    import YearFilter from './YearFilter'

    const monthesByNumbers = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const monthsNamesByNumbers = {
        '01': 'январь',
        '02': 'февраль',
        '03': 'март',
        '04': 'апрель',
        '05': 'май',
        '06': 'июнь',
        '07': 'июль',
        '08': 'август',
        '09': 'сентябрь',
        '10': 'октябрь',
        '11': 'ноябрь',
        '12': 'декабрь'
    };

    export default {
        components: {
            VueSlider,
            YearFilter
        },
        props: ['years', 'currentYear', 'month'],
        data() {
            return {
                value: this.month,
                data: monthesByNumbers,
                months: monthsNamesByNumbers
            };
        },
        methods: {
            sliderValueChangeHandler() {
                let value = this.$refs.slider.getValue();
                let tooltip = document.querySelector('.vue-slider-dot-tooltip');
                let firstLabel = document.querySelector('.vue-slider-marks .vue-slider-mark:nth-child(1) .vue-slider-mark-label');
                let lastLabel = document.querySelector('.vue-slider-marks .vue-slider-mark:nth-child(12) .vue-slider-mark-label');
                let firstMonth = monthesByNumbers[0];
                let lastMonth = monthesByNumbers[monthesByNumbers.length - 1];

                const lima = '#A7C972';
                const indigo = '#253C4D';

                if (value === firstMonth || value === lastMonth) {
                    tooltip.style.display = 'none';
                } else {
                    tooltip.style.display = 'block';
                }

                if (value === firstMonth) {
                    firstLabel.style.color = lima;
                } else {
                    firstLabel.style.color = indigo;
                }

                if (value === lastMonth) {
                    lastLabel.style.color = lima;
                } else {
                    lastLabel.style.color = indigo;
                }
            }
        },
        mounted() {
            this.sliderValueChangeHandler();
        },
        watch: {
            value: {
                handler: function () {
                    return this.$bus.$emit('monthChanged', {month: this.value});
                }
            }
        }
    }
</script>