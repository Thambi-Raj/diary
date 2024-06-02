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
            this.root.selected = json['year']
            this.root.month =   json['month']
            this.root.date   =  json['date']
            this.root.diary_setup_data.selected = json['year'];
            this.root.diary_setup_data.month = json['month'];
            this.root.diary_setup_data.date = json['year'];
            this.root.right_pane = 'editor';
            this.root.get_data();
        },
        open_favourite_view(name){
            this.root.selected = name;
            this.root.diary_setup_data.selected = name;
            this.root.right_pane='container';
        },
        open_calendar_view(data){
            data['year']?(this.root.selected = data.year , this.root.diary_setup_data.selected = data['year']):'';
            data['month']?(this.root.month = data.month , this.root.diary_setup_data.month = data['month']):'';
            this.root.get_dropdown_values()
            this.root.update_month_preview();
            if(data['view']== undefined){
                this.root.right_pane  ='calendar';
            }
            this.root.get_data();
        },
        save_content(json,date){
            this.root.save_json(json,date);
        }
    }
}
