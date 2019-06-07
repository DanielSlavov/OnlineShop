<template>
    <div id="wrapper columns ">
  <table class="table column is-12">
      <thead>
        <tr>
          <th>Артикули</th>
          <th><abbr>Дата</abbr></th>
          <th><abbr>На Стойност</abbr></th>
          <th><abbr>Информация</abbr></th>
          <th><abbr>Обработена</abbr></th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" v-bind:key="order.id">
          <td>
            <a v-bind:href="'#/product/'+item.id"  v-for="item in order.products" v-bind:key="item.id">{{item.name}}<br>    </a>
          </td>
          <td>{{ order.date.substring(0,10) }}</td>
          <td>{{order.price}}.00лв</td>
          <td>
              {{order.name}}<br>
              {{order.phone}}<br>
              {{order.place}}<br>
              {{order.address}}
              </td>
            <td v-if="order.status">Да</td>
            <td v-else><button @click="completeOrder(order.id,index)" class="button">обработване</button></td>
          
        </tr>
      </tbody>
    </table>
    </div>
</template>

<script>
import ordersService from "../../services/ordersService"
export default {
data(){
    return{
        orders:[]
    }
},
created(){
    ordersService.getAllOrders().then(res=>{
        this.orders=res.data.reverse()
    })
},
methods:{
    completeOrder(order_id,index){
        this.orders[index].status=1
        ordersService.completeOrder(order_id).then(res=>{
            //location.reload()
        })
    }
}
}
</script>

<style>

</style>
