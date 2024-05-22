function calendar_view() {
    var parent = document.querySelector('#right-container')
    var calendar_view = create_DOM_elements('div', '', 'calendar-view', '');
    parent.appendChild(calendar_view);
    create_calendar_head(calendar_view);
    create_calendar_body(calendar_view, first_day_of_week());
}

function create_calendar_head(parent) {
    var days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var calendar_head = create_DOM_elements('div', '', 'calendar-head');
    for (var i = 0; i < 7; i++) {
        var span = create_DOM_elements('span', '', '', '', '', days[i]);
        var div = create_DOM_elements('div', 'day-container', days[i], '', [span]);
        calendar_head.appendChild(div);
    }
    parent.appendChild(calendar_head);
}

function first_day_of_week() {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    return [firstDay.getDay(), lastDay.getDate()];
}


function create_calendar_body(parent, first_day) {
    var calendar_body = create_DOM_elements('div', '', 'calendar-body');
    for (var i = 0; i < 36; i += 7) {
        var row = calendar_body_row(i, i + 7, first_day);
        calendar_body.appendChild(row);
    }
    parent.appendChild(calendar_body);
}
function calendar_body_row(start, end, first_day) {
    var row = create_DOM_elements('div', 'calendar-body-row');
    for (var i = start; i < end; i++) {
        var container = date_container();
        row.appendChild(container);
        if (i < first_day[0] || i >= first_day[1] + first_day[0]) {
            disable_container(container);
        }
        else {
            var date = create_DOM_elements('span', 'date', '', '', '', i - first_day[0] + 1);
            container.appendChild(date)
        }
        if (i == 10) {
            container.classList.add('image');
        }
    }
    return row;
}

function date_container() {
    var div = create_DOM_elements('div', 'date-container');
    return div;
}

function disable_container(container) {
    container.classList.add('disable');
}
function create_DOM_elements(type, className, id, value, children, innerText, color, types) {
    var element = document.createElement(type);
    className ? element.setAttribute('class', className) : '';
    id ? element.setAttribute('id', id) : '';
    innerText ? (element.innerHTML = innerText) : '';
    value ? element.value = value : '';
    color ? element.style.color = color : '';
    types ? element.type = types : ''
    children ? children.forEach(child => {
        element.appendChild(child);
    }) : '';
    return element;
}
calendar_view();
readable_view();
function readable_view() {
    document.querySelector('#left-container>#calendar-side-bar').style.display = 'none';
    document.querySelector('#right-container>#calendar-view').style.display = 'none'
    var side_container = create_DOM_elements('div', '', 'readable-side-bar');
    var current_month_year = clicked_month_year();
    var head_container = construct_readable_head(current_month_year[1], current_month_year[0]);
    side_container.appendChild(head_container)
    var body_container = create_readeable_view_body(current_month_year);
    side_container.appendChild(body_container);
    document.querySelector('#left-container').appendChild(side_container);
    var parent = create_DOM_elements('div', '', 'readable-view');
    create_tooltip(parent);
    var div = create_DOM_elements('div', '', 'word-pad');  
    div.setAttribute('contenteditable', true);
    div.addEventListener('drop', drop);
    
    var gty=create_DOM_elements('br');
    div.appendChild(create_DOM_elements('div','','','',[gty],'',))
    div.addEventListener('keyup',(e)=>{
        if(e.key =="Backspace"){
            if(div.children.length == 0){
                var gty=create_DOM_elements('br');
                div.appendChild(create_DOM_elements('div','','','',[gty],'',))
            }
        }
    })
    var texture = create_DOM_elements('div', '', 'texture-field', '', [div]);
    parent.appendChild(texture);
    document.querySelector('#right-container').appendChild(parent);
}
function clicked_month_year() {
    var selected_container = document.querySelector('#left-container>#calendar-side-bar>.clicked');
    var year = selected_container.querySelectorAll('#section-head>span')[1].innerHTML;
    var month = selected_container.querySelector('#section-body>.clicked').innerHTML;
    return [month, year];
}
function construct_readable_head(year, date) {
    var create_icon = create_DOM_elements('span', 'material-symbols-outlined', '', '', '', 'logout');
    var date_span = create_DOM_elements('span', 'head-text', '', '', '', date);
    var year_span = create_DOM_elements('span', 'head-text', '', '', '', year);
    var section_head = create_DOM_elements('div', '', 'section-head', '', [create_icon, date_span, year_span]);
    return section_head;
}
function create_readeable_view_body(month_year) {
    var section_body = create_DOM_elements('div', '', 'section-body');
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var monthIndex = months.indexOf(month_year[0]);
    var last_date = new Date(monthIndex == 11 ? month_year[1] + 1 : month_year[1], monthIndex == 11 ? 1 : (monthIndex + 1), 0).getDate();
    for (var i = 0; i < last_date; i++) {
        section_body.appendChild(create_page_design(i));
    }
    return section_body;
}
function create_page_design(i) {
    var date_div = create_DOM_elements('div', '', 'date', '', '', i + 1);
    var content_div = create_DOM_elements('div', '', 'content', '', '', i != 0 ? 'start write your Journey' : '');
    var page_view = create_DOM_elements('div', 'page-container', ('date--' + i), '', [date_div, content_div]);
    if (i == 0) {
        content_div.classList.add('image')
        page_view.classList.add('selected');
    }
    return page_view;
}


function create_tooltip(parent) {
    var features = ["Bold", "Italic", "Underline", "Image", "Quotes", "Background", "color", "font-size", "font-family", "heading", "align", "bullets", "Texture"];
    var tooltip_construct_json = {
        "span_class": "material-symbols-outlined",
        "Bold": {
            "text": "format_bold"
        },
        "Italic": {
            "text": "format_italic"
        },
        "Underline": {
            "text": "format_underlined"
        },
        "Image": {
            "text": "image",
            "input":"file"
        },
        "Quotes": {
            "text": "format_quote"
        },
        "Background": {
            "rect": true,
            "text": "BGcolor",
            "input":"color"
        },
        "color": {
            "rect": true,
            "text": "color",
            "input":"color"
        },
        "font-size": {
            "select": [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ]
        },
        "font-family": {
            "select": [
                "Arial",
                "Helvetica",
                "Times New Roman",
                "Georgia",
                "Courier New",
                "Verdana",
                "Tahoma",
                "Trebuchet MS",
                "Palatino Linotype",
                "Arial Black",
                "Comic Sans MS",
                "Impact",
                "Lucida Console",
                "Garamond",
                "Century Gothic",
                "Calibri",
                "Book Antiqua",
                "Franklin Gothic Medium",
                "Cambria",
                "Rockwell"
            ]
        },
        "heading": {
            "select": [
                "Normal",
                "Heading 1",
                "Heading 2",
                "Heading 3"
            ]
        },
        "align": {
            "span": true,
            "select": [
                "format_align_left",
                "format_align_right",
                "format_align_justify"
            ]
        },
        "bullets": {
            "span": true,
            "select": [
                "format_list_bulleted",
                "format_list_numbered"
            ]
        },
        "Texture": {
            "select": [
                "Texture 0",
                "Texture 1",
                "Texture 2",
                "Texture 3",
                "Texture 4",
                "Texture 5"
            ]
        }
    }

    var tooltip_container = create_DOM_elements('div', '', 'tool-container');
    for (var i = 0; i < features.length; i++) {
        var div = create_tooltip_div(tooltip_construct_json[features[i]], features[i]);
        tooltip_container.appendChild(div);
    }
    parent.append(tooltip_container);
}
function create_tooltip_div(format, key) {
    if (key == "Texture") {
        return image_icon_for_background(key);
    }
    else if (Object.keys(format).includes('select')) {
        var value = Object.values(format)
        return create_dropdown_button(value, key);
    }
    else if (Object.keys(format).length == 1) {
        return create_span_toolbar(format, key);
    }
    else {
        return color_input_button(format, key);
    }
}
function image_icon_for_background(key) {
    var values = [
        "texture51.jpg",
        "texture1.jpg",
        "texture6.avif",
        "texture2.jpg",
        "texture44.webp",
        "texture31.webp"
    ]
    var img = create_DOM_elements('img');
    img.setAttribute('src', values[0]);
    var drop_dowm = create_DOM_elements('span', 'material-symbols-outlined', '', '', '', 'arrow_drop_down');
    var div_head = create_DOM_elements('div', 'small-width', 'drop-down-head', '', [img, drop_dowm]);
    var div_body = create_DOM_elements('div', 'small-width', 'drop-down-body');
    div_head.addEventListener('click', () => {
        var prev = document.querySelector('.tool-button>.show');
        prev ? prev.classList.remove('show') : '';
        div_body.classList.add('show');
    })
    for (var i = 0; i < 6; i++) {
        let img = create_DOM_elements('img');
        img.setAttribute('src', values[i]);
        div_body.appendChild(img);
        ((img1) => {
            img1.addEventListener('click', () => {
                var img_clone = img1.cloneNode(true); // Cloning the clicked image
                div_head.removeChild(div_head.firstChild);
                div_head.prepend(img_clone);
            })
        })(img);
    }
    var container = create_DOM_elements('div', 'tool-button ', key, '', [div_head, div_body]);
    return container;
}

function create_dropdown_button(format, key) {
    var format_content = format.length != 1 ? format[1] : format[0];
    var span_true = format.length != 1 ? true : false;
    var span = create_DOM_elements('span', span_true ? 'material-symbols-outlined selected span_text' : 'selected', '', '', '', format_content[0]);
    var drop_dowm = create_DOM_elements('span', 'material-symbols-outlined', '', '', '', 'arrow_drop_down');
    var div_head = create_DOM_elements('div', span_true || typeof format[0][1] == "number" ? 'small-width' : '', 'drop-down-head', '', [span, drop_dowm]);
    var div_body = dropdown_contents(span_true, format_content, div_head, span_true || typeof format[0][1] == "number" ? 'small-width' : '');
    div_head.addEventListener('click', () => {
        var prev = document.querySelector('.tool-button>.show');
        prev ? prev.classList.remove('show') : '';
        div_body.classList.add('show');
    })
    var container = create_DOM_elements('div', 'tool-button ', key, '', [div_head, div_body]);
    return container;
}
function dropdown_contents(span_true, format, parent, parentclass) {
    var div = create_DOM_elements('div', parentclass, 'drop-down-body');
    var values = [
        "texture51.jpg",
        "texture1.jpg",
        "texture6.avif",
        "texture2.jpg",
        "texture44.webp",
        "texture31.webp"
    ]
    for (var i = 0; i < format.length; i++) {
        var span = create_DOM_elements('span', span_true ? "material-symbols-outlined" : '', '', '', '', format[i]);
        ((span, i) => {
            span.addEventListener('click', (e) => {
                parent.querySelector('.selected').innerHTML = span.innerText;
                if (span.innerText.startsWith('Texture')) {
                    document.querySelector('#texture-field').style.backgroundImage = 'url(' + values[i] + ')';
                }
                div.classList.remove('show');
            })

        })(span, i);
        div.appendChild(span);
    }
    return div;
}
function create_span_toolbar(format, key) {
    var span = create_DOM_elements('span', 'material-symbols-outlined', '', '', '', format.text);
    var div = create_DOM_elements('div', 'tool-button style', key, '', [span], '');
    div.addEventListener('click', (e) => {
        var prev = document.querySelector('.tool-button>.show');
        prev ? prev.classList.remove('show') : '';
        div.classList.contains('highlight') ? div.setAttribute('class', 'tool-button style') : div.classList.add('highlight');
        document.execCommand(key, false, null);
    })
    return div;
}
function color_input_button(format, key) {
    var input = create_DOM_elements('input',!format.rect?'none':'', format.text, '', '', '', '', format.input);
    var span = create_DOM_elements('span',!format.rect ? 'material-symbols-outlined':'', '', '','', format.text);
    var label = create_DOM_elements('label');
    label.setAttribute('for',format.text);
    label.innerText='upload';
    var add_res =[];
    format.text =='image' ? 
      input.addEventListener('change',(event)=>{
        var div =create_DOM_elements('div');
        var image = create_DOM_elements('img', '', 'opopop');
        image.src = URL.createObjectURL(event.target.files[0]);
        image.setAttribute("draggable", true);
        image.addEventListener("dragstart", dragStart);     
        div.appendChild(image);
        document.getElementById('word-pad').appendChild(div);
      }):'';
    format.rect?'':add_res.push(label);
    add_res.push(span)
    add_res.push(input);
    var main_div = create_DOM_elements('div', 'tool-button color', key, '', add_res);
    return main_div
};
function dragStart(event) {
    // Do something when drag starts
    console.log("Drag started");
}
function drop(ev){
    console.log('OP');
    // ev.preventDefault();
    // var data = ev.dataTransfer.getData("text");
    // ev.target.appendChild(document.getElementById(data));
    // console.log('PPP');
}
function change_text_format() {
    var selectedText = '';
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        selectedText = range.toString();
    }
}