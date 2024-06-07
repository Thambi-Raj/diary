var listitem_controller = {
    template: `
        <listitem-root 
            :name="name" 
            :icon_name="prepend_icon"
            :highlight="active"
            @button_clicked="button_clicked">
        </listitem-root>
    `,
    props: {
        name: {
            type: String
        },
        prepend_icon: {
            type: String
        },
        active: {
            type: Boolean
        },
        root_ref: {
            type: Object
        },
        root_events:{
            type:Object
        }
    },
    methods: {
        button_clicked(name) {
            (this.root_ref && this.root_events.click) 
                ? this.root_ref.eventbus[this.root_events.click](name)
                : this.$emit('clicked',name);       
        }
    }
};
