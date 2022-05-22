<script>
import { Doughnut } from 'vue-chartjs';
import {mapActions, mapGetters} from "vuex";
export default {
  name: "PaymentsDiagram",
  extends: Doughnut,
  data () {
    return {
      chartData: {
        labels: [],
        datasets: [{
          backgroundColor: [
          ],
          data: [1000,	500,	1500,	1000, 1500, 500]
        }]
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
      }
    }
  },

  computed: {
    ...mapGetters('category', ['getCategoryList']),
    // ...mapGetters('payments', ['getPaymentsSums'])
  },

  methods: {
    ...mapActions('category', ['fetchCategoryList'])
  },



  async mounted () {
    await this.fetchCategoryList();
    this.chartData.labels = this.getCategoryList;
    let count = this.chartData.labels.length;
    let colors = [];
    for (let i = 1; i <= count; i++) {
      const red = Math.floor(Math.random() * 255);
      const green = Math.floor(Math.random() * 255);
      const blue = Math.floor(Math.random() * 255);
      colors.push(`rgba(${red},${green}, ${blue})`);
    }
    this.chartData.datasets[0].backgroundColor = [
      ...this.chartData.datasets[0].backgroundColor,
      ...colors
    ]
    this.renderChart(this.chartData, this.options)
  }
}
</script>
