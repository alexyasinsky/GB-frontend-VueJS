<script>
import { Doughnut } from 'vue-chartjs';
export default {
  name: "PaymentsDiagram",
  extends: Doughnut,
  data () {
    return {
      chartData: {
        labels: ["Babol",	"Cabanatuan",	"Daegu",	"Jerusalem"],
        datasets: [{
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          data: [1000,	500,	1500,	1000]
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
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
