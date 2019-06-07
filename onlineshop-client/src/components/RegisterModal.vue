<template>
  <div class="modal is-active">
    <div v-on:click.stop="hideRegisterModal" class="modal-background"></div>
    <div class="modal-content">
      <div class="field">
        <label class="label">Име</label>
        <div class="control">
          <input
            v-model="name"
            class="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input
            v-model="email"
            class="input"
            v-bind:class="{
              'is-success': isEmailGood == 1,
              'is-danger': isEmailGood == -1
            }"
            type="text"
            placeholder=""
            value="bulma"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        <p
          class="help"
          v-bind:class="{
            'is-success': isEmailGood == 1,
            'is-danger': isEmailGood == -1
          }"
        >
          {{ emailAvailable }}
        </p>
      </div>

      <div class="field">
        <label class="label">Парола</label>
        <p class="control has-icons-left">
          <input
            v-model="password"
            class="input"
            type="password"
            placeholder="Парола"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <!-- <label class="label">Пак Парола</label> -->
        <p class="control has-icons-left">
          <input
            v-model="passwordRepeat"
            class="input"
            type="password"
            placeholder="Повторете паролата"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
        <p v-if="password != passwordRepeat" class="help is-danger">
          Паролите не съвпадат
        </p>
      </div>

      <!-- <div class="field">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" />
            I agree to the
            <a href="#">terms and conditions</a>
          </label>
        </div>
      </div> -->

      
      <div class="field is-grouped">
        <div class="control">
          <button @click="register" class="button is-link">
            Регистрация
          </button>
        </div>
        <div class="control">
          <button @click="hideRegisterModal()" class="button is-text">Отказ</button>
        </div>
      </div>
    </div>
    <button @click="hideRegisterModal()" class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
import userService from "../services/userService.js";
import { mapMutations } from "vuex";


export default {
  name: "RegisterModal",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      emailAvailable: "",
      isEmailGood: 0
    };
  },
  methods: {
    ...mapMutations(["hideRegisterModal"]),
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    register() {
      if (this.isEmailGood == 1 && this.password == this.passwordRepeat && this.name.length >= 2) {
        userService
          .register({
            name: this.name,
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.hideRegisterModal();
          })
          .catch(err => {
            this.$notify({ type: "warn", text: 'Грешка', });
          });
      } else {
        this.$notify({ type: "warn", text: 'Невалидни данни', });
      }
    }
  },
  watch: {
    email: function () {
      if (this.email.length <= 4) {
        this.emailAvailable = "";
        this.isEmailGood = 0;
        return;
      }
      if (this.validateEmail(this.email)) {
        userService.checkEmail(this.email).then(res => {
          if (res.data.exists == 1) {
            this.emailAvailable = "Мейлът е зает";
            this.isEmailGood = -1;
          } else {
            this.emailAvailable = "";
            this.isEmailGood = 1;
          }
        });
      } else {
        this.emailAvailable = "Невалиден мейл";
        this.isEmailGood = -1;
      }
    }
  }
};
</script>

<style>
</style>
