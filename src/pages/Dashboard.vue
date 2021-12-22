<template>
  <div>

    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h2 class="card-title">Яг одоогийн эрчим хүч</h2>
              </div>
              <!-- <div class="col-sm-6">
                <button class="btn btn-sm btn-primary btn-simple" 
                      @click="downloadFile()"
                      >Хүснэгт татах</button>
              </div> -->
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle"
                     :class="isRTL ? 'float-left' : 'float-right'"
                     data-toggle="buttons">
                  <!-- <label v-for="(option, index) in bigLineChartCategories"
                         :key="option"
                         class="btn btn-sm btn-primary btn-simple"
                         :class="{active: bigLineChart.activeIndex === index}"
                         :id="index"> -->
                         <button class="btn btn-sm btn-primary btn-simple" 
                      @click="downloadFile()"
                      >Хүснэгт татах</button>
                    <!-- <input type="radio"
                           @click="initBigChart(index)"
                           name="options" autocomplete="off"
                           :checked="bigLineChart.activeIndex === index"> -->
                    <!-- {{option}} -->
                  <!-- </label> -->
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="bigChart"
                        chart-id="big-line-chart"
                        :chart-data="bigLineChart.chartData"
                        :gradient-colors="bigLineChart.gradientColors"
                        :gradient-stops="bigLineChart.gradientStops"
                        :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div>
          <v-row align="center">
            <p>Хугацаа</p>
          </v-row>
          <p>Ватт</p>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h3 class="card-title"><i class="tim-icons icon-bell-55 text-primary "></i>Чийгшилийн утга</h3>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        chart-id="purple-line-chart"
                        :chart-data="humidityLineChart.chartData"
                        :gradient-colors="humidityLineChart.gradientColors"
                        :gradient-stops="humidityLineChart.gradientStops"
                        :extra-options="humidityLineChart.extraOptions">
            </line-chart>
          </div>
          <v-row align="center">
            <p>Хугацаа</p>
          </v-row>
          <p>Хувь</p>
        </card>
      </div>
      <!-- <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.dailySales')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info "></i> 3,500€</h3>
          </template>
          <div class="chart-area">
            <bar-chart style="height: 100%"
                       chart-id="blue-bar-chart"
                       :chart-data="blueBarChart.chartData"
                       :gradient-stops="blueBarChart.gradientStops"
                       :extra-options="blueBarChart.extraOptions">
            </bar-chart>
          </div>
        </card>
      </div> -->
      <div class="col-lg-6" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h3 class="card-title"><i class="tim-icons icon-send text-success "></i>Температурын утга</h3>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        chart-id="green-line-chart"
                        :chart-data="temperatureLineChart.chartData"
                        :gradient-stops="temperatureLineChart.gradientStops"
                        :extra-options="temperatureLineChart.extraOptions">
            </line-chart>
          </div>
          <p>Цельс</p>
          <v-row align="center">
            <p>Хугацаа</p>
          </v-row>
        </card>
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-lg-6 col-md-12">
        <card type="tasks" :header-classes="{'text-right': isRTL}">
          <template slot="header">
            <h6 class="title d-inline">{{$t('dashboard.tasks', {count: 5})}}</h6>
            <p class="card-category d-inline">{{$t('dashboard.today')}}</p>
            <base-dropdown menu-on-right=""
                           tag="div"
                           title-classes="btn btn-link btn-icon"
                           aria-label="Settings menu"
                           :class="{'float-left': isRTL}">
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.action')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.anotherAction')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.somethingElse')}}</a>
            </base-dropdown>
          </template>
          <div class="table-full-width table-responsive">
            <task-list></task-list>
          </div>
        </card>
      </div>
      <div class="col-lg-6 col-md-12">
        <card class="card" :header-classes="{'text-right': isRTL}">
          <h4 slot="header" class="card-title">{{$t('dashboard.simpleTable')}}</h4>
          <div class="table-responsive">
            <user-table></user-table>
          </div>
        </card>
      </div>
    </div> -->
  </div>
</template>
<script>
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import TaskList from './Dashboard/TaskList';
  import UserTable from './Dashboard/UserTable';
  import config from '@/config';
  import axios from 'axios';

  export default {
    components: {
      LineChart,
      BarChart,
      TaskList,
      UserTable
    },
    data() {
      return {
        ds: this.$root.ds,
        bigLineChart: {
          power: [],
          powerLabel: [],
          activeIndex: 0,
          chartData: {
            labels: [],
            datasets: [{ }]
          },
          extraOptions: chartConfigs.purpleChartOptions,
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
          categories: []
        },
        humidityLineChart: {
          humidity: [],
          humidityLabel: [],
          extraOptions: chartConfigs.purpleChartOptions,
          chartData: {
            labels: [],
            datasets: [{ }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.2, 0],
        },
        temperatureLineChart: {
          temperature: [],
          temperatureLabel: [],
          extraOptions: chartConfigs.greenChartOptions,
          chartData: {
            labels: [],
            datasets: [{ }]
          },
          gradientColors: ['rgba(66,134,121,0.15)', 'rgba(66,134,121,0.0)', 'rgba(66,134,121,0)'],
          gradientStops: [1, 0.4, 0],
        }
        // blueBarChart: {
        //   extraOptions: chartConfigs.barChartOptions,
        //   chartData: {
        //     labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
        //     datasets: [{
        //       label: "Countries",
        //       fill: true,
        //       borderColor: config.colors.info,
        //       borderWidth: 2,
        //       borderDash: [],
        //       borderDashOffset: 0.0,
        //       data: [53, 20, 10, 80, 100, 45],
        //     }]
        //   },
        //   gradientColors: config.colors.primaryGradient,
        //   gradientStops: [1, 0.4, 0],
        // }
      }
    },
    created: function() {
      this.record = this.ds.record.getRecord('chart');
    
      this.record.subscribe(values => {
        console.log(values.chart)
        if(values.chart !== undefined){
          if(this.bigLineChart.power.length == 12){
            this.bigLineChart.power = this.bigLineChart.power.slice(this.bigLineChart.power.length-11,this.bigLineChart.power.length)
            this.bigLineChart.powerLabel = this.bigLineChart.powerLabel.slice(this.bigLineChart.powerLabel.length-11,this.bigLineChart.powerLabel.length)
          }
          if(this.temperatureLineChart.temperature.length == 5){
            this.temperatureLineChart.temperature = this.temperatureLineChart.temperature.slice(this.temperatureLineChart.temperature.length-4,this.temperatureLineChart.temperature.length)
            this.temperatureLineChart.temperatureLabel = this.temperatureLineChart.temperatureLabel.slice(this.temperatureLineChart.temperatureLabel.length-4,this.temperatureLineChart.temperatureLabel.length)
          }
          if(this.humidityLineChart.humidity.length == 5){
            this.humidityLineChart.humidity = this.humidityLineChart.humidity.slice(this.humidityLineChart.humidity.length-4,this.humidityLineChart.humidity.length)
            this.humidityLineChart.humidityLabel = this.humidityLineChart.humidityLabel.slice(this.humidityLineChart.humidityLabel.length-4,this.humidityLineChart.humidityLabel.length)
          }
          for (let index = 0; index < values.chart.length; index++) {
            this.bigLineChart.power.push(values.chart[index].pvalue)
            this.bigLineChart.powerLabel.push(values.chart[index].date)
            this.humidityLineChart.humidity.push(values.chart[index].hvalue)
            this.humidityLineChart.humidityLabel.push(values.chart[index].date)
            this.temperatureLineChart.temperature.push(values.chart[index].tvalue)
            this.temperatureLineChart.temperatureLabel.push(values.chart[index].date)
            this.initBigChart();
            this.initTemperatureChart();
            this.initHumidityChart();
            console.log(values.chart[index].date)
            console.log(values.chart[index].pvalue)
            console.log(values.chart[index].hvalue)
            console.log(values.chart[index].tvalue)
          }
        }      
      })
    },
    computed: {
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
      bigLineChartCategories() {
        return this.$t('dashboard.chartCategories');
      }
    },
    methods: {
      initBigChart(index) {
        let chartData = {
          datasets: [{
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.power//BAAZAAS SUULIIN 12 DATA AVAH
          }],
          labels: this.bigLineChart.powerLabel
        }
        // this.$refs.bigChart.updateGradients(chartData);
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      },
      initTemperatureChart(){
        let chartData = {
          datasets: [{
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.temperatureLineChart.temperature
            }],
          labels: this.temperatureLineChart.temperatureLabel
        }
        // this.$refs.bigChart.updateGradients(chartData);
        this.temperatureLineChart.chartData = chartData;
        // this.bigLineChart.activeIndex = index;
      },
      initHumidityChart(){
        let chartData = {
          datasets: [{
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.humidityLineChart.humidity
            }],
          labels: this.humidityLineChart.humidityLabel
        }
        // this.$refs.humidityLineChart.updateGradients(chartData);
        this.humidityLineChart.chartData = chartData;
      }
    },
    mounted() {
      this.i18n = this.$i18n;
      // this.downloadFile();
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
      this.initBigChart();
    },
    beforeDestroy() {
      if (this.$rtl.isRTL) {
        this.i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    }
  };
</script>
<style>
</style>
