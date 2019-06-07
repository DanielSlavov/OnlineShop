<template>
  <div id="wrapper" class="">
    <aside class="menu">
      <p class="menu-label">Меню</p>
      <ul class="menu-list">
        <li>
          <a href="#/" v-bind:class="{ 'is-active': $route.path == '/' }"
            >Продукти</a
          >
          <a v-if="currentUser.privilege==0"
            href="#/user/cart"
            v-bind:class="{ 'is-active': $route.path.startsWith('/user') }"
            >Поръчка</a
          >
          <a v-if="currentUser.privilege==1"
            href="#/admin/orders"
            v-bind:class="{ 'is-active': $route.path.startsWith('/admin') }"
            >Admin Panel</a
          >
        </li>
      </ul>

      <div class="menuSection" v-if="$route.path == '/'">
        <p class="menu-label">Катеогрии</p>
        <ul class="menu-list">
          <li>
            <ul>
              <li class="categories">
                <a
                  v-bind:class="{ 'has-background-info': category == false }"
                  v-on:click="setCategory(false)"
                  >Всички
                </a>
                <a
                  v-for="(cat, index) in categories"
                  v-on:click="setCategory(cat)"
                  :key="index"
                  v-bind:class="{ 'has-background-info': category == cat }"
                  >{{ cat }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="menuSection" v-if="$route.path.startsWith('/user')">
        <p class="menu-label">Катеогрии</p>
        <ul class="menu-list">
          <li>
            <ul>
              <li class="categories">
                <a v-bind:class="{ 'has-background-info': $route.path.startsWith('/user/cart') }" href="#/user/cart">Количка</a>
                <a v-bind:class="{ 'has-background-info': $route.path.startsWith('/user/past-orders') }" href="#/user/past-orders">Минали Поръчки</a>
                <!-- <a v-bind:class="{ 'has-background-info': $route.path.startsWith('/user/settings') }" href="#/user/settings">Настройки</a> -->
              </li>
            </ul>
          </li>
        </ul>
       
      </div>

      <div class="menuSection" v-if="$route.path.startsWith('/admin')">
        <p class="menu-label">Катеогрии</p>
        <ul class="menu-list">
          <li>
            <ul>
              <li class="categories">
                <a v-bind:class="{ 'has-background-info': $route.path.startsWith('/admin/orders') }" href="#/admin/orders">Поръчки</a>
                <a v-bind:class="{ 'has-background-info': $route.path.startsWith('/admin/sales') }" href="#/admin/sales">Продажби</a>
                <a v-bind:class="{ 'has-background-info': $route.path.startsWith('/admin/addproduct') }" href="#/admin/addproduct">Добавяне/Премахване на артикул</a>
              </li>
            </ul>
          </li>
        </ul>
        <!-- <p class="menu-label">Authors</p>
        <ul class="menu-list">
          <li>
            <a>Payments</a>
          </li>
          <li>
            <a>Transfers</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
        </ul> -->
      </div>

      
    </aside>
  </div>
</template>

<script>
import productService from "../services/productService.js";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Sidebar",

  data() {
    return {
      categories: [],
      fetched: false,
      active: false
    };
  },
  created() {
    this.fetchCategories();
  },
  computed: mapState(["category", "section","currentUser"]),
  methods: {
    ...mapMutations(["setCategory"]),
    fetchCategories() {
      productService.getCategories().then(res => {
        this.categories = res.data;
      });
    }
  },
  watch: {
    active: function (newEl, oldEl) {
      if (oldEl) {
        oldEl.classList.remove("is-active");
      }
      newEl.classList.add("is-active");
    }
  }
};
</script>

<style scoped>
/* ::-webkit-scrollbar {
      width:5px;
    } */
.genres {
  /* overflow-x: hidden; */
  overflow-y: scroll;
  height: 35rem;
}
#wrapper {
  /* width:20vw;*/
  /* margin-right:50 vw; */
}
.has-background-info{
  color:white;
}
.has-background-info:hover{
  color:white;
}
</style>
