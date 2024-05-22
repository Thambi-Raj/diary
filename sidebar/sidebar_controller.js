const sidebar_controller= {
    template: `
        <div id="calendar-side-bar">
            <sidebar-root 
                :dropdown_selected="dropdown_selected" 
                :dropdown_value="dropdown_value"  
                :month_array="month"
                :root_ref="root_ref"
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
    },
};