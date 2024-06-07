const event_bus = {
    template: `<div></div>`,
    props: {
        root: {
            type: Object
        }
    },
    mounted() {
        this.root.eventbus.add_to_favourite = this.add_to_fav;
        this.root.eventbus.open_diary     = this.open_editor_view;
        this.root.eventbus.open_favourite = this.open_favourite_view;
        this.root.eventbus.open_calendar  = this.open_calendar_view;
        this.root.eventbus.save = this.save_content;
    },
    methods: {
        add_to_fav(date){
            this.root.add_fav(date);
            this.root.get_Favourite_data();
        },
        open_editor_view(json){
            this.root.config_details.selected = json['year'];
            this.root.config_details.month = json['month'];
            this.root.config_details.date = json['date'];
            this.root.right_pane = 'editor';
            this.root.get_data();
            this.root.get_month_preview();

        },
        open_favourite_view(name){
            this.root.config_details.selected = name;
            this.root.right_pane='container';
        },
        open_calendar_view(json){
            this.root.config_details.selected = json['year'] 
            this.root.get_dropdown_values();
            this.check_for_set_month(json);
            this.root.total_days_in_month();
            this.root.get_month_preview();
            if(json['view']== undefined){
                this.root.right_pane  ='calendar';
            }
        },
        save_content(json,date){
            this.root.save_json(json,date);
        },
        check_for_set_month(json){
            if(!this.root.months.includes(this.root.config_details.month)){
                this.root.config_details.month='Jan';
            }
            else{
                this.root.config_details.month = json['month'];
            }
        }
    }
}
