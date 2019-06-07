<template>
    <div >
        <div class="columns is-multiline">
            <div
                v-on:click="displayProduct(product.id)"
                v-for="product in products"
                :key="product.id"
                class="card column is-3"
            >
                <div class="card-image">
                    <figure class="image is-2by2">
                        <img :src="api+'/img/'+product.image" alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <strong class="is-4">{{product.name}}</strong>
                        </div>
                    </div>

                    <div class="content">
                        <p>{{product.category}}</p>
                        <br>
                        <p class="subtitle is-6">{{product.price}}.00 лв.</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- <product-view @hideProduct="hideProduct" :showProp="showModal"/> -->
    </div>
</template>

<script>
import productService from "../services/productService.js";
import config from "../../config.js";
// import ProductView from "./ProductView.vue";
import { mapMutations, mapState } from "vuex";
import router from "../router";

export default {
    name: "Products",
    components: {
        // ProductView
    },
    data() {
        return {
            books: [],
            api: config.API_URL,
            showModal: false,
            productToShow: {}
        };
    },
    computed: mapState(["products"]),
    created() {
        this.fetchProducts();
    },
    watch: {
        filter: function(filter) {
            this.filter = filter;
            this.fetchBooks(filter);
        }
    },
    methods: {
        ...mapMutations(["setCurrentProduct", "fetchProducts"]),
        // fetchBooks(filter={authors:[],genres:[]}){
        //   console.log(filter.genres[0])
        //     productService.getBooks(filter.authors,filter.genres)
        //     .then(res=>{
        //       console.log(res.data)
        //       this.books=res.data
        //     })
        // },
        displayProduct(index) {
            router.push("product/" + index);
        },
        hideProduct() {
            this.showModal = false;
            this.productToShow = {};
        }
    }
};
</script>

<style scoped>
.card-content {
    font-size: 1vw;
    text-align: center;
}

.card {
    box-shadow: none;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0;
}
img {
    /* pointer-events: none; */
    -webkit-user-select: none;
}
</style>
