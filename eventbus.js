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
        },
        open_editor_view(json){
            this.root.dropdown_selected = json['year']
            this.root.dropdown_value =   json['month']
            this.root.default_date   =  json['date']
            this.root.right_template = 'editor'
            this.root.get_data();
        },
        open_favourite_view(name){
            this.root.dropdown_selected = name;
            this.root.right_template='container';
        },
        open_calendar_view(year,month,favourite){
            this.root.dropdown_selected = year;
            this.root.dropdown_value = month;
            this.root.get_dropdown_values(year);
            this.root.update_month_preview();
            this.root.get_data();
            if(favourite == undefined){
                this.root.right_template  ='calendar';
            }
        },
        save_content(json,date){
            this.root.save_json(json,date);
        }
    }
}
