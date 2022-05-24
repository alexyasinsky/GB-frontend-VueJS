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

  computed: {
    ...mapGetters('categories', ['getCategoryColors']),
  },


  watch: {
    chart: function (newData) {
      const labels = Object.keys(newData);
      const data = Object.values(newData);
      const colors = this.getCategoryColors;
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

  created() {

  }


}
</script>
