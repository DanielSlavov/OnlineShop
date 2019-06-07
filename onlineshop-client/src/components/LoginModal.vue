<template>
  <div class="modal is-active">
    <div v-on:click.stop="hideLoginModal" class="modal-background"></div>
    <div class="modal-content columns">
      <div class="wrapper column is-8 is-offset-2">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              v-model="email"
              class="input"
              type="email"
              placeholder="E-mail"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
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
          <p class="control">
            <button v-on:click="Login" class="button is-success">Login</button>
          </p>
        </div>
      </div>
    </div>
    <button
      class="modal-close is-large"
      @click="hideLoginModal"
      aria-label="close"
    ></button>
  </div>
</template>

<script>
import userService from "../services/userService";
import { mapMutations } from "vuex";
import router from "../router";

export default {
  name: "LoginModal",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  created() {
    window.addEventListener("keydown", e => {
      if (e.key == "Escape") {
        this.hideLoginModal();
      }
    },
      { once: true }
    );
  },
  methods: {
    ...mapMutations(["hideLoginModal"]),
    Login() {
      userService
        .login(this.email, this.password)
        .then(res => {
          this.hideLoginModal();
        })
        .catch(res => {
          this.$notify({ type: "warn", text: 'Невалидни данни', });
        });
    }
  }
};
</script>

<style>
.modal-content {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 0.2rem;
  padding: 6rem 2rem;
  width: 500px;
  /* width:40%;
     */
}
</style>
