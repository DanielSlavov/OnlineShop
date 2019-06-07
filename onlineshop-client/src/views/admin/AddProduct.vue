<template>
  <div id="wrapper" class="columns">
    <div id="form" class="column is-8">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Име</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input" v-model="name" type="text" placeholder="" />
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Категория</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input
                class="input"
                v-model="category"
                type="text"
                placeholder=""
              />
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Цена</label>
        </div>
        <div class="field-body">
          <div class="field has-addons">
            <p class="control">
              <input class="input" v-model="price" type="text" placeholder="" />
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Описание</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <textarea
                v-model="description"
                class="textarea"
                placeholder=""
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"></label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <div class="file">
                <label class="file-label">
                  <input
                    class="file-input"
                    accept="image/*"
                    @change="uploadImage($event)"
                    type="file"
                    name="image"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                      Изображение
                    </span>
                  </span>
                </label>
              </div>
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
              <button @click="add()" class="button is-primary">
                Добавяне
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-offset-1">
      <div class="dropdown" v-bind:class="{ 'is-active': dropdownActive }">
        <div class="dropdown-trigger">
          <button
            class="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            @click="dropdownActive=!dropdownActive"
          >
            <span>{{itemToRemove}}</span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a @click="itemToRemove=product.name;idToRemove=product.id;dropdownActive=false" v-for="product in products" v-bind:key="product.id" class="dropdown-item">
              {{product.name}}
            </a>
          </div>
        </div>
      </div>
      <button @click="remove()" class="button is-primary">
                Премахване
              </button>
    </div>
  </div>
</template>

<script>
import productService from "../../services/productService"
import { mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      data: new FormData(),
      name: "",
      price: "",
      description: "",
      category: "",
      itemToRemove: "Изберете продукт",
      idToRemove: -1,
      dropdownActive: false
    }
  },
  computed: mapState(['products']),
  methods: {
    ...mapMutations(['fetchAllProducts']),
    uploadImage(event) {
      this.data.delete('image')
      this.data.append('image', event.target.files[0]);
    },
    add() {
      this.data.append('name', this.name)
      this.data.append('price', this.price)
      this.data.append('description', this.description)
      this.data.append('category', this.category)

      productService.addProduct(this.data).then(res => {
        this.$notify({ type: "success", text: 'Артикулът е добавен', });
        location.reload();
      }).catch(err => {
        this.$notify({ type: "warn", text: 'Грешка! проверете данните', });
        this.data.delete("name")
        this.data.delete("price")
        this.data.delete("description")
        this.data.delete("category")
      })
      
    },
    remove(){
      if(this.idToRemove<0) return
      productService.removeProduct(this.idToRemove).then(res=>{
        this.$notify({ type: "success", text: 'Артикулът е премахнат', });
        location.reload();
        
      })
    }

  },
  created() {
    this.fetchAllProducts();
  }
}
</script>

<style scoped>

</style>
