function Watcher(vm, obj, key, cb) {
    this.key = key;
    this.obj = obj
    this.vm = vm;
    this.cb = cb;
    this.val = this.get();

}

Watcher.prototype = {
    constructor: Watcher,
    update: function () {
        typeof this.cb === 'function' && this.cb();
    },
    get: function () {
        Dep.target = this;
        return this.obj[this.key];
    }
}