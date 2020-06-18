<template>
    <div class="construction_progress_wrapper">
        <div class="page_title_wrapper touch">
            <h1 class="page_title">
                {{ post.title }}
            </h1>
        </div>

        <!--компонент выбора дома -->
        <HouseFilter :houses="houses" :house-number="this.filter.houseNumber"/>

        <div class="wrapper">
            <Card :card="card"/>
        </div>

        <div v-if="isGallery">
            <Gallery :reportsList="reportsList"/>
        </div>
        <div v-else>
            <div class="photo_slider">
                <div class="slider_wrapper photo_slider_wrapper">
                    <SlickSlider :slider="slider" />
                </div>
            </div>
        </div>

        <PageContent :content="post.content"></PageContent>

    </div>
</template>

<script>
    import SlickSlider from '~/components/SlickSlider'
    import Card from '~/components/Card'
    import PageContent from '~/components/PageContent'
    import HouseFilter from '~/components/ProgressSlider/HouseFilter'
    import Gallery from '~/components/ProgressSlider/Gallery'
    import {createClient} from '~/plugins/contentful';

    const client = createClient();
    const touchBreakpoint = 1023;
    const defaultHouseNumber = 0;

    export default {
        name: 'ConstructionProgress',
        components: {
            HouseFilter,
            PageContent,
            Card,
            Gallery,
            SlickSlider
        },
        head() {
            return {
                title: this.post.title,
            }
        },
        data() {
            return {
                reports: [],
                reportsList: [],
                filter: {
                    houseNumber: null,
                    year: new Date().getFullYear(),
                    month: (new Date().getMonth() + 1).toString().padStart(2, '0')
                },
                width: null,
                slider: {
                    type: 'slideConstructionProgress',
                    isFullWidthOnDesktop: 'false',
                    isTopSlider: 'false',
                    isShowText: 'true',
                    slidesToShow: '3',
                    autoplay: true,
                    slidesToScroll: 1,
                    draggable: true,
                    slides: this.reportsList,
                }
            }
        },
        computed: {
            isGallery: function () {
                if ((this.isTouch && this.reportsList.length === 1) || !this.isTouch && this.reportsList.length <= 3) {
                    return true
                }
            },
            isTouch: function () {
                return this.width <= touchBreakpoint;
            }
        },
        asyncData: async function ({store, error}) {
            try {

                let index = 0, years = {}, housesApproved = [];

                const content = await client.getEntries({
                    include: 2,
                    content_type: 'mainPage',
                    'fields.id': '1'
                });

                let post = content.items[0].fields;

                const cardContent = await client.getEntries({
                    content_type: 'card',
                    'fields.id': '15'
                });

                let card = cardContent.items[0];

                const housesAll = await client.getEntries({
                    content_type: 'house',
                    'fields.isReadyForSale': true
                });

                const yearsData = await client.getEntries({
                    content_type: 'yearReport',
                    select: 'fields.year'
                });

                const withReports = await client.getEntries({
                    content_type: 'yearReport',
                    'fields.reports[exists]': true,
                    select: 'fields.year'
                });

                let yearsWithReports = withReports.items.map(withReport => withReport.fields.year);

                let yearsAll = yearsData.items
                    .map(year => year.fields.year)
                    .sort((a, b) => a - b);

                //divide not empty from empty years for years filter
                for (const key in yearsAll) {
                    if (yearsAll.hasOwnProperty(key)) {
                        let yearValue = yearsAll[key];
                        years[index] = {
                            year: yearValue,
                            isNotEmpty: yearsWithReports.includes(yearValue)
                        };

                        index++;
                    }
                }

                //:TODO refactor it - check for houses with reports

                let housesData = await Promise.all(housesAll.items.map(house => {
                        return client.getEntries({
                            content_type: 'report',
                            select: 'fields.houseNumber',
                            'fields.houseNumber': house.fields.number,
                        });
                    }
                ));

                let housesWithReportsArray = housesData.map(house => {
                    if (house.total > 0) {
                        return house.items[0].fields.houseNumber
                    }
                });

                for (let i = 0; i < housesWithReportsArray.length; i++) {
                    if (typeof housesWithReportsArray[i] !== 'undefined') {
                        housesApproved.push(housesWithReportsArray[i])
                    }
                }

                let houses = {};
                housesAll.items.forEach(house => {
                    houses[house.fields.number] = {
                        id: house.fields.number,
                        // isReadyForSale: house.fields.isReadyForSale && housesApproved.includes(house.fields.number)
                        isReadyForSale: false
                    };
                });

                return {
                    post: post,
                    card: card,
                    houses: houses,
                    years: years,
                }
            } catch (e) {
                error(e)
            }
        },
        methods: {
            async getReports(filter) {
                let {year, month, houseNumber} = filter;
                let dateRange = this.formatDate(year, month);

                let reports = await client.getEntries({
                    content_type: 'report',
                    'fields.houseNumber': houseNumber,
                    'fields.date[gte]': dateRange.firstDay,
                    'fields.date[lte]': dateRange.lastDay,
                    order: '-sys.createdAt'
                });

                this.reports = reports;

                this.reportsList = reports.items.map(report => report.fields.reportPhotoCollection).flat();
            },
            //get first and last days of month formatted to ISO
            formatDate(year, month) {
                month = this.monthFormat(month);

                let firstDayOfMonthDate = new Date(year, month, 1);
                firstDayOfMonthDate.setMonth(firstDayOfMonthDate.getMonth() - 1);
                let firstDayOfMonthISO = firstDayOfMonthDate.toISOString();

                let lastDayOfMonth = this.getLastDayOfMonth(year, month);
                let lastDayOfMonthDate = new Date(year, month, lastDayOfMonth);
                lastDayOfMonthDate.setMonth(lastDayOfMonthDate.getMonth() - 1);
                let lastDayOfMonthISO = lastDayOfMonthDate.toISOString();

                return {
                    firstDay: firstDayOfMonthISO,
                    lastDay: lastDayOfMonthISO
                }
            },
            getLastDayOfMonth(year, month) {
                let date = new Date(year, month + 1, 0);

                return date.getDate();
            },
            monthFormat(month) {
                if (month[0] === '0') {
                    month = month.slice(1);
                }

                return month
            },
            updateWidth() {
                this.width = window.innerWidth;
            },
        },
        mounted() {
            //set init house number
            let housesReadyForSale = [];
            let houses = this.houses;
            for (let house in houses) {
                if (houses.hasOwnProperty(house)) {
                    if (houses[house]['isReadyForSale'] === true) {
                        housesReadyForSale.push((houses[house]['id']));
                    }
                }
            }

            housesReadyForSale
                .map(house => house.id)
                .sort((a, b) => a - b);

            if (housesReadyForSale.length > 0) {
                this.filter.houseNumber = housesReadyForSale[0];
            } else {
                this.filter.houseNumber = defaultHouseNumber;
            }

            ////

            window.addEventListener('resize', this.updateWidth);
            this.updateWidth();

            this.getReports(this.filter);

            this.$bus.$on('houseChanged', ({house}) => {
                this.filter.houseNumber = house;
            });

            this.$bus.$on('yearChanged', ({year}) => {
                this.filter.year = year;
            });

            this.$bus.$on('monthChanged', ({month}) => {
                this.filter.month = month;

            });
        },
        watch: {
            filter: {
                handler: function () {
                    this.getReports(this.filter);
                },
                deep: true,
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/mixins&vars.scss";

    .construction-progress-page {
        @include touch {
            .house_selector_wrapper{
                display: none;
            }

            .page_title_wrapper{
                display: none;
            }

            .month_slider_wrapper{
                overflow: hidden;
            }

            .photo_slider_wrapper{
                padding-bottom: 0;
            }

            .top-card {
                margin-bottom: 20px;
            }
        }

        @include tab{
            padding-top: 48px;
            .construction_progress_wrapper{
                margin-top: 40px;
            }

            .photo_slider{
                margin-bottom: 30px;
            }
        }

        @include desktop {
            .house_selector_wrapper {
                margin-bottom: 30px;
            }

            .top-card {
                margin-bottom: 30px;
            }

            .month_slider_wrapper {
                margin-bottom: 30px;
                box-shadow: 0 7px 20px rgba(37, 60, 77, 0.2);
            }
        }
    }
</style>