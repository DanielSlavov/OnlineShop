<script>
import { Line } from 'vue-chartjs'
import ordersService from "../../services/ordersService"

export default {

  extends: Line,
  props: ['chartdata', 'options'],
  data() {
    return {
      orders: [],
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      data: [40, 39, 10, 40, 39, 80, 40,],
      testData:[]
    }
  },
  methods: {
    prepData() {
      let max =  new Date()
      let min = new Date(Math.min.apply(null, this.orders.map(d => new Date(d.date))))
      let dates = []
      // console.log(max.toISOString())
      for (var i = min; i <= max.addDays(1);) {
        // console.log(i.toISOString().substr(5,5).split('-').reverse().join('-'))
        this.testData[i.toISOString().substr(5,5).split('-').reverse().join('-')]=0
        i = i.addDays(1)
      }
      this.orders.forEach(o=>{
          this.testData[new Date(o.date).toISOString().substr(5,5).split('-').reverse().join('-')]+=o.price;
          
      })
      // console.log(this.testData)
        this.labels=Object.keys(this.testData);
        this.data=Object.values(this.testData);
        
    }
  },
  created() {
      ordersService.getAllOrders().then(res => {
      this.orders = res.data
      this.prepData()
      this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: 'Продажби в лв.',
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgb(54, 162, 235,0.7)',
          borderWidth:2,
          type:"line",
          borderJoinStyle:"miter",
          lineTension:0.1,
          spanGaps:false,
          data: this.data
        }
      ]
    }, {responsive: true, maintainAspectRatio: false })
    })
  }
}
</script>
