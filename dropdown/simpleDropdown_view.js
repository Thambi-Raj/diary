const simple_dropdown_component = {
    template: `<div class="drop-down-root" v-if="tag !== 'image'">
    <div id="drop-down-head" @click="show_drop" :class="width" ref="dropdown">
        <span :class="{ 'material-symbols-outlined': tag === 'span' }">{{selected_value}}</span>
        <span class="material-symbols-outlined">{{dropdown_icon}}</span>
    </div>
    <div id="option" v-if="dropdown_visible" :class="option_class_name">
        <span v-for="element in data" @click="change_drop(element,name)" :class="{ 'clicked': element == selected_value, 'material-symbols-outlined': tag === 'span' }">
            {{element}}
        </span>
    </div>
</div>
<div class="drop-down-root" v-else>
<div id="drop-down-head" @click="show_drop" :class="width" ref="dropdown">
    <img :src="getImageUrl(selected_value)" class="drop-down-image">
    <span class="material-symbols-outlined">{{dropdown_icon}}</span>
</div>
<div id="option" v-if="dropdown_visible" :class="option_class_name">
    <div v-for="element in data" :key="element" class="image_dropdown" :class="{ 'clicked': element == selected_value }" @click="change_drop(element, 'back_ground')">
        <img :src="getImageUrl(element)" class="drop-down-image" >
    </div>
</div>
</div>`

              ,
    props: {
        selected_value: { type:[String,Number]},
        data: { type: Array },
        width: { type: String },
        tag: { type: String },
        name:{type:String},
        default_val:{type:[String,Number]}
    },
    data() {
        return {
            dropdown_visible: false,
            dropdown_icon:"arrow_drop_down",
            option_class_name:this.width+'_dropdown',
            align_data:
                {"format_align_justify":"JustifyCenter",
                "format_align_left":"JustifyLeft",
                "format_align_right":"JustifyRight"},
            }
    },
    methods: {
        show_drop() {
            this.dropdown_visible = !this.dropdown_visible;
            this.dropdown_icon = this.dropdown_icon=="arrow_drop_up" ?"arrow_drop_down":"arrow_drop_up";
        },
        change_drop(data,back) {
            this.dropdown_visible = false;
            back!='align'?this.$emit('change_dropdown_value', data,back):
                          this.$emit('change_dropdown_value', this.align_data[data],data);
        },
        hide_drop() {
            this.dropdown_visible = false;
            this.dropdown_icon="arrow_drop_down"
        },
        getImageUrl(image) {
            return `../${image}`;
        }
    },
    mounted() {
        window.addEventListener('click', (event) =>{
            if (this.$refs.dropdown &&  !this.$refs.dropdown.contains(event.target)) {
                this.dropdown_visible = false;
                this.dropdown_icon="arrow_drop_down"
            }
        });
    },
    destroyed() {
        window.removeEventListener('click', (event) =>{
            if (!this.$refs.dropdown.contains(event.target)) {
                this.dropdown_visible = false;
                this.dropdown_icon="arrow_drop_down"
            }
        });
    },
};
