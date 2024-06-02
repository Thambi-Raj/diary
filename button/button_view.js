
var button_component = {
    template: `
        <div class="listitem-root">
            <div class="button" :class="{ active: highlight }" @click="button_clicked">
                <span class="material-symbols-outlined" v-if="icon_name">{{ icon_name }}</span>
                <span>{{ button_name }}</span>
            </div>
        </div>
    `,
    props: {
        button_name: {
            type: String
        },
        icon_name: {
            type: String
        },
        highlight: {
            type: Boolean
        },
        root_ref: {
            type: Object
        },
    },
    methods: {
        button_clicked() {
            this.$emit('button_clicked', this.icon_name);
        }
    }
};
