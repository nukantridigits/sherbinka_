<template>
    <div class="btn-more"></div>
</template>

<script>
    export default {
        name: 'ButtonMore',
    }
</script>


<style lang="scss">
    @import "../../assets/scss/mixins&vars.scss";

    .active {
        .btn-more {
            background-color: $lima;
            transform: rotate(90deg);
        }
    }

</style>

<style lang="scss" scoped>
    @import "../../assets/scss/mixins&vars.scss";

    .btn-more {
        min-width: 26px;
        min-height: 26px;
        max-width: 26px;
        max-height: 26px;
        border-radius: 50%;
        cursor: pointer;
        transition: .3s;
        background: url(~assets/icons/btn_more_arrow_white_to_right.svg) center, $indigo;
        background-size: 14px 14px;
        background-repeat: no-repeat;

        @include desktop() {
            &:hover {
                background-color: $lima;
            }
        }
    }
</style>