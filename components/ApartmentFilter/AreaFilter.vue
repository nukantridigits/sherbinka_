<template>
    <div class="area_filter filter_item">
        <div class="caption indigo">
            Площадь
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
                <input ref="minInput" type="text" v-mask="maskOptions" :value="value[0]"
                       @change="setFilterMinByInput">
            </div>
            <div class="filter_item_input_max">
                 <span class="filter_item_input_caption">
                    до
                </span>
                <input ref="maxInput" type="text" v-mask="maskOptions" :value="value[1]"
                       @change="setFilterMaxByInput">
            </div>
        </div>
    </div>
</template>

<script>
    import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
    import 'vue-slider-component/dist-css/vue-slider-component.css'
    import MaskedInput from 'vue-text-mask'


    const mobBreakpoint = 767;
    const defaultDotSize = 22;

    export default {
        name: 'AreaFilter',
        props: ['initValue'],
        components: {
            VueSlider,
            MaskedInput
        },
        data() {
            return {
                value: this.initValue,
                width: null,
                min: null,
                max: null,
                maskOptions : {
                    mask: '99 м2'
                }
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
            setFilterMinByInput: function (event) {
                let min = this.min;
                let inputValue = event.target.value;
                let areaFilterValue = this.value;

                let newValue = inputValue !== '' ? parseInt(this.trim(inputValue)) : min;

                if (newValue < min || newValue > this.max) {
                    newValue = min;
                }

                areaFilterValue[0] = newValue;
                this.$refs.minInput.value = newValue;
                this.$refs.slider.setValue(areaFilterValue);
                event.target.blur();

                return this.updateVuex();
            },
            setFilterMaxByInput: function (event) {
                let max = this.max;
                let inputValue = event.target.value;
                let areaFilterValue = this.value;

                let newValue = inputValue !== '' ? parseInt(this.trim(inputValue)) : max;

                if (newValue < this.min || newValue > max) {
                    newValue = max;
                }

                areaFilterValue[1] = newValue;
                this.$refs.maxInput.value = newValue;
                this.$refs.slider.setValue(areaFilterValue);
                event.target.blur();

                return this.updateVuex();
            },
            onInputFocus($event) {
                let el = $event.target;

                el.selectionEnd = el.selectionStart;
            },
            trim: value => {
                return value.replace(/\s/g, "");
            },
            updateVuex() {
                let currentPrice = this.$store.state.apartmentsFilter.price;

                this.$store.dispatch('setApartmentsFilterArea', this.value);
                this.$store.dispatch('setApartmentsFilterPrice', [currentPrice[0] + 0, currentPrice[1] + 0]);
            },
            updateWidth() {
                this.width = window.innerWidth;
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
        },
        watch: {
            value: {
                handler: function () {
                    return this.$store.dispatch('setApartmentsFilterArea', this.value);
                },
            }
        }
    }
</script>