<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- <Header @addTodo="addTodo" /> -->
      <Header ref="header"/>
      <!-- 通过标签属性传递数据 -->
      <List :todos="todos"/>
      <Footer>
        <template slot="Left">
          <input type="checkbox" v-model="isCheckAll" />
        </template>
        <template ref="Right">
          <button class="btn btn-danger" v-show="completeSize>0" 
          @click="clearCompleteTodos">清除已完成任务</button>
        </template>
        <span>
          <span>已完成{{completeSize}}</span> / 全部{{todos.length}}
        </span>
      <!-- <Footer :todos="todos" :checkAllTodos="checkAllTodos" 
      :clearCompleteTodos="clearCompleteTodos"/> -->
      </Footer>

      <hr>
      <ScopeSlotTest/>
    </div>
  </div>
</template>

<script>
import PubSub from 'pubsub-js'
// 引入子组件
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import ScopeSlotTest from './components/scopeSlot/ScopeSlotTest.vue'
import {readTodos, saveTodos} from './utils/localStorageUtils'
export default {
  name: 'App',

  data() {
    return {
      todos: readTodos()
    }
  },
  mounted() {
    this.$refs.header.$on("addTodo", this.addTodo)
    this.$bus.$on("deleteTodo",this.deleteTodo)
    PubSub.subscribe("updateTodo", (msg, {todo, isCheck}) => {
      this.updateTodo(todo, isCheck)
    })
  },

  beforeDestroy() {
    this.$refs.header.$off('addTodo')
    this.$bus.$off('deleteTodo')
  },

  computed: {
    completeSize() {
      let size = 0;
      this.todos.forEach((todo) => {
        if (todo.complete) size++;
      });
      return size;
    },
    isCheckAll: {
      get() {
        return this.todos.length === this.completeSize && this.completeSize > 0;
      },
      set(value) {
        this.checkAllTodos(value);
      },
    },
  },

  watch: {
    todos: {
      deep: true,
      handler: saveTodos
    }
  },
  methods: {
    addTodo (title) {
      const todo = {
        id: Date.now(),
        complete: false,
        title,
      }
      this.todos.unshift(todo)
    },
    deleteTodo (index) {
      this.todos.splice(index, 1)
    },
    updateTodo (todo, isCheck) {
      todo.complete = isCheck
    },
    checkAllTodos(isCheck) {
      this.todos.forEach(todo => todo.complete = isCheck)
    },
    clearCompleteTodos () {
      this.todos = this.todos.filter(todo => !todo.complete)
    }
  },

 

  // 局部注册
  components: {
    Header,
    List,
    Footer,
    ScopeSlotTest
  }
}
</script>

<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
