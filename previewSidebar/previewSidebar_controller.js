const previewSidebar_controller = {
  template: `<previewSidebar-root  
                   :year="year" 
                   :month="month" 
                   :date="date"
                   :month_array ="month_Array" 
                   :total_count="total_count"
                   :favourite_data="favourite_data"
                   :root_ref="root_ref"
                   @change_value="change_value" 
                   >
                   </previewSidebar-root>`,
  props: {
    year: {
      type: [String, Number],
    },
    month: {
      type: String
    },
    date: {
      type: Number
    },
    month_Array: {
      type: Array
    },
    root_ref: {
      type: Object
    },
    favourite_data: {
      type: Object
    },
  },
  data() {
    return {
      total_count: 0
    }
  },
  created() {
    var mon = 0;
    this.month_Array.forEach((element, i) => {
      if (element.toLowerCase() == this.month.toLowerCase()) {
        mon = i;
      }
    });
    this.total_count = new Date(this.year, mon + 1, 0).getDate();
  },

  updated() {
    var mon = 0;
    this.month_Array.forEach((element, i) => {
      if (element.toLowerCase() == this.month.toLowerCase()) {
        mon = i;
      }
    });
    this.total_count = new Date(this.year, mon + 1, 0).getDate();
  },

  methods: {
    change_value(year,month) {
                      (this.root_ref && this.root_ref.root_events.includes("open_calendar")) 
                    ?  this.root_ref.eventbus.open_calendar(year,month,'editor')
                    :  this.$emit('open_calendar',year,month);
    },
  },
}
