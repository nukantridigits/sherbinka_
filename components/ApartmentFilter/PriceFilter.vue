<template>
    <div class="price_filter filter_item">
        <div class="caption indigo">
            Стоимость
        </div>
        <vue-slider
                tooltip="none"
                v-model="value"
                :min="min"
                :max="max"
                :useKeyboard="true"
                :dotSize="dotSize"
                :hide-label="false"
                ref="slider"
                :enableCross="true"
                :fixed="false"
                :lazy="true"
        >
        </vue-slider>
        <div class="filter_item_input_row">
            <div class="filter_item_input_min">
                <span class="filter_item_input_caption">
                    от
                </span>
                <currency-input
                        ref="minInput"
                        :type="'text'"
                        :value="value[0]"
                        :min="min"
                        :max="max"
                        @change.native="setFilterMinByInput($event)"
                />
            </div>
            <div class="filter_item_input_max">
                 <span class="filter_item_input_caption">
                    до
                </span>
                <currency-input
                        ref="maxInput"
                        :type="'text'"
                        :value="value[1]"
                        :min="min"
                        :max="max"
                        @change.native="setFilterMaxByInput($event)"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
    import 'vue-slider-component/dist-css/vue-slider-component.css'
    import VueCurrencyInput from 'vue-currency-input'


    const mobBreakpoint = 767;
    const defaultDotSize = 22;

    export default {
        name: 'PriceFilter',
        props: ['initValue'],
        components: {
            VueSlider,
        },
        data() {
            return {
                value: this.initValue,
                width: null,
                min: null,
                max: null,
            };
        },
        computed: {
            isMob: function () {
                return this.width <= mobBreakpoint;
            },
            dotSize: function () {
                let size = defaultDotSize;

                if (this.isMob) {
                    size = 14;
                }

                return size;
            }
        },
        methods: {
            onInputFocus($event){
                let el = $event.target;

                el.selectionEnd = el.selectionStart;
            },
            trim: value => {
                return value.replace(/\s/g, "");
            },
            updateVuex: function () {
                let currentArea = this.$store.state.apartmentsFilter.area;

                this.$store.dispatch('setApartmentsFilterPrice', this.value);
                this.$store.dispatch('setApartmentsFilterArea', [currentArea[0] + 0, currentArea[1] + 0]);
            },
            setFilterMinByInput: function (event) {
                let min = this.min;
                let inputValue = event.target.value;
                let priceFilterValue = this.value;

                let newValue = inputValue !== '' ? parseInt(this.trim(inputValue)) : min;

                if (newValue < min || newValue > this.max) {
                    newValue = min;
                }

                priceFilterValue[0] = newValue;
                this.$refs.minInput.value = newValue;
                this.$refs.slider.setValue(priceFilterValue);
                event.target.blur();

                return this.updateVuex();
            },
            setFilterMaxByInput: function (event) {
                let max = this.max;
                let inputValue = event.target.value;
                let priceFilterValue = this.value;

                let newValue = inputValue !== '' ? parseInt(this.trim(inputValue)) : max;

                if (newValue < this.min || newValue > max) {
                    newValue = max;
                }

                priceFilterValue[1] = newValue;
                this.$refs.maxInput.value = newValue;
                this.$refs.slider.setValue(priceFilterValue);
                event.target.blur();

                return this.updateVuex();
            },
            updateWidth() {
                this.width = window.innerWidth;
            },
        },
        watch: {
            value: {
                handler: function () {
                    return this.$store.dispatch('setApartmentsFilterPrice', this.value);
                },
            }
        },
        created() {
            let array = this.initValue;
            this.max = array[array.length - 1];
            this.min = array[0];
        },
        mounted() {
            window.addEventListener('resize', this.updateWidth);
            this.updateWidth();
        }
    }
</script>