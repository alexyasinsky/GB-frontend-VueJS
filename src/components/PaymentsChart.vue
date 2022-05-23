<script>
import { Doughnut } from 'vue-chartjs';
import {mapGetters} from "vuex";
export default {
  name: "PaymentChart",
  extends: Doughnut,
  props: {
    chart: Object
  },
  data () {
    return {
      options: {
        legend: {
          display: true,
          position: 'right'
        },
        height: 200,
        width: 200,
        responsive: false,
        maintainAspectRatio: false
      },
    }
  },

  computed: {
    ...mapGetters('payments', ['getPaymentsSums', 'getPaymentsData'])
  },

  methods: {
    generateColors(count) {
      let colors = [];
      for (let i = 1; i <= count; i++) {
        const red = Math.floor(Math.random() * 255);
        const green = Math.floor(Math.random() * 255);
        const blue = Math.floor(Math.random() * 255);
        colors.push(`rgba(${red},${green}, ${blue})`);
      }
      return colors;
    },
    setChartData(propsData) {
      const labels = Object.keys(propsData);
      this.chartData.labels = [...labels];
      const colors = this.generateColors(Object.keys(propsData).length);
      this.chartData.datasets[0].backgroundColor = [...colors];
      const values = Object.values(propsData)
      this.chartData.datasets[0].data = [...values];
    }
  },

  watch: {
    chart: function (newData) {
      console.log(newData, 'watcher');
      this.renderChart(newData, this.options);
    }
  },


}
</script>
