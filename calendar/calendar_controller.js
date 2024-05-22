const calendar_controller = {
    template: `<calendar-root 
                    :month=month
                    :year =year 
                    :root_ref="root_ref"
                    :month_preview = month_preview>
               </calendar-root>`,
    props: {
        month: {
            type: String
        },
        year: {
            type: [String,Number]
        },
        month_preview:{
            type:Object
        },
        root_ref:{
            type:Object
        },
    },
    methods:{

    }

}