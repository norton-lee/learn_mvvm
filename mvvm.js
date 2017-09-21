function MVVM(options){
    this.$el = options.el;
    this.$data = options.data || {};
    this._proxy(options.data);
    var observer = new Observer(options.data);
    var compiler = new Compiler(this, options.data, document.querySelector(this.$el));
}

MVVM.prototype = {
    constructor: MVVM,
    _proxy: function(data){
        var vm = this;
        Object.keys(data).forEach(function(item){
            Object.defineProperty(vm, item, {
                configurable: true,
                enumerable: true,
                get: function(){
                    return data[item];
                },
                set: function(newVal){
                    if(data[item] === newVal){
                        return;
                    }
                    data[item] = newVal;
                }
            })
        })
    }
}