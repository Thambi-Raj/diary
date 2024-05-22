const search_button_component = {
    template: `<div id="search-dropdown_root">
                    <div id="search-dd-head" @click="show_body">
                         <span class="material-symbols-outlined" v-show="icon_name">{{ icon_name }}</span>
                         <span>{{ button_name }}</span>
                         <span class="material-symbols-outlined drop_down"> arrow_drop_down </span>
                    </div>
                    <div id="search-dd-body" :class="active !== id ? 'hide':''" > 
                         <span class="material-symbols-outlined search-icon"> search </span>
                         <input @keyup="search_value" v-model="input_value" >
                         <div class="item" v-for="value in result" @click="change_mention(value)">
                            <span >{{ value }}</span>
                         </div>
                    </div>
                </div>`,
    data() {
        return {
            input_value: '',
            show_result: false
        };
    },
    props: {
        button_name: {
            type: String
        },
        icon_name: {
            type: String
        },
        result: {
            type: Array
        },
        id: {
            type: String
        },
        active: {
            type: String
        }
    },
    methods: {
        search_value() {
            this.$emit('match_value', this.input_value);
        },
        show_body() {
            this.show_result = !this.show_result;
        },
        change_mention(name) {
            this.$emit('get_data',name);
        }
    }
};
