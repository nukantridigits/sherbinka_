<template>
    <div class="flat_filter indigo filter_item">
        <div class="caption indigo">
            Количество комнат
        </div>
        <div class="checkbox-row">
            <input type="checkbox" id="roomType0" value="0" v-model="roomTypeSelected">
            <label for="roomType0" class="label_studio btn btn_sm btn_indigo btn_rect">
                Студия
            </label>

            <input type="checkbox" id="roomType1" value="1" v-model="roomTypeSelected">
            <label for="roomType1" class="btn btn_sm btn_indigo btn_round">
                1
            </label>

            <input type="checkbox" id="roomType2" value="2" v-model="roomTypeSelected">
            <label for="roomType2" class="btn btn_sm btn_indigo btn_round">
                2
            </label>

            <input type="checkbox" id="roomType3" value="3" v-model="roomTypeSelected">
            <label for="roomType3" class="btn btn_sm btn_indigo btn_round">
                3
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FlatFilter',
        props: ['initValue'],
        data() {
            return {
                roomTypeSelected: this.initValue
            }
        },
        computed: {
            filterFormat: function () {
                return this.roomTypeSelected
                    .map(item => Number(item))
                    .sort((a, b) => a - b);
            }
        },
        watch: {
            roomTypeSelected: {
                handler: function () {
                    this.$store.dispatch('setApartmentsFilterFlat', this.filterFormat);
                },
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixins&vars.scss";

    .flat_filter {
        .checkbox-row {
            display: flex;
        }
        input {
            display: none;
            &:checked + label {
                transition: .3s;
                background-color: $lima !important;
                color: #fff !important;
            }
            &:not(:checked) + label {
                &:hover {
                    @include desktop {
                        color: $lima;
                    }
                }
            }
        }

        .label_studio {
            transition: .3s;
            box-shadow: none;
            @include mob() {
                max-width: 100px;
            }
            &:hover {
                transition: .3s;
                background-color: $indigo;
                @include desktop {
                    color: $lima;
                }
            }
        }
        .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            @include mob {
                margin-right: 13px;
            }
            @include tab {
                margin-right: 28px;
            }
            @include desktop {
                margin-right: 5px;
            }
            &:last-of-type {
                margin-right: 0;
            }
        }

        @include mob {
            flex-direction: column;
            .checkbox-row {
                justify-content: space-between;
                padding-bottom: 10px;
            }
            .caption {
                text-align: left;
            }
        }

        @include touch {
            justify-content: space-between;
            margin-bottom: 22px;
            display: flex;
            flex-direction: column;

            .checkbox-row {
                width: 100%;
            }
            .caption {
                width: 100%;
            }
            .btn {
                border-radius: 22px;
                &.label_studio {
                    padding: 10px 25px;
                }
            }
        }

        @include tab() {
            .checkbox-row {
                margin-right: 28px;
            }
            .caption {
                font-size: 14px;
                line-height: 18px;
                letter-spacing: 0.5px;
            }
        }
    }
</style>