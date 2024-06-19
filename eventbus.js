const event_bus = {
    template: `<div></div>`,
    props: {
        root: {
            type: Object
        }
    },
    mounted() {
        // console.log(this.root.eventbus);
        this.root.eventbus.add_to_favourite = this.add_to_fav;
        this.root.eventbus.open_diary       = this.open_editor_view;
        this.root.eventbus.open_favourite = this.open_favourite_view;
        this.root.eventbus.open_calendar  = this.open_calendar_view;
        this.root.eventbus.save = this.save_content;
        // console.log(this.root.eventbus);

    },
    methods: {
        add_to_fav(date){
            this.root.add_to_favourite(date);
            this.root.get_favourite_data();
        },
        open_editor_view(json){
            this.root.config.selected = json['year'];
            this.root.config.month = json['month'];
            this.root.config.date = json['date'];
            this.root.right_pane = 'editor';
            this.root.get_timestamp_data();
            this.root.get_month_data();

        },
        open_favourite_view(name){
            this.root.config.selected = name;
            this.root.right_pane='container';
        },
        open_calendar_view(json){
            this.root.config.selected = json['year']
            this.root.config.date = 0;
            this.root.get_months();
            this.check_for_set_month(json);
            this.root.total_days_in_month();
            this.root.get_month_data();
            if(json['view']== undefined){
                this.root.right_pane  = 'calendar';
            }
        },
        save_content(json,date){
            this.root.save_json(json,date);
        },
        check_for_set_month(json){
            if(!json['month']){
                this.root.config.month='pppp';
            }
            else{
                this.root.config.month = json['month'];
            }
        }
    }
}
