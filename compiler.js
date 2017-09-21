function Compiler(vm, data, node) {
    this.vm = vm;
    this.compile(node, data);
}

Compiler.prototype = {
    constructor: Compiler,
    compile: function (node, data) {
        if (!(node instanceof Node)) {
            return;
        }
        var childNodes = node.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
            var attrs = childNodes[i].attributes;
            if(typeof attrs == 'undefined'){
                continue;
            }
            var partten = /^v-.+/g;
            [].slice.call(attrs).forEach(function (element) {
                if (partten.test(element.name)) {
                    this.setReactive(data, element.name, element.value, childNodes[i]);
                }

            }, this);
        }

    },
    setReactive: function (obj, name, exp, node) {
        var temp = name.split('-')[1];

        compileUtil[temp] && compileUtil[temp](this.vm, obj, node, exp);
    } 
}

var compileUtil = {
    model: function (vm, obj, node, exp) {
        if (!obj.hasOwnProperty(exp)) {
            return;
        }
        var old = vm[exp];
        node.value = old;
        node.addEventListener('input', function (event) {
            var newVal = event.target.value;
            if (newVal == old) {
                return;
            }
            vm[exp] = newVal;
        })
        new Watcher(vm, obj, exp, function () {
            if(old == vm[exp]){
                return;
            }
            old = vm[exp];
            node.value = vm[exp];
        })
    },
    text: function (vm, obj, node, exp) {
        if (!obj.hasOwnProperty(exp)) {
            return;
        }
        var old = vm[exp];
        node.textContent = old;
        new Watcher(vm, obj, exp, function () {
            node.textContent = vm[exp];
        })
    }

}