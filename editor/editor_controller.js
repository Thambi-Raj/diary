const editor_controller = {
    template:`<editor-root  
                :data      = "data"
                :image     = "image"  
                :template  = "template"
                :global_props = "global_props"
                :preview="preview"
                :date="date"
                :height=height
                @save_content="save_content"
                @add_fav="add_fav"
                > 
              </editor-root>`,
    props:{
        data:{
            type:Object
        },
        preview:{
            type:Boolean,
            default:false
        },
        date:{
            type:[Number,String]
        },
    },
    watch:{
        data(){
            this.template = this.data &&  this.data["contents"]  ?  this.decoded_html_string(this.data["contents"]):'';
            this.image =  this.data && this.data["images"] ? [...this.data["images"]] :[];
            this.global_props =  this.data && this.data["global_props"] ? this.data["global_props"] :{};
        },
    },
    data(){
          return{
            closed_element_index: [],
            editor_elements: [],
            image:this.get_images_array(),
            template:this.get_decode_html(),
            bookmark : true,
            global_props : this.get_global_props(),
            images : this.get_images_array().length,
            height:''
          }
    },
    methods:{   
            get_decode_html(){
                var string='';
                if(this.data){
                    string = this.data["contents"]  ?  this.decoded_html_string(this.data["contents"]):'';
                }
                return string;
            },
            get_images_array(){
                var img=this.data && this.data["images"] ? [...this.data["images"]] :[];
                return img;
            },
            get_global_props(){
                var glob={};
                if(this.data){
                    glob = this.data["global_props"] ? this.data["global_props"] :{};
                }
                return glob;
            },
            DFS(html){
                function recursion(child, htmlArray, styles, close_tag) {
                    for (var i = 0; i < child.length; i++) {
                        if (child[i].nodeType === 1) {
                            if (child[i].getAttribute("style")) {
                                styles[htmlArray.length] = child[i].getAttribute("style");
                            }
                            var a = htmlArray.length;
                            htmlArray.push(child[i].cloneNode(false));
                            recursion(child[i].childNodes, htmlArray, styles, close_tag);
                            if (styles[a]) {
                                close_tag.push(a);
                            }
                            htmlArray.push('</' + child[i].tagName.toLowerCase() + '>');
                        } else if (child[i].nodeType === 3) {
                            htmlArray.push(child[i]);
                        }
                    }
                }
                var child = html.children;
                recursion(child, this.editor_elements, {}, this.closed_element_index);
            },
            format_for_json() {
                var obj = {};
                obj["contents"] = [];
                obj["global_props"] = {};
                obj["images"]=[];
                return obj;
            },

            constructDiary_jsonFormat(content){
                var result = this.format_for_json();
                var single_line = {}
                var styles = {}
                var close = 0;
                for (var i = 0; i < content.length; i++) {
                    if (content[i].tagName && content[i].tagName.toLowerCase() == 'div') {
                       this.is_div(content[i],close,single_line); 
                    }
                    else if (content[i].tagName) {
                        this.get_styles_from_tag(content[i], styles,close);
                    }
                    else if (content[i].nodeType === 3) {
                      
                        var obj1 = this.set_Style_for_text(content[i].nodeValue, styles)
                        single_line["data"].push({...obj1});
                    }
                    else if (content[i] != '</br>') {
                        if (content[this.closed_element_index[close]] && content[this.closed_element_index[close]].getAttribute('style')) {
                            this.delete_style_present_in_attribute(content[this.closed_element_index[close]], styles);
                            close++;
                        }
                        this.get_tag_style(content[i], styles);
                        if(content[i]=='</div>')  {
                            result["contents"].push({...single_line});
                            single_line={};
                            styles={};
                        }
                    }
                }
                this.editor_elements=[];
                this.closed_element_index= [];
                return result;
            },

            is_div(content,close,single_line){
                this.check_for_lineStyle(content , single_line);
                    if(content.getAttribute('style')){
                        close++;  // 
                    }
            },

            check_for_lineStyle(element, json) {
                json["data"] = [];
                if (element.getAttribute('style')) {
                    json["styles"] = element.getAttribute('style');
                }
                else {
                    json["styles"] = null;
                }
            },

            get_tag_style(element, styles) {
                if (element == '</b>') {
                    delete styles['b'];
                } else if (element == '</u>') {
                    delete styles['u'];
                } else if (element == '</i>') {
                    delete styles['i']
                }
            },

            set_Style_for_text(text, styles) {
                var obj1 = {};
                obj1["content"] = text;
                obj1["styles"] = { ...styles};
                return obj1;
            },

            get_styles_from_tag(element, styles,close) {
                if (element.tagName.toLowerCase() != 'br') {
                    if (element.tagName.toLowerCase() != 'span') {
                        styles[element.tagName.toLowerCase()] = true;
                        if (element.getAttribute('style')) {
                            this.find_styles_in_tag(element, styles);
                            close++;
                        }
                    }
                    else {
                        this.find_styles_in_tag(element, styles);
                        close++;
                    }
                }
            }, 

            delete_style_present_in_attribute(content, obj) {
                var style = content.style;
                if (style.color) {
                    delete obj['color']
                }
                if (style.fontSize) {
                    delete obj['font-size']
                }
                if (style.fontFamily) {
                    delete obj['font-family']
                }
                if (style.textDecorationLine) {
                    delete obj['underline']
                }
                if (style.fontWeight) {
                    delete obj['b']
                }
                if (style.fontStyle == 'italic') {
                    delete obj['i']
                }
            },
            find_styles_in_tag(content, obj) {
                var style = content.style;
                if (style.color) {
                    obj['color'] = style.color;
                }
                if (style.fontSize) {
                    var z = style.fontSize.replace('px', '');
                    obj['font-size'] = z;
                }
                if (style.fontFamily) {
                    obj['font-family'] = style.fontFamily;
                }
                if (style.textDecorationLine) {
                    obj['underline'] = true;
                }
                if (style.fontWeight) {
                    obj['b'] = true;
                }
                if (style.fontStyle == 'italic') {
                    obj['i'] = true;
                }
            }, 

            save_content(html,images,background,date,height){
                this.DFS(html);
                var json_content = this.constructDiary_jsonFormat(this.editor_elements);
                json_content["images"] = images;
                this.images = images.length;
                json_content["global_props"]={"background_image":background};
                this.height = height;
                this.$emit('save_json_content',json_content,date);     
            },
            add_fav(){
                this.$emit('add_fav');
            },

            decoded_html_string(editor_content){
                var res_string = '';
                for (var i = 0; i < editor_content.length ; i++) {
                    res_string = this.check_single_line_styles(editor_content[i],res_string);
                    if (editor_content[i].data) {
                       res_string = this.content_present_in_line(editor_content[i],res_string); // add a styles for a content in html...
                    }
                    else {
                        res_string += '&ZeroWidthSpace;'
                    }
                    res_string += '</div>';
                }
                return res_string;
            },

            check_single_line_styles(editor_content,result){
                editor_content.styles ? result += '<div class="line-content" style="' + editor_content.styles + '">'
                        : result += '<div class="line-content">';
                return result
            },

            content_present_in_line(editor_content,res_string){
                editor_content.data.forEach((element, j) => {
                    if (j != 0) { //i need to compare a styles in currrent and previous element...
                        res_string = this.check_previous_close_tag(editor_content.data[j - 1].styles, element.styles, res_string);
                    }
                    res_string = this.check_for_new_tag(editor_content.data[j - 1] ? editor_content.data[j - 1].styles : '', element.styles, res_string);
                    res_string += element.content;
                    if (j == editor_content.data.length - 1) { //for end of the div i need to close all the respective div....
                        res_string = this.check_previous_close_tag(element.styles, '', res_string);
                    }
                });
                return res_string;
            },

            check_previous_close_tag(previous_styles, current_styles, div) {
                Object.keys(previous_styles).forEach(tag => {
                    if (current_styles == '' || current_styles[tag] != previous_styles[tag]) {
                        if (tag == 'b') {
                            div += '</b>';
                        }
                        else if (tag == 'i') {
                            div += '</i>';
                        }
                        else if (tag == 'u') {
                            div += '</u>';
                        }
                        else {
                            div += '</span>'
                        }
                    }
                })
                return div;
            },
            check_for_new_tag(previous_styles, current_styles, div) {
                Object.keys(current_styles).forEach(tag => {
                    if (previous_styles == '' || previous_styles[tag]!=current_styles[tag]) {
                        if (tag === 'b' || tag === 'i' || tag === 'u') {
                            div += `<${tag}>`;
                        } else if (tag === 'color') {
                            div += `<span style="color:${current_styles[tag]};">`;
                        } else if (tag === 'font-size') {
                            div += `<span style="font-size:${current_styles[tag]}px;">`;
                        } else if (tag === 'font-family') {
                            div += `<span style="font-family:${current_styles[tag]};">`;
                        }
                    }
                });
                return div;
            },

    }
}