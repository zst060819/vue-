<template>
  <section class="jumbotron">
      <h3 class="jumbotron-heading">Search Github Users</h3>
      <div>
        <input type="text" placeholder="enter the name you search" v-model.trim="searchName"/>
        <button @click="search">Search</button>
      </div>
    </section>
</template>

<script>
export default {
  name: 'Search',

  data() {
    return {
      searchName: ""
    }
  },

  methods: {
    search() {
      if(this.searchName) {
        this.$store.dispatch('search', this.searchName)
        this.searchName = ''
      }
    }
  },

}
</script>

<style scoped>

</style>
