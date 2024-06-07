const previewSidebar_controller = {
  template: `
          <div id="preview-side-pane">
                   <preview-sidebar-root  
                      :date_config="date_config"
                      :months="months"
                      :years="years"
                      :month_data="month_data"
                      :favourite_data="favourite_data" 
                      @dropdown_value_changed="dropdown_value_changed"
                      @add_to_fav="add_to_fav"
                      @data_changed="data_changed"
                    >
                   </preview-sidebar-root>
            </div>`,
        
  props: {
        date_config:{
          type:Object
        },
        months:{
          type:Array
        },
        years:{
          type:Array
        },
        month_data:{
          type:Object
        },
        favourite_data: {
          type: Object
        },
        root_ref: {
          type: Object
        },
        root_event:{
          type:Object,
      },
  },
  emits:['dropdown_value_changed','data_changed'],
  methods: {
      dropdown_value_changed(data){
          (this.root_ref && this.root_event.duration_change)?
            this.root_ref.eventbus[this.root_event.duration_change](data)
            : this.$emit('duration_change',data)
      },
      data_changed(data){
          this.root_ref && this.root_event.preview_click 
              ? this.root_ref.eventbus[this.root_event.preview_click](data)
              : this.$emit('date_clicked',data);
      },
      add_to_fav(date){
        this.root_ref && this.root_event.add_to_fav 
          ? this.root_ref.eventbus[this.root_event.add_to_fav](date)
          : this.$emit('add_to_favourite',date);
      }
  },
}
