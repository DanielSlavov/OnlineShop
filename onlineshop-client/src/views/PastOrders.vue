<template>
  <div id="wrapper">
    <table class="table column is-12">
      <thead>
        <tr>
          <th><abbr></abbr></th>
          <th>Артикули</th>
          <th><abbr>Дата</abbr></th>
          <th><abbr>На Стойност</abbr></th>
          <th><abbr></abbr></th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in pastOrders" v-bind:key="order.id">
          <th></th>
          <td>
            <a v-bind:href="'#/product/'+item.id"  v-for="item in order.products" v-bind:key="item.id">{{item.name}}<br>    </a>
          </td>
          <td>{{ order.date.substring(0,10) }}</td>
          <td>{{order.price}}.00лв</td>
          
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import ordersService from "../services/ordersService"


export default {
  name: "PastOrders",
  data() {
    return {
      pastOrders: []
    }
  },
  created() {
    this.getPastOrders()
  },
  methods: {
    getPastOrders() {
      ordersService.getPastOrders().then(res => {
        this.pastOrders = res.data.reverse()
        console.log(this.pastOrders)
      })
    }
  }

}
</script>

<style>
</style>
