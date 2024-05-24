const container_component = {
    template: `<div id="container-root" v-if="preview"> 
                    <div id="container-head">
                        <div id="heading">
                            <span class="material-symbols-outlined ">{{span}}</span>
                            <span id="text">{{name}}</span>
                        </div>
                    </div>
                    <div id="container-body">
                         <div  v-for="(item, index) in container_data" :key="index">
                           <div id="main_container" v-for="(value, key) in item" :key="key">
                                <div id="head">
                                 <span>{{split_name_for_head(key)}}</span>
                                </div>
                                <div id="content">
                                  <div id="sub_container" v-for="val in value" :key="val" @click="get_key_for_data(key, val,'click')">
                                     <div id="first_div">
                                        <preview-controller 
                                            :year="get_year(key)"
                                            :month="get_month(key)"
                                            :favourite_data="container_data"
                                            :data="get_key_for_data(key,val)"
                                            :date=get_date(val)
                                            :show_date="false"
                                            :favourite_access="false"
                                            :root_ref=root_ref>
                                        </preview-controller>
                                        <span id="date">{{val}}</span>
                                     </div>
                                  </div>
                                </div>
                           </div>
                         </div>
                    </div>
              </div>`
        ,
    props: {
        name: {
            type: String
        },
        span: {
            type: String
        },
        container_data: {
            type: Array
        },
        root_ref:{
            type:Object
        }
    },
    data() {
        return {
            content: {},
            preview:true
        }
    },
    created() {
        this.content = JSON.parse(localStorage.getItem('Data1')) || {};
    },
    methods: {
        get_key_for_data(key, date,click) {
            var months = { "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11 };
            var year =  key.split('_')[1];
            var month = key.split('_')[0].toLowerCase();
            month = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
            var timestamp = new Date(year,months[month],date).getTime();
            click ?(this.$emit('change_left_pane',year,month,date)):'';
            return this.content[timestamp];
        },
        get_month(key){
            return key.split('_')[0];
        },
        get_year(key){
            var year = key.split('_')[1];
            return parseInt(year);
        },
        get_date(val){
            return parseInt(val);
        },
        split_name_for_head(name){
            var string =name.split('_');
            return string[0]+' '+string[1];
        }

    }
}