<template>
  <div
    v-if="showProp"
    class="modal is-active"
  >
    <div
      v-on:click.stop="closeModal"
      class="modal-background"
    ></div>
    <div class=" container columns ">
      <div class="column is-4 ">
        <figure class="image">
          <img
            :src="api+'/img/'+product.image"
            alt="Placeholder image"
          >
        </figure>
      </div>
      <div class="content column is-6 is-offset-1">
        <strong>{{product.name}}</strong><br>
        <p
          v-for="(author,index) in product.Authors"
          :key="index"
        >{{author}}</p>

        <strong id="price">{{product.price}}.00лв</strong>   
        <span id="cart" class="icon has-text-info"><a class="button is-link"><i class="fas fa-cart-plus"></i>КУПИ</a></span>
        
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>

        {{product.description}}
      </div>

    </div>
    <button
      v-on:click="closeModal"
      class="modal-close is-large"
      aria-label="close"
    ></button>
  </div>
</template>

<script>
import config from "../../config.js";
export default {
  name: "ProductView",
  data() {
    return {
      api: config.API_URL
    };
  },
  props: ["product", "showProp"],
  methods: {
    closeModal() {
      this.$emit("hideProduct");
    }
  },
  created() {
    window.addEventListener("keydown", e => {
      if (e.key == "Escape") {
        this.closeModal();
      }
    });
  }
};
</script>

<style scoped>

#cart{
  color:black;
}

strong {
  font-size: 1.8vw;
}
#price{
  font-size: 1.4vw;
  margin-right: 2rem;
}
p {
  font-size: 1.3vw;
  font-weight: 400;
  
}
figure {
  /* -webkit-box-shadow: -1px 2px 141px -37px rgba(0,0,0,0.8);
-moz-box-shadow: -1px 2px 141px -37px rgba(0,0,0,0.8); */
  box-shadow: -1px 2px 141px -25px rgba(0, 0, 0, 0.8);
  pointer-events: none;
  
}
.content {
 
  /* height: 80vh; */
}
.container {
   padding-top: 4rem;
  padding-bottom:4rem;
  padding-left: 4rem;
  background-color: #ffffff;
}
</style>
