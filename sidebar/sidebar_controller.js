const sidebar_controller= {
    template: `
        <div id="calendar-side-bar">
            <sidebar-root 
                :dropdown_selected="dropdown_selected" 
                :dropdown_value="dropdown_value"  
                :month_array="month"
                :root_ref="root_ref"
                @change_selected = "change_selected"
                >
            </sidebar-root >
        </div>
    `,
    props: {
        dropdown_selected: {type:[String,Number]},
        dropdown_value: {type:String},
        month:{type:Array},
        root_ref:{
            type:Object
        },
    },
    methods: {
        change_selected(name,view){
            if(view == 'favourite'){
                (this.root_ref && this.root_ref.root_events.includes("open_favourite")) 
                ?  this.root_ref.eventbus.open_favourite(name)
                :  this.$emit('open_favourite',name);
            }
            else{
                 this.root_ref && this.root_ref.root_events.includes("open_calendar")
                ?  this.root_ref.eventbus.open_calendar(name,view)
                : this.$emit('open_calendar',name,view);
            }
        }
    },
};

// rootEvent = {
//     root: this,
//     event: {
//         editor:{
//             save:'svae_content'
//         },
//     }
// }