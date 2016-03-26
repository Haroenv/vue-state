module.exports = (function () {

    function State(url, options) {
        options = options || {};

        return http(this, url, options);
    }

    function http(ctx, url, options) {
        var suc, err;

        if (options.track) {
            suc = options.success;

            options.success = function () {
                this[options.track] = 'sent';

                if (suc) {
                    return suc.apply(this, arguments);
                }

                return;
            };

            err = options.error;

            options.error = function () {
                this[options.track] = 'error';

                if (err) {
                    return err.apply(this, arguments);                
                }
            };

            ctx[options.track] = 'sending';
        }

        return ctx.$http(url, options);
    }

    function httpMethod(method, ctx, args) {
        var options = args[3] || {};

        options.method = method;
        options.data = args[1];
        options.success = args[2];

        return http(ctx, args[0], options);
    }

    State.post = function() {
        return httpMethod('post', this, arguments);
    };

    State.get = function() {
        return httpMethod('get', this, arguments);
    };

    State.put = function() {
        return httpMethod('put', this, arguments);
    };

    State.delete = function() {
        return httpMethod('delete', this, arguments);
    };

    return function install(Vue) {
        Vue.state = State;

        Object.defineProperties(Vue.prototype, {
            $state: {
                get: function () {
                    Vue.state.get = State.get.bind(this);
                    Vue.state.put = State.put.bind(this);
                    Vue.state.post = State.post.bind(this);
                    Vue.state.delete = State.delete.bind(this);
                    Vue.state.bind(this);
                    
                    return Vue.state;
                }
            }
        });
    }
})();
