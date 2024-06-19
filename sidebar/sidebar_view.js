const sidebar_component = {
    template: `
            <expandable-list-controller
                v-for="(sublist, year) in config.lists"
                :prepend_icon="'clinical_notes'"
                :name="year"
                :isExpand="check_expand(year)"  
                :sublist="sublist"
                :selected="isSelected(year)"
                :data_count="config.data_count[year]"
                @changed="expand_list_changed"
            ></expandable-list-controller>
            <listitem-controller
                :prepend_icon="'favorite'" 
                :name="'Favourites'" 
                :active="config.selected.list === 'favorite'"
                :data_count="config.data_count['Favourites']"
                @clicked="listitem_clicked"
            >
            </listitem-controller>
    `,
    emits: ['expand_list_change', 'listitem_clicked'],
    props: {
        config: {
            type: Object,
            required: true
        },
    },
    methods: {
        expand_list_changed(data) {
            this.$emit('expand_list_change', data);
        },
        listitem_clicked(data) {
            this.$emit('listitem_clicked', data);
        },
        check_expand(year) {
            return this.config.selected.list == year 
        },
        isSelected(year){
           return  this.check_expand(year) && this.config.selected.sublist
        }
    }
};
