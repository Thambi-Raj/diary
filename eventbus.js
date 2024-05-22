const event_bus = {
    template: `<div></div>`,
    props: {
        root: {
            type: Object
        }
    },
    mounted() {
        this.root.eventbus.change_head = this.change_dropdown_head;
        this.root.eventbus.change_value = this.change_dropdown_value;
        this.root.eventbus.change_date = this.change_date;
        this.root.eventbus.change_right_template = this.change_right_template;
        this.root.eventbus.add_to_favourite = this.add_to_fav;
        this.root.eventbus.get_dropdown_values = this.get_dropdown_values; 
    },
    methods: {
        change_dropdown_head(name) {
            this.root.dropdown_selected = name;
            this.root.get_data();
            console.log(name);
        },
        change_dropdown_value(val){
            this.root.dropdown_value = val;
            this.root.update_month_preview();
            this.root.get_data();
        },
        change_right_template(name){            
            this.root.change_template(name); 
        },
        change_date(date){
            this.root.default_date =date;
            this.root.get_data();
        },
        add_to_fav(date){
            this.root.add_fav(date);
        },
        get_dropdown_values(value){
            this.root.get_dropdown_values(value);
        },
    }
}
