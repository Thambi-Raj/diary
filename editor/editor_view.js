const editor_component = {
    template: `<div class="editor-root" ref="editor_width" :class="{ preview: preview_class !== '' }">
                <div id="header"  v-if="preview">
                     <div id="left">
                         <div id="back" title="Back to calendar"  @click="back_to_page">
                                  <span id="back-icon" class="material-symbols-outlined">
                                         arrow_back
                                  </span>
                         </div>
                        <div id="editor-tool" ref="editor_tool" >
                                <div :class="{ 'button clicked': active_state.bold, 'button': !active_state.bold }" id="bold" @click="change_text_format('bold')" title="bold">
                                <span class="material-symbols-outlined">format_bold</span>
                            </div>
                            <div :class="{ 'button clicked': active_state.italic, 'button': !active_state.italic }" id="italic" @click="change_text_format('italic')" title="italic">
                                <span class="material-symbols-outlined">format_italic</span>
                            </div>
                            <div :class="{ 'button clicked': active_state.underline, 'button': !active_state.underline }" id="underline" @click="change_text_format('underline')" title="underline">
                                <span class="material-symbols-outlined">format_underlined</span>
                            </div>
                            <div class="file" title="insert image">
                                <input  type="file" id="imag" accept="image/*" @change="insert_photo" ref="image_file" >
                                <label for="imag" id="upload">Upload&nbsp;&nbsp;<span class="material-symbols-outlined">image</span> </label>
                            </div>
                            <div class="file" title="color">
                                <label for="Color">Color &nbsp;&nbsp;</label>
                                <input type="color" id="Color" @change="change_text_format($event.target.value, 'forecolor',)" :value="active_state.color" ref="color_input">
                            </div>
                            <div id="font_size" title="font size">
                                <dropdown-controller :selected="active_state['font-size']" :data="font_size"    @change="(val) => change_text_format(val, 'FontSize')" ></dropdown-controller>
                            </div>
                            <div id="font_family" title="font family">
                                <dropdown-controller :selected="active_state['font-family']" :data="font_family"    @change="(val) => change_text_format(val, 'FontName')"></dropdown-controller>
                            </div>
                            <div class="icon_dropdown" title="alignment">
                                <dropdown-controller  :selected="active_state['align']" :data="align"  :format="'tag'" @change="change_text_align"></dropdown-controller>
                            </div>
                            <div class="icon_dropdown" title="background">
                                <dropdown-controller   :selected="this.active_state['background']" :data="texture" :format="'image'" @change="change_background"></dropdown-controller>    
                            </div>
                            <div class="icon_dropdown" title="line_height">
                                <dropdown-controller   
                                    :selected = "active_state['line_height']" 
                                    :data="line_height" 
                                    :format="'tag'"
                                    fixed_head="format_line_spacing"
                                ></dropdown-controller>    
                            </div>

                    </div>                                                                                                    
                </div>
                <div id="right"> 
                 <div id="date">
                   <span>{{day}}</span>
                 </div>
                 <div id="month">
                    <span>{{month}}&nbsp;{{date}} ,&nbsp;{{year}}</span>
                 </div>
                </div>
              </div>
                <div id="texture-field" ref="back_ground">
                         <div id="word-pad" contenteditable="true" ref="content" spellcheck="false" 
                            @click="editor_click_event" 
                            @keydown="editor_keydown_event" 
                            @keyup="editor_keyup_event"  
                            :class=" { 'full-width': image.length == 0 }">
                                <div class="line-content" ref="line_div"
                            ></div>
                         </div>
                        <div id="drag_container" ref="drag" @mousedown="start_drag_event" :class="drag_container_class" v-if="image.length > 0">
                            
                        </div>
                        <div id="imageContainer" :class="image_container_class" v-if="preview && images_url.length > 0" ref="image" >
                            <div v-for="(url, index) in images_url" :key="index" ref="child_images" @mouseover="image_hover(index)" 
                                @mouseout="image_out(index)"    
                                @click="open_image_in_fullView($event,url)"
                                :style="getheight()">
                                <img :src="url">
                                <span ref="delete_icon" class="material-symbols-outlined" @click="image_click($event.currentTarget,index)">delete</span>
                            </div>
                        </div>
                </div>   
                <div id="full_container_photo" :class=image_full_view_class  @click="close_container" ref="full_container">
                     <div id="image_con"  ref="show_photo">
                            <div>
                               <img src="" ref="full_img">
                               <span class="material-symbols-outlined" ref="close_span">close</span>
                            </div>
                    </div>
                </div> 
             </div>`,
    data() {
        return {
            font_size: ["15px", "16px", "17px", "18px", "19px", "20px", "21px", "22px", "23px"],
            font_family: ["sans-serif", "Arial", "Helvetica", "Times New Roman", "Georgia", "Courier New", "Verdana", "Tahoma", "Trebuchet MS", "Palatino Linotype", "Arial Black", "Comic Sans MS", "Impact", "Lucida Console", "Garamond", "Century Gothic", "Calibri", "Book Antiqua", "Franklin Gothic Medium", "Cambria", "Rockwell"],
            heading: ["normal", "H1", "H2", "H3"],
            align: ["format_align_left", "format_align_justify", "format_align_right"],
            texture: ["texture1.jpg", "texture6.avif", "texture2.jpg", "texture44.webp", "texture51.jpg","blue.jpg"],
            line_height:[1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2.0],
            active_state: {
                'bold': false,
                'italic': false,
                'underline': false,
                'font-size': '15px',
                'color': '#444444',
                'font-family': 'sans-serif',
                'formatBlock': 'normal',
                'align': 'format_align_left',
                'background':'"texture1.jpg"',
                'line_height':1.5
            },
            start_line: {
                'b': 'bold',
                'i': 'italic',
                'u': 'underline',
            },
            months:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            days :["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            font_tag_length: -1,
            images_url: this.image,
            back_ground: '',
            preview_class:'',
            image_container_class:'image_container',
            drag_container_class:'',
            wordPad_class:'',
            image_full_view_class:'hide', 
            height:'',
            day:'',
        };
    },
    props: {
        data: {
            type: [Object,Boolean]
        },
        template: {
            type: String
        },
        image: {
            type: Array
        },
        global_props: {
            type: Object
        },
        preview: {
            type: Boolean
        },
        date:{
            type:[Number,String]
        },
        year:{
            type:[Number,String]
        },
        month:{
            type:String
        },
        root_ref: {
            type: Object
        },
        root_event:{
            type:Object
        }
    },

    mounted() {
        this.check_for_draft();
        this.check_for_preview();
        this.day =this.days[new Date(this.year,this.months.indexOf(this.month),this.date).getDay()];
        this.$refs.content.focus();
    },

    watch: {
        date(){
                const contentElement = this.$refs.content;
                if (contentElement.hasAttribute('style')) {
                    contentElement.removeAttribute('style');
                    this.$refs.image.removeAttribute('style');
                }
                this.height='';
                this.day =this.days[new Date(this.year,this.months.indexOf(this.month),this.date).getDay()];
                this.$refs.content.focus();
        },
        data() {
            this.check_for_draft();
        },
        image(){
            this.images_url =[...this.image];
        },
    },
    methods: {
        back_to_page(){
             this.$emit('back_page');
        },
        editor_click_event(e){
            if(this.preview){
                this.update_cursor_position_toolbar();
            }
        },     
        editor_keydown_event(e){
            if (this.$refs.content.innerText.length <= 1 && e.key == 'Backspace') {
                this.check_content_empty();
                e.preventDefault();
            }
            else if (e.key == 'Backspace') {
                this.delete_empty_styles_tag(e);
            }
        },
        editor_keyup_event(e){
            this.check_for_previous_span();
            var pattern = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
            if (pattern.test(e.key) || e.key === 'Enter' || e.key === 'Backspace') {
                this.save_content(this.date);
            }
            this.update_cursor_position_toolbar();
        },
        getheight() {
            return this.height ? { height: this.height } : {};
        }, 
        check_for_draft() {
            this.reset_Active();
            this.template != '' ? this.$refs.content.innerHTML = this.template : this.$refs.content.innerHTML = ' <div class="line-content"></div>'
            this.set_global_props(this.global_props);
        },
        check_for_preview() {
            if (!this.preview) {
                this.$refs.content.setAttribute('contentEditable', 'false');
                this.preview_class = 'preview';
            }
        },
        image_hover(index){
            this.$refs.delete_icon[index].classList.add('show');
        },
        image_out(index){
            this.$refs.delete_icon[index].classList.remove('show');
        },
        image_click(target,index){
            this.images_url.splice(index, 1);
            if(this.images_url.length==0){
                const contentElement = this.$refs.content;
                if (contentElement) {
                    if (this.preview && contentElement.hasAttribute('style')) {
                        contentElement.removeAttribute('style');
                    }
                }
                this.height='';

            }
            this.save_content(this.date);
        },
        check_content_empty() {
            this.$refs.content.innerHTML = '';
            this.$refs.content.innerHTML += '<div class="line-content"></div>';
            this.reset_Active();
        },
        delete_empty_styles_tag(event) {
            var sel = window.getSelection();
            if (sel.anchorNode.parentNode.textContent.length == 1 && sel.anchorNode.parentNode.tagName != 'DIV') {
                var spanParent = sel.anchorNode.parentNode;
                spanParent.parentNode.removeChild(spanParent);
                event.preventDefault();
            }
        },
        check_for_previous_span(){
            if (this.font_tag_length == 0) {
                var span = document.createElement('span');
                var element = window.getSelection().anchorNode.parentElement;
                var fontTag =this.get_font_tag(element,span);
                this.styles_in_fonttag(fontTag,span);
                span.innerHTML = fontTag.innerHTML;
                fontTag.parentNode.insertBefore(span, fontTag);
                fontTag.parentNode.removeChild(fontTag);
            }
            this.font_tag_length = -1;
        },
        get_font_tag(element,span){
            while (element && element.tagName != 'FONT') {
                if (element.tagName == 'B') {
                    span.style.fontWeight = "bold";
                }
                if (element.tagName == 'U') {
                    span.style.textDecorationLine = "underline";
                }
                if (element.tagName == 'I') {
                    span.style.fontStyle = "italic";
                }
                element = element.parentElement;
            }
            return element;
        },
        styles_in_fonttag(fontTag,span){
            var attr = fontTag.getAttributeNames();
            attr.forEach((e) => {
                this.set_size_in_span(e, span);
                this.set_family_in_span(e, fontTag.getAttribute('face'), span);
                this.set_color_in_span(e, fontTag.getAttribute('color'), span);
            });   
        },
        update_cursor_position_toolbar() {
            var sel = window.getSelection();
            var back = this.active_state['background'];
            this.reset_Active();
            this.active_state['background'] = back;
            if (sel.anchorNode.tagName) {
                this.update_toolbar_button(sel.anchorNode);
            }
            var h = sel.anchorNode.parentElement;
            while (h && h.tagName.toLowerCase() != 'div') {
                this.update_toolbar_button(h);
                h = h.parentElement;
            }
            this.set_alignment(h);
        },
        start_drag_event() {
            const mousemoveHandler = (e) => {
              this.drag_move( e.clientX, e.currentTarget);
            };
            const mouseupHandler = () => {
                this.$refs.editor_width.removeEventListener('mousemove', mousemoveHandler);
                this.$refs.editor_width.removeEventListener('mouseup', mouseupHandler);
            };
            this.$refs.editor_width.addEventListener('mousemove', mousemoveHandler);
            this.$refs.editor_width.addEventListener('mouseup', mouseupHandler);   
        },
        drag_move( result_x, target) {
            this.minimum_width_imageContainer(result_x, target);
        },
        minimum_width_imageContainer(result_x, target) {
            background= this.$refs.back_ground.getBoundingClientRect();
            var parent_width = target.clientWidth;
            const content = this.$refs.content;
            const image = this.$refs.image;
            if (result_x < parent_width) {
                var image_cont_width = background.width - (result_x - background.x);
                this.convert_px_to_percentage(background,image,image_cont_width,-1)
                var word_pad =  (result_x - background.x);
                this.convert_px_to_percentage(background,content,word_pad,-1);
                var image_container_width = image.clientWidth;
                this.set_image_height(image_container_width);
            }
        },
        set_image_height(img_width) {
            const aspectRatio = 16 / 14;
            const height = img_width / aspectRatio;
            var img_container = this.$refs.image.children;
            var parent = this.$refs.image.getBoundingClientRect();
            this.height = height;
            for (var i = 0; i < img_container.length; i++) {
                this.convert_px_to_percentage(parent,img_container[i],-1,height);  
            }
        },
        convert_px_to_percentage(parent,set_content,width,height){
            const viewportWidth = window.innerWidth;
            if (width !== -1) {
                const vwWidth = (width / viewportWidth) * 100;
                set_content.style.width = vwWidth + "vw";
            } else {
                const vwHeight = (height / viewportWidth) * 100;
                set_content.style.height = vwHeight + "vw";
            }
        },
        update_toolbar_button(element) {
            var style = element.style;
            this.set_tag_based_style(element);
            this.set_color(style);
            this.set_fontsize(style);
            this.set_fontname(style);
            this.set_underline(style);
            this.set_bold(style);
            this.set_italic(style);
        },
        set_tag_based_style(h) {
            if (h.tagName.toLowerCase() !== 'span') {
                var style_name = this.start_line[h.tagName.toLowerCase()];
                this.active_state[style_name] = true;
            }
        },
        set_color(style) {
            if (style.color) {
                this.active_state['color'] = this.rgbToHex(style.color);
            }
        },
        set_fontsize(style) {
            if (style.fontSize) {
                this.active_state['font-size'] = style.fontSize;
            }
        },
        set_fontname(style) {
            if (style.fontFamily) {
                this.active_state['font-family'] = style.fontFamily;
            }
        },
        set_underline(style) {
            if (style.textDecorationLine) {
                this.active_state['underline'] = true;
            }
        },
        set_bold(style) {
            if (style.fontWeight) {
                this.active_state['bold'] = true;
            }
        },
        set_italic(style) {
            if (style.fontStyle === 'italic') {
                this.active_state['italic'] = true;
            }
        },
        set_color_in_span(params, attr, span) {
            if (params == 'color') {
                span.style.color = attr;
            }
        },
        set_size_in_span(params, span) {
            if (params == 'size') {
                span.style.fontSize = this.active_state['font-size'];
            }
        },
        set_family_in_span(params, attr, span) {
            if (params == 'face') {
                span.style.fontFamily = attr;
            }
        },
        set_alignment(div) {
            if (div.style.textAlign.length !== 0) {
                this.active_state['align'] = `format_align_${div.style.textAlign}`;
            } else {
                this.active_state['align'] = 'format_align_left';
            }
        },
        change_text_format(format, value) {
            var font = ['forecolor','FontName','FontSize'];
            if (font.includes(value)) {
                document.execCommand(value, false, format.replace('px', ''));
                this.fontTag_contents(format, value);
            }
            else {
                document.execCommand(format, false, null);
                if (value == undefined) {
                    this.highlight_button(format)
                }
            }
            this.save_content(this.date);
            this.$refs.content.focus();
        },
        change_text_align(data){
            const alignment = {
                format_align_justify: 'justifyFull',
                format_align_right: 'justifyRight',
                format_align_left: 'justifyLeft',
                format_align_center: 'justifyCenter'
              };
                document.execCommand(alignment[data], false, null);
                this.active_state['align']= data 
                this.save_content(this.date);
        },
        fontTag_contents(format, value) {
            this.check_fontfamily_Attribute(format, value);
            this.check_fontsize_Attribute(format, value);
            this.check_forecolor_attribute(format, value);
        },
        check_forecolor_attribute(format, value) {
            if (value == 'forecolor') {
                this.active_state['color'] = this.$refs.color_input.value;
                this.fontTag_to_spanTag('color');
            }
        },
        check_fontsize_Attribute(format, value) {
            if (value == 'FontSize') {
                this.active_state['font-size'] = format;
                this.fontTag_to_spanTag('sizspane', format);
            }
        },
        check_fontfamily_Attribute(format, value) {
            if (value == 'FontName') {
                this.active_state['font-family'] = format;
                this.fontTag_to_spanTag('face');
            }
        },
        fontTag_to_spanTag() {
            var font_nodes =this.getFontNodes();
            this.font_tag_length = font_nodes.length;
            font_nodes.forEach(element=>{
                var span = document.createElement('span');
                this.styles_in_fonttag(element,span);
                span.innerHTML = element.innerHTML;
                element.parentNode.insertBefore(span, element);
                element.parentNode.removeChild(element);
            })
        },
        getFontNodes() {
            var selectedFontTags = [];
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const parentContainer = this.$refs.content;
            if (selection.rangeCount > 0 && parentContainer) {
                Array.from(parentContainer.childNodes).forEach(node => this.checkForFontTag(selectedFontTags,range,node));
            }
            return selectedFontTags;
        },
        checkForFontTag(selectedFontTags,range,node) {
            if (range.intersectsNode(node)) {
                if (node.nodeName.toLowerCase() === 'font') {
                    selectedFontTags.push(node);
                } else {
                    Array.from(node.getElementsByTagName('font')).forEach(fontNode => {
                        if (range.intersectsNode(fontNode)) {
                            selectedFontTags.push(fontNode);
                        }
                    });
                }
            }
        },    
        highlight_button(data) {
            this.active_state[data] = !this.active_state[data];
        },
        rgbToHex(rgb) {
            const colors = rgb.match(/\d+/g);
            return "#" + colors.map(color => {
                const hex = parseInt(color).toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            }).join('');
        },
        reset_Active() {
            this.active_state = {
                'bold': false,
                'italic': false,
                'underline': false,
                'font-size': '15px',
                'color': '#444444',
                'font-family': 'sans-serif',
                'formatBlock': 'normal',
                'align': 'format_align_left',
                'background': "texture1.jpg",
                'line_height':1.5
            }
        },
        open_image_in_fullView(e,url) {
            var ref = this;
                if (e.srcElement.tagName != 'SPAN') {
                    ref.$refs.full_img.src = url;
                    ref.image_full_view_class='';
                }
        },
        set_global_props(props) {
            if (props["background_image"]) {
                this.set_background_image_for_editor(props);
            }
            else {
                this.$refs.back_ground.style.backgroundImage = `url(${"texture1.jpg"})`
                this.back_ground = "texture1.jpg"
                this.active_state['background'] = this.back_ground;
            }
           
        },
        set_background_image_for_editor(props) {
            this.$refs.back_ground.style.backgroundImage = props["background_image"];
            this.back_ground = props["background_image"].replace("url(\"", "");
            this.back_ground = this.back_ground.replace("\")", ""); 
            this.active_state['background'] = this.back_ground;
        },
        change_background(data) {
            this.$refs.back_ground.style.backgroundImage = `url(${data})`;
            this.background = data;
            this.save_content(this.date);
            this.active_state['background'] = data;
        },
        insert_photo(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            const ref = this;
            reader.onload = function () {
                ref.storeDataURL(reader.result);
            };
            reader.readAsDataURL(file);
            this.$refs.image_file.value='';
        },
        storeDataURL(dataURL) {
            this.images_url.push(dataURL);
            this.save_content(this.date);
        },
        save_content(date) {
            var html = this.$refs.content;
            var back_ground = this.$refs.back_ground.style.backgroundImage;
            this.$emit('save_content', html, this.images_url, back_ground, date,this.height);
        },
        add_favourite() {
            this.$emit('add_fav')
        },
        close_container(event) {
            if (event.target.tagName == 'SPAN') {
                this.image_full_view_class='hide';
            }
        }
    }
};