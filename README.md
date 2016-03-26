# vue-state
A simple shortcut wrapper around the `$http` method in the [vue-router](https://github.com/vuejs/vue-router) library.

It allows you to track the state of a request by passing in a variable to track.

There are thre states which are `sending`, `sent`, `error`. 

For example:

~~~
<template
    {{ getItemsState }}
    
    <div v-if="getItemsState === 'sending'">Loading...</div>
    <div v-if="getItemsState !== 'sending'">
        // Show Items
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [],
                getItemsgState: 'init'
            };
        },
        ready() {
            this.fetchItems();
        },
        methods: {
            fetchItems() {
                this.$state.get('/items', {}, function (resp) {
                    this.items = resp.data;
                }, {
                    track: 'getItemsState'
                });

                // Or

                this.$state('/items', {
                    track: 'getItemsState',
                    success: function (resp) {
                        this.items = resp.data;
                    }
                });
            }
        }
    }
</script>
~~~


