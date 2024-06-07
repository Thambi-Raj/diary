const sidebar_component = {
    template: `
            <expandable-list-controller
                v-for="(name, index) in  leftpane_listitem"
                    :prepend_icon="'clinical_notes'"
                    :name="name"
                    :expand="config_details.selected==name"
                    :items="list_values"
                    :selected_item="config_details.month"
                    @changed="expand_list_changed"
            ></expandable-list-controller>
            <listitem-controller
                    :prepend_icon="'favorite'" 
                    :name="'Favourites'" 
                    :active="config_details.selected=='favorite'"
                    @clicked="listitem_clicked"
            >
            </listitem-controller>
    `,
    emits:['expand_list_change','listitem_clicked'],
    props: {
        leftpane_listitem:{
            type:Object,
        },
        config_details:{
            type:Object
        },
        list_values:{
            type:Array
        },
        selected_item:{
            type:String
        },
    },
    methods: {
        expand_list_changed(data){
            this.$emit('expand_list_change',data);
       },
        listitem_clicked(data){
            this.$emit('listitem_clicked',data);
        }
    }
};