<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">
        <router-link :to="`/home/message/detail/${message.id}?id2=${message.id}&title=${message.title}`">
          {{message.title}}
        </router-link>
        --<button @click="pushShow(message.id)">push查看</button>
        --<button @click="replaceShow(message.id)">replace查看</button>
      </li>
    </ul>
    <button @click="$router.back()">返回</button>
    <button @click="$router.forward()">前进</button>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'Message',
  data() {
    return {
      messages: []
    }
  },
  mounted() {
    setTimeout(() => {
      const messages = [
        {id: 1, title: 'message001'},
        {id: 2, title: 'message002'},
        {id: 4, title: 'message004'}
      ]
      this.messages = messages
    }, 1000);
  },

  methods: {
    pushShow (id2) {
    // this.$router.push(`/home/message/detail/${id}`)
      this.$router.push({
        name: 'Detail',
        params: {
          id: id2
        },
        query: {
          title: 'abc'
        }
      })
    },
    // replaceShow (id) {
    // // this.$router.replace(`/home/message/detail/${id}`)
    //   router.repliace(`/home/message/detail/${id}`)
    // }
    replaceShow (id) {
      // this.$router.replace(`/home/message/detail/${id}`)
      router.replace(`/home/message/detail/${id}`)
    }
  },
}
</script>

<style scoped>

</style>
