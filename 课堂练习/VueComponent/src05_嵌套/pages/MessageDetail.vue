<template>
  <ul>
    <li>参数映射的props: {{_id}}---{{_title}}</li>
    <li>query参数: id2={{$route.query.id2}}, title={{$route.query.title}}</li>
    <li>id:{{$route.params.id}}</li>
    <li>title:{{detail.title}}</li>
    <li>content:{{detail.content}}</li>
  </ul>
</template>

<script>
const allDetails = [
  {id: 1, title: 'message001', content: 'message content001'},
  {id: 2, title: 'message002', content: 'message content002'},
  {id: 4, title: 'message004', content: 'message content004'},
]
export default {
  name: 'MessageDetail',
  props: ['_id', '_title'],
  data() {
    return {
      detail: {}
    }
  },

  mounted() {
    const id = this.$route.params.id * 1
    this.getDetail(id)
  },

  watch: {
    $route(to, from) {
      const id = to.params.id * 1
      this.getDetail(id)
    }
  },

  methods: {
    getDetail (id) {
      setTimeout(() => {
        const detail = allDetails.find(detail => detail.id === id)
        this.detail = detail
      }, 1000);
    }
  },
}
</script>

<style scoped>

</style>
