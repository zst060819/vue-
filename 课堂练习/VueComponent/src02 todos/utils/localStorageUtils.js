export function readTodos() {
  return JSON.parse(window.localStorage.getItem('todos_key')) || []
}

export function saveTodos(todos) {
  window.localStorage.setItem('todos_key', JSON.stringify(todos))
}