function Observer(data) {
    this.data = data;
    this.walk(data);
    if (!this.isPlainObject(this.data)) {
        return
    }


}
Observer.prototype = {
    constructor: Observer,
    isPlainObject: function (obj) {
        if (Object.prototype.toString.call(obj) === '[object object]') {
            return true;
        }
        return false;
    },
    walk: function(data){
        Object.keys(data).forEach(function(item){
            this.convert(data, item);
        },this)
    },
    convert: function(data, item){
        if(this.isPlainObject(item)){
            this.walk(item);
            return;
        }
        this.defineReactive(data, item, data[item]);
    },
    defineReactive: function(obj, key, val){
        var dep = new Dep();

        Object.defineProperty(obj, key,{
            configurable: true,
            enumerable: true,
            get: function(){
                if(Dep.target){
                    dep.append()
                }
                return val;
            },
            set: function(newVal){
                if(val == newVal){
                    return;
                }
                val = newVal;
                dep.notify();
            }
        })
    }
}
 
function Dep(){
    this.subs = []
}
Dep.prototype = {
    constructor: Dep,
    run: function(sub){
        sub.update();
    },
    append: function(){
        if(Dep.target){
            this.subs.push(Dep.target);
            Dep.target = null;
        }
    },
    notify: function(){
        this.subs.forEach(function(item){
            this.run(item);
        }, this)
    }
}

Dep.target = null;