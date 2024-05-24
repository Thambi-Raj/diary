const preview_controller = {
    template: `<preview-root
                    :show_date="show_date"
                    :favourite_access="favourite_access"
                    :data="check_available_data()"
                    :favourite_data="favourite_data"
                    :date="date"
                    :month="month"
                    :year="year"
                    :root_ref="root_ref"
                    @add_to_fav="add_fav"
                    @change_data="change_data"
                ></preview-root>`,
    props: {
        show_date: {
            type: Boolean,
            default: false
        },
        favourite_access: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: {}
        },
        favourite_data: {
            type: Array,
            default: {}
        },
        date: {
            type: [Number, String],
            default: 0
        },
        month: {
            type: String,
            default: 'Jan'
        },
        year: {
            type: [String, Number],
            default: 2024
        },
        root_ref: {
            type: Object
        },
    },
    methods: {
        check_available_data() {
            if (Object.keys(this.data).length === 0) {
                return false;
            }
            return this.data;
        },
        add_fav(date) {
            this.root_ref.eventbus.add_to_favourite(date); 
        },
        change_data(data) {
            this.root_ref.eventbus.open_diary(data);
        }
    }
};
