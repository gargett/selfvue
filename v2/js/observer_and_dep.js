function observer(data) {
  if (!data || typeof data !== 'object') {
        return;
  }
  Object.keys(data).forEach(function(key){
    defineReactive(data, key, data[key])
  })
}

function defineReactive(data, key, value) {
  var dep = new Dep()
  observer(value)
  Object.defineProperty(data, key, {
    enumerable:true,
    configurable:true,
    get:function(){
      console.log('被获取')
      if (Dep.target) {  //只在watcher初始化的时候才订阅
        dep.addWatcher(Dep.target); // 在这里添加一个订阅者
      }
	    return value
    },
    set:function(newVal){
      console.log(key+'被修改，新的值为:'+newVal)
      if (value != newVal) {  //如果数据改变才去通知
        value = newVal
        dep.notify()
      }
    }
  })
}

//发布者，用于收集watcher，发送通知
function Dep() {
  this.watchers = []
}
Dep.prototype.addWatcher = function(watcher) {
  this.watchers.push(watcher)
}
Dep.prototype.notify = function() {
  this.watchers.forEach(function(watcher){
    watcher.update()
  })
}
Dep.target = null;  //wathcer实例化的时候，target设为它，再调用需要监听的属性（这时就会调用get）
                    //然后就能将watcher加进去对应的发布者
                    //接着再把target改回null
