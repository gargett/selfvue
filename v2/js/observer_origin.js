function observe(data) {
  if (!data || typeof data !== 'object') {
        return;
  }
  Object.keys(data).forEach(function(key){
    defineReactive(data, key, data[key])
  })
}

function defineReactive(data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    enumerable:true,
    configurable:true,
    get:function(){
      console.log('被获取')
	  return value
    },
    set:function(newVal){
      console.log(key+'被修改，新的值为:'+newVal)
    }
  })
}

var obj = {a:{aa:1,aaa:2},b:3}
observer(obj)
obj.b = 4
obj.a.aa = 8
