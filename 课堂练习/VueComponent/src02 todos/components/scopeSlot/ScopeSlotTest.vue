<template>
  <div>
    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <TodoList :data="todos">
      <template slot-scope="scope">
        <span v-if="scope.row.isComplete" style="color: green">{{scope.row.text}}</span>
        <span v-else>{{scope.row.text}}</span>
      </template>
    </TodoList>
    <hr>

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <TodoList :data="todos2">
      <template slot-scope="scope">
        <span :style="{color: scope.index%2 == 1 ? 'blue' : 'green'}">{{scope.index + 1}}---{{scope.row.text}}</span>
      </template>
    </TodoList>
  </div>
</template>

<script>
  import TodoList from './TodoList'
  export default {
    name: 'ScopeSlotTest',
    data () {
      return {
        todos: [
          {id: 1, text: 'AAA', isComplete: false},
          {id: 2, text: 'BBB', isComplete: false},
          {id: 3, text: 'CCC', isComplete: false},
          {id: 4, text: 'DDD', isComplete: true},
        ],
         todos2: [
          {id: 1, text: 'AAA2', isComplete: false},
          {id: 2, text: 'BBB2', isComplete: true},
          {id: 3, text: 'CCC2', isComplete: false},
          {id: 4, text: 'DDD2', isComplete: true},
        ]
      }
    },

    components: {
      TodoList
    }
  }
</script>
