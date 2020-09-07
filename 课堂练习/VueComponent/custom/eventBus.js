(function (window) {
  // 定义事件总线对象
  const eventBus = {}

  let listenerContainer = {}

  // 1.绑定事件监听
  eventBus.on = function (eventName, listener) {
    const listeners = listenerContainer[eventName]
    if(!listeners){
      listenerContainer[eventName] = [listener]
    } else {
      listeners.push(listener)
    }
  }


  // 2.分发事件
  eventBus.emit = function (eventName, data) {
    const listeners = listenerContainer[eventName]
    if (listeners && listeners.length>0) {
      listeners.forEach(listener => listener(data))
    }
  }




  // 3.解绑事件
  eventBus.off = function (eventName) {
    if (eventName===undefined) {
      listenerContainer = {}
    } else if (typeof eventName === 'string') {
      delete listenerContainer[eventName]
    }else {
      throw new Error('事件名可以不传或者为字符串')
    }
  }






  window.eventBus = eventBus
})(window)