import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[
    vuexPersist.plugin
  ],
  state: {
    usuario: '',
    senha: ''
  },
  mutations: {
    setUsuario(state, valor) {
      state.usuario = valor;
    },
    setSenha(state, valor) {
      state.senha = valor;
    }
  },
  actions: {
  },
  modules: {
  }
})