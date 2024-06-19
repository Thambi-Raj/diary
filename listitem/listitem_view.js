
var listitem_component = {
    template: `
        <div class="listitem-root">
            <div class="button" :class="{ active: active }" @click="button_clicked">
                <span class="material-symbols-outlined" v-if="prepend_icon">{{ prepend_icon }}</span>
                <span id="name">{{ name }}</span>
                <div id="count" v-if="data_count>0">
                    {{data_count}}
                </div>
            </div>
        </div>
    `,
    props: {
        name: {
            type: String
        },
        prepend_icon: {
            type: String
        },
        data_count:{
            type:Number
        },
        active: {
            type: Boolean
        },
    },
    methods: {
        button_clicked() {
            this.$emit('button_clicked', this.prepend_icon);
        }
    }
};
