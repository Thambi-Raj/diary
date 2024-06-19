const previewPanel_controller = {
  template: `
          <div id="monthOverview-sideBar">
                   <preview-sidebar-root  
                      :selected="config.selected"
                      :months="config.data.months"
                      :years="config.data.years"
                      :total_days="config.data.total_days"
                      :data="data.primary_data"
                      :favourite_data="data.favourite_data" 
                      @dropdown_value_changed="dropdown_change"
                      @add_favourite="add_to_fav"
                      @date_change="data_changed">
                   </preview-sidebar-root>
            </div>`,
        
  props: {
          config:{
              type:Object
          },
          data:{
              type:Object
          },
          root_ref: {
              type: Object
          },
          root_event:{
              type:Object,
        },
  },
  created(){
    console.log(this.config);
  },
  methods: {
     dropdown_change(data){
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
