<template>
  <div id="wrapper">
    <aside class="menu" v-if="section!='user'">
      <p class="menu-label">General</p>
      <ul class="menu-list">
        <li>
          <a href="#/"    v-bind:class="{'is-active':section=='books'}">Books</a>
        </li>
        <li>
          <a   href="#/merch" v-bind:class="{'is-active':section=='merch'}">Merch</a>
        </li>
      </ul>

      <div v-if="section=='books'" class='menuSection'>
        <p class="menu-label">Жанрове</p>
        <ul class="menu-list">
          <li>
            <ul>
              <li class="genres">
                <a v-on:click="clearFilter">All</a>
                <a
                  v-for="genre in genres "
                  v-on:click="changeFilter"
                  :key="genre.id"
                  :data-key="genre.id"
                >{{genre.name}}</a>
              </li>
            </ul>
          </li>
        </ul>
        <p class="menu-label">Authors</p>
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
        </ul>
      <!-- </aside> -->
      </div>

       <div v-if="section=='merch'" class='menuSection'>
        <p class="menu-label">категории</p>
        <ul class="menu-list">
          <li>
            <ul>
              <li class="genres">
                <a v-on:click="clearFilter">All</a>
                <a
                  v-for="genre in genres "
                  :key="genre.id"
                  :data-key="genre.id"
                >category</a>
              </li>
            </ul>
          </li>
        </ul>
        <p class="menu-label">Authors</p>
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
        </ul>
      <!-- </aside> -->
      </div>



      <div v-if="section=='user'" class='menuSection'>
        <p class="menu-label">категории</p>
        <ul class="menu-list">
          <li>
            <ul>
              <li class="genres">
                <a v-on:click="clearFilter">All</a>
                <a
                  v-for="genre in genres "
                  :key="genre.id"
                  :data-key="genre.id"
                >category </a>
              </li>
            </ul>
          </li>
        </ul>
        <p class="menu-label">Authors</p>
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
        </ul>
      <!-- </aside> -->
      </div>

    </aside>

    <aside class="menu" v-else>
      <p class="menu-label">Поръчки</p>
      <ul class="menu-list">
        <li>
          <a    >Books</a>
        </li>
        <li>
          <a   >Merch</a>
        </li>
      </ul>

      <div v-if="section=='books'" class='menuSection'>
        <p class="menu-label">Жанрове</p>
        <ul class="menu-list">
          <li>
            <ul>
              <!-- <li class="genres">
                <a v-on:click="clearFilter">All</a>
                <a
                  v-for="genre in genres "
                  v-on:click="changeFilter"
                  :key="genre.id" 
                  :data-key="genre.id"
                >{{genre.name}}</a>
              </li> -->
            </ul>
          </li>
        </ul>
        <p class="menu-label">Authors</p>
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
        </ul>
      <!-- </aside> -->
      </div>

       <div v-if="section=='merch'" class='menuSection'>
        <p class="menu-label">категории</p>
        <ul class="menu-list">
          <li>
            <ul>
              <li class="genres">
                <a v-on:click="clearFilter">All</a>
                <a
                  v-for="genre in genres "
                  :key="genre.id"
                  :data-key="genre.id"
                >Психическо здраве Психическо здраве Психическо здраве Психическо здраве Психическо здраве Психическо здраве Психическо здраве Психическоздраве Психическо здраве Психическо здраве Психическо здраве </a>
              </li>
            </ul>
          </li>
        </ul>
        <p class="menu-label">Authors</p>
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
        </ul>
      <!-- </aside> -->
      </div>



      <div v-if="section=='user'" class='menuSection'>
        <p class="menu-label">категории</p>
        <ul class="menu-list">
          <li>
            <ul>
              <li class="genres">
                <a v-on:click="clearFilter">All</a>
                <a
                  v-for="genre in genres "
                  :key="genre.id"
                  :data-key="genre.id"
                >Психическо здраве Психическо здраве Психическо здраве Психическо здраве Психическо здраве Психическо здраве Психическо здраве Психическоздраве Психическо здраве Психическо здраве Психическо здраве </a>
              </li>
            </ul>
          </li>
        </ul>
        <p class="menu-label">Authors</p>
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
        </ul>
      <!-- </aside> -->
      </div>

    </aside>



  </div>
</template>

<script>
import productService from "../services/productService.js";
import {mapState,mapMutations} from "vuex"


export default {
  name: "Sidebar",

  data() {
    return {
      genres: [],
      fetched: false,
      active: false,
      //section: "books"
    };
  },
  created() {
    this.fetchGenres();
    //this.fetchBooks();
  },
  computed: mapState({ section:"sidebarSection"}),
  methods: {
    ...mapMutations(['setSidebarSection']),
    fetchGenres() {
      productService.getGenres().then(res => {
        this.genres = res.data;
      });
    },
    changeFilter(event) {
      this.active = event.target;
      this.$emit("changeFilter", { genres: [event.target.dataset.key] });
    },
    clearFilter(event) {
      this.active = event.target;
      this.$emit("changeFilter");
    }
  },
  watch: {
    active: function(newEl, oldEl) {
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
#wrapper{
  /* width:20vw;*/
  /* margin-right:50 vw; */
}


</style>
