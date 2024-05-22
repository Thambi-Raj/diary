const previewSidebar_controller = {
  template: `<previewSidebar-root  
                   :year="year" 
                   :month="month" 
                   :date="date"
                   :month_array ="month_Array" 
                   :total_count="total_count"
                   :favourite_data="favourite_data"
                   :root_ref="root_ref"
                   @year_change="change_year" 
                   @month_change="change_month"
                   @back_page="back"
                   @change_date="change_date"
                   @add_favourite="add_favourite"
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
      type: Array
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
    change_year(data) {
      this.$emit('drop', data, 'calendar')
    },
    change_month(data) {
      this.$emit('drop1', data);
    },
    back(month_Array, year, date) {
      this.$emit('back', year, month_Array, date);
    },
    change_date(date) {
      this.$emit('change_default_date', date);
    },
    add_favourite(date) {
      this.$emit('add_fav', date)
    }
  },
}
