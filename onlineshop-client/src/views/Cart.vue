<template>
  <div id="wrapper columns ">
    <table class="table column is-5">
      <thead>
        <tr>
          <th><abbr title="Position"></abbr></th>
          <th>Име</th>
          <th><abbr title="Played">Цена</abbr></th>
          <th><abbr title="Won"></abbr></th>
          <th><abbr title="Drawn"></abbr></th>
          <th><abbr title="Lost"></abbr></th>
          <th><abbr title="Lost"></abbr></th>
          <th><abbr title="Lost"></abbr></th>
          <th><abbr title="Lost"></abbr></th>

          <th><abbr title="Goals for">Премахване</abbr></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" v-bind:key="item.id">
          <th>{{ index + 1 }}</th>
          <td>
            <a v-bind:href="'#/product/' + item.id">{{ item.name }}</a>
          </td>
          <td>{{ item.price }}.00лв</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <i
              @click="removeFromCart(index)"
              class="column is-1 fas fa-times"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>
    <a
      v-if="!ordering && cart.length > 0"
      @click="ordering = true"
      class="button is-primary"
      >Поръчване</a
    >
    <div v-if="ordering && cart.length > 0" id="form" class="column is-7">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Имена</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input
                class="input"
                type="text"
                v-model="firstName"
                placeholder="Име"
              />
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input
                class="input "
                type="email"
                v-model="lastName"
                placeholder="Фамилия"
                v-bind:class="{ 'is-danger': lastName == '' }"
              />
              <!-- <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span> -->
              <!-- <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span> -->
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Телефон</label>
        </div>
        <div class="field-body">
          <div class="field is-expanded">
            <div class="field has-addons">
              <p class="control">
                <!-- <a class="button is-static">
                  +44
                </a> -->
              </p>
              <p class="control is-expanded">
                <input
                  class="input"
                  type="tel"
                  v-model="phone"
                />
              </p>
            </div>
            <!-- <p class="help">Do not enter the first zero</p> -->
          </div>
        </div>
      </div>

      <!-- <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Department</label>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <div class="select is-fullwidth">
                <select>
                  <option>Business development</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">До </label>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <label class="radio">
                <input type="radio" checked="checked" name="member" />
                Адрес
              </label>
              <label class="radio">
                <input type="radio" name="member" />
                Офис
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Населено място</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Град/Село"
                v-model="place"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Адрес</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="квартал/улица/номер/вх/ап"
                v-model="address"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Доп. Инфо.</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <textarea
                class="textarea"
                placeholder="Не е задължително"
                v-model="details"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label">
          <!-- Left empty for spacing -->
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <button @click="order()"    class="button is-primary">
                Поръчване
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router"
import { mapState, mapMutations } from 'vuex'
import ordersService from '../services/ordersService'

export default {
  name: "Cart",
  computed: mapState(['cart', "currentUser"]),
  methods: {
    ...mapMutations(["removeFromCart","clearCart"]),
    order() {
      let price=0
      this.cart.forEach(item => {
        price+=item.price
      });
    ordersService.makeOrder(this.currentUser.id,price,this.details,this.cart,this.place,this.address,this.phone,this.firstName+ " "+this.lastName)
    .then(res=>{
      this.$notify({ type: "success", text: 'Поръчката е направена!', });
      this.clearCart()
      router.push('/')
    })
    }
  },
  data() {
    return {
      ordering: false,
      firstName: "",
      lastName: "",
      phone: "",
      place: "",
      address: "",
      details: ""
    }
  },
  created() {
    // console.log(this.currentUser)
    this.firstName = this.currentUser.name.split(' ')[0]
    this.lastName = this.currentUser.name.split(' ')[1]
  }

}
</script>

<style scoped>
</style>
