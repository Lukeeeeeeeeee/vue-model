function defineReactive(data, key, val) {
    observe(val); // 递归遍历所有子属性
    var dep = new Dep();
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            if (Dep.target) { // 是否需要添加订阅者
                dep.addSub(Dep.target); // 添加一个订阅者
            }
            return val;
        },
        set: function(newVal) {
            if (val === newVal) {
                return;
            }
            val = newVal;
            console.log('属性' + key + '已经被监听了，现在值为："' + newVal.toString() + '"');
            dep.notify(); // 如果数据变化了，通知所有订阅者
        }
    })
}

Dep.target = null;

function Dep() {
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        })
    }
}

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    })
}

// var library = {
//     book1: {
//         name: ''
//     },
//     book2: ''
// }

// observe(library);
// library.book1.name = 'observe';
// library.book2 = '.js';