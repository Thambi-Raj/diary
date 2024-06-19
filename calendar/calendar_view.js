const calendar_component = {
    template: `
    <div class="calendar-root">
      <div id="header">
            <span id="date">
                {{months[month]}}  {{year}}
            </span>
      </div>
      <div id="content">
            <div id="calendar-head">
                <div class="day-container" v-for="day in weeks" :key="day">
                    <span>{{ day }}</span>
                </div>
            </div> 
            <div id="calendar-body" ref="calendar">
                <div v-for="rowIndex in total_row" :key="rowIndex" 
                    :class="[
                        'calendar-body-row',
                        {'change-height': total_row === 6 }
                    ]">
                    <div v-for="dayIndex in 7" :key="dayIndex" 
                        :class="{ 'date-container': !isDisabled(rowIndex, dayIndex), 'disable': isDisabled(rowIndex, dayIndex) }">
                        <div id="sub-container">
                            <span class="date">{{ getdate(rowIndex, dayIndex) }}</span>
                            <preview-controller 
                                :date_config="{ year: year, month: month, date: getdate(rowIndex, dayIndex) }" 
                                :data="data[getdate(rowIndex, dayIndex)]"
                                @change_data="date_selected">
                            </preview-controller>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            weeks: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
            months : {
                'Jan': 'January',
                'Feb': 'February',
                'Mar': 'March',
                'Apr': 'April',
                'May': 'May',
                'Jun': 'June',
                'Jul': 'July',
                'Aug': 'August',
                'Sep': 'September',
                'Oct': 'October',
                'Nov': 'November',
                'Dec': 'December'
            }              
        }
    },
    props: {
        year: {
            type: [Number, String],
            required: true
        },
        month: {
            type: [Number, String],
            required: true
        },
        data: {
            type: Object,
            required: true
        },
        total_days: {
            type: Number,
            required: true
        },
        total_row: {
            type: Number,
            required: true
        },
        StartDayIndex: {
            type: Number,
            required: true
        },
        root_ref: {
            type: Object
        },
    },
    methods: {
        date_selected(date_config) {
            this.$emit('date_selected', date_config);
        },
        getdate(rowIndex, dayIndex) {
            return (rowIndex - 1) * 7 + dayIndex - this.StartDayIndex;
        },
        isDisabled(rowIndex, dayIndex) {
            const date = this.getdate(rowIndex, dayIndex);
            return date <= 0 || date > this.total_days;
        }
    }
}
