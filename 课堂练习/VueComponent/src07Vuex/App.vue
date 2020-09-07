<template>
  <div>
   <h2>点击次数:{{count}},奇数or偶数:{{evenOrOdd}}</h2>
   <button @click="increment">increment</button>
   <button @click="decrement">decrement</button>
   <button @click="incrementOrOdd">incrementOrOdd</button>
   <button @click="incrementAsync">incrementAsync</button>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters, mapMutations} from 'vuex'
export default {
  name: 'App',

  computed: {
    ...mapState(['count']),
    ...mapGetters(['evenOrOdd'])
  },
  // methods:{
  //   increment(){
  //     this.$store.commit('increment')
  //   },
  //   decrement(){
  //     this.$store.commit('decrement')
  //   },
  //   incrementOrOdd(){
  //     this.$store.dispatch('incrementOrOdd')
  //   },
  //   incrementAsync(){
  //   }
  // }, 
  methods: {
    ...mapMutations(['increment', 'decrement']),
    ...mapActions(['incrementOrOdd', 'incrementAsync'])
  },
}
</script>

<style scoped>

</style>