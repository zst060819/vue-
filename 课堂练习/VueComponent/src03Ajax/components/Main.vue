<template>
  <div>
    <h2 v-if="firstView">输入名称进行搜索</h2>
    <h2 v-else-if="loading">正在请求加载中...</h2>
    <h2 v-else-if="errorMsg">{{errorMsg}}</h2>
    <div class="row" v-else>
      <div class="card" v-for="user in users" :key="user.id">
        <a :href="user.url" target="_blank">
          <img :src="user.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Main',

  data() {
    return {
      firstView: true, // 是否显示第一个界面
      loading: false, // 是否正在请求加载中
      users: [], // 请求得到的所有用户的数组
      errorMsg: '', // 需要显示的请求错误信息
    }
  },

  mounted() {
    this.$bus.$on('search', async (searchName) => {
      this.firstView = false
      this.loading = true
      // axios.get('https://api.github.com/search/users', {
      // axios.get('/api/search/users2', {
      //   params: {
      //     q: searchName
      //   }
      // }).then(response => {
      //   const result = response.data
      //   const items = result.items
      //   const users = items.map(item => ({
      //     id: item.id, 
      //     avatar_url: item.avatar_url, 
      //     name: item.login, 
      //     url: item.html_url
      //   }))
      //   this.loading = false
      //   this.users = users
      // }).catch(error => {
      //   this.loading = false
      //   this.errorMsg = error.message || "未知错误..."
      // })
      try {
        const response = await axios.get('/api/search/users2', {
          params: {
            q: searchName
          }
        })
        // 成功了, 更新数据(成功)
        const result = response.data
        // 从响应数据中取出users  , user的结构为: {id, avatar_url, name, url}
        const items = result.items // users中的user结构为 {id, avatar_url, login, html_url, ...} 
        const users = items.map(item => ({
          id: item.id, 
          avatar_url: item.avatar_url, 
          name: item.login, 
          url: item.html_url
        }))
        // 更新数据
        this.loading = false
        this.users = users
      } catch (error) { // 失败了, 更新数据(失败)
         this.loading = false
         this.errorMsg = error.message || '未知错误'
      }
    })
  },
}
</script>

<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: .75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: .75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>
