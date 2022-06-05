<script>
import { Doughnut } from 'vue-chartjs';

export default {
  name: "DoughnutChart",
  extends: Doughnut,
  props: {
    chart: Object,
    colors: Array
  },
  data () {
    return {
      chartData: {
        labels: [],
        datasets: []
      },
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

  watch: {
    chart: function (newData) {
      const labels = Object.keys(newData);
      const data = Object.values(newData);
      const colors = this.colors;
      this.chartData = {
        labels: labels,
        datasets: [{
          backgroundColor: colors,
          data: data
        }]
      }
      this.renderChart(this.chartData, this.options);
    }

  },


}
</script>
