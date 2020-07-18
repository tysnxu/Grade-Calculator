// check cookie
cookie_magic_word = "_tgcl"

var prev_cookie = document.cookie
if (prev_cookie == "_tgcl=0") {
    console.log("No Cookies")
} else {console.log("Cookie Detected")
    old_cookie_data = prev_cookie.split(";")
        for(i=0;i<old_cookie_data.length;i++){
            if(old_cookie_data[i].includes(cookie_magic_word)) {
                var prev_cookie = old_cookie_data[i].replace("_tgcl=", "").split(",").slice(0,-1)
                if(prev_cookie != 0){            
                    if (prev_cookie.length % 3 === 0) {
                    // console.log("Valid Cookie")
                    // console.log(prev_cookie)
                    reloadCookie(prev_cookie)
                    sum_calculate()
                    updateConstantChart()
                }
            }
        }
    }
}

function reloadCookie(prev_array) {
    rows_toadd = prev_array.length / 3 - 1
    for (i=0;i<rows_toadd;i++) {addRow()}
    for (i=0;i<prev_array.length;i++) {
        document.getElementsByClassName("input_field")[i].value = prev_array[i].trim()
    }
    rows_to_calculate = prev_array.length / 3
    console.log(rows_to_calculate)
    for (i=0;i<rows_to_calculate;i++) {
        calculate_only(i)
        calc_func = "Calculate(" + (i) + ")"
        document.getElementsByClassName("your_grade")[i].setAttribute("onchange", calc_func)
        document.getElementsByClassName("max_grade")[i].setAttribute("onchange", calc_func)
    }
    
}

function resetCookie() {
    document.cookie = "_tgcl=0"
    location.reload()
}

function getGradeAbrev(grade) {
    if (grade >= 85) {return "HD"} else if (grade >= 75) {return "D"} else if (grade >= 65) {return "C"} else if (grade >= 50) {return "P"} else {return "F"}
}

function resetWhatIfChart() {
    document.getElementsByClassName("whatif_chart")[0].innerHTML = ""
}

function configWhatIfChart(row) {
    if (document.getElementsByClassName("whatif_chart")[0].innerHTML != "") {
        resetWhatIfChart()
    }
    document.getElementById("whatif_main_holder").setAttribute("style", "display: block;")
    
    // document.getElementById("h1").innerText = "Grade Calculator > WhatIf ?!"
    all_percentage = document.getElementsByClassName("percentage_grade")
    segments_count = 0
    percentage_array = []
    percentage_remain = 100
    for (i=0;i<all_percentage.length;i++) {
        current_percentage = all_percentage[i].value

        if (i != row && current_percentage != "") {
            percentage_array.push(parseFloat(document.getElementsByClassName("grade_label")[i].innerText))
            percentage_remain -= parseFloat(document.getElementsByClassName("grade_label")[i].innerText)
            // console.log(percentage_remain)
            // console.log(percentage_array)

            var div = document.createElement('div');
            div.innerHTML = document.getElementsByClassName("row_label")[i].innerText;
            document.getElementsByClassName('whatif_chart')[0].appendChild(div);
        }
    }
    percentage_array.push(parseFloat(all_percentage[row].value))
    percentage_remain -= parseFloat(all_percentage[row].value)
    
    var div = document.createElement('div');
    div.innerHTML = document.getElementsByClassName("row_label")[row].innerText;
    div.setAttribute("id", "selected_whatif_holder")
    document.getElementsByClassName('whatif_chart')[0].appendChild(div);

    var div = document.createElement('div');
    div.setAttribute("id", "selected_whatif")
    document.getElementById('selected_whatif_holder').appendChild(div);

    var div = document.createElement('div');
    div.setAttribute("style", "background: #c20c0c;")
    div.setAttribute("class", "whatif_incell_color")
    document.getElementById('selected_whatif').appendChild(div);

    var div = document.createElement('div');
    div.setAttribute("style", "background: #c2730c;")
    div.setAttribute("class", "whatif_incell_color")
    document.getElementById('selected_whatif').appendChild(div);

    var div = document.createElement('div');
    div.setAttribute("style", "background: #aac20c;")
    div.setAttribute("class", "whatif_incell_color")
    document.getElementById('selected_whatif').appendChild(div);

    var div = document.createElement('div');
    div.setAttribute("style", "background: #3c8f00;")
    div.setAttribute("class", "whatif_incell_color")
    document.getElementById('selected_whatif').appendChild(div);

    var div = document.createElement('div');
    div.setAttribute("style", "background: #00cf37;")
    div.setAttribute("class", "whatif_incell_color")
    document.getElementById('selected_whatif').appendChild(div);



    if (percentage_remain != 0) {
        percentage_array.push(percentage_remain)
    }
    // console.log(percentage_array)
    grid_template = "grid-template-columns: "
    for (i=0;i<percentage_array.length;i++) {
        grid_template += percentage_array[i].toString()
        // console.log(grid_template)
        grid_template += "% "
    }
    console.log(grid_template)
    document.getElementById("whatif_main_holder").getElementsByClassName("whatif_chart")[0].setAttribute("style", grid_template)
}

function getColor(grade) {
    // console.log(grade)
    if (grade >= 85) {return "#00cf37"} else if (grade >= 75) {return "#3c8f00"} else if (grade >= 65) {return "#aac20c"} else if (grade >= 50) {return "#c2730c"} else {return "#c20c0c"}
}

function sum_calculate() {
    var sum = 0
    all_grades = document.getElementsByClassName("grade_label")
    for (i=0;i<all_grades.length;i++) {
        if (isNaN(all_grades[i].innerText)) {
            console.log("Skipping " + all_grades[i].innerText)
        } else {
        sum += parseFloat(all_grades[i].innerText)
        }
    }
    // console.log(sum)
    
    var percentage_sum = 0
    all_percentage = document.getElementsByClassName("percentage_grade")
    for (i=0;i<all_percentage.length;i++) {
        current_percentage = all_percentage[i].value
        if (current_percentage == "") {
            console.log("Skipping " + current_percentage)
        } else {percentage_sum += parseFloat(current_percentage)}
        // console.log(all_grades[i])
    }
    // console.log(sum)
    if (percentage_sum > 100) {
        alert("Ooops.. \n\nThe sum of percentage is larger than 100?\nPlease check!")
    }
    document.getElementById("total_sum").innerText = "The total is " + sum.toFixed(2) + ", which is " + percentage_sum.toFixed(0) + "% of the final grade."
    document.getElementById("total_sum").setAttribute("Style", ("background: " + getColor((sum/percentage_sum)*100)))
    document.getElementById("grade_abbrev").innerText = getGradeAbrev((sum/percentage_sum)*100)
}

function checkValid(row) {            
    var num1 = document.getElementsByClassName("your_grade")[row].value.replace("%", "")
    var num2 = document.getElementsByClassName("max_grade")[row].value.replace("%", "")
    var num3 = document.getElementsByClassName("percentage_grade")[row].value.replace("%", "")

    if (num2 == "") {
        document.getElementsByClassName("max_grade")[row].value = 100
        num2 = 100
    }

    if (num2 > 100) {
        document.getElementsByClassName("max_grade")[row].value = 100
        alert("The maximum shouldn't be more than 100%!")
        num2 = 100
    }

    if (Number(num2) < Number(num1)) {
        alert("Ooops! \nThe maximum number should be higher than your grade!\n\nI have changed the number to 100.")
        document.getElementsByClassName("max_grade")[row].value = 100
    }
    return true
}

function whatIf(row) {
    document.getElementById("constant_visual_section").setAttribute("style", "display: none")
    if (document.getElementById("whatif_active")) {
        whatif_row = document.getElementById("whatif_active").getAttribute("row")
        if (whatif_row == row) {
            var num1 = document.getElementsByClassName("your_grade")[whatif_row].value
            var num2 = document.getElementsByClassName("max_grade")[whatif_row].value
            var num3 = document.getElementsByClassName("percentage_grade")[whatif_row].value
            document.getElementsByClassName("grade_label")[whatif_row].innerText = (parseFloat(num1) / parseFloat(num2) * num3).toFixed(2)
            document.getElementsByClassName("grade_label")[whatif_row].setAttribute("style", ("background: " + getColor(parseFloat(whatif_row) / parseFloat(whatif_row)*100)))
            sum_calculate()
        } else {
            document.getElementsByClassName("your_grade")[whatif_row].value = document.getElementsByClassName("max_grade")[whatif_row].value
            document.getElementById("whatif_active").removeAttribute("id")
            var num1 = document.getElementsByClassName("your_grade")[whatif_row].value
            var num2 = document.getElementsByClassName("max_grade")[whatif_row].value
            var num3 = document.getElementsByClassName("percentage_grade")[whatif_row].value
            document.getElementsByClassName("grade_label")[whatif_row].innerText = (parseFloat(num1) / parseFloat(num2) * num3).toFixed(2)
            document.getElementsByClassName("grade_label")[whatif_row].setAttribute("style", ("background: " + getColor(parseFloat(whatif_row) / parseFloat(whatif_row)*100)))
            sum_calculate()
        }

    }
    
    document.getElementById("what_if").setAttribute("style", "display: block")
    // document.getElementById("h1").innerText = "Grade Calculator > WhatIf ?!"

    document.getElementsByClassName("grade_label")[row].innerText = 0
    document.getElementsByClassName("your_grade")[row].setAttribute("id","whatif_active")
    document.getElementsByClassName("your_grade")[row].setAttribute("row", row)
    document.getElementsByClassName("grade_label")[row].removeAttribute("style")
    
    num2 = document.getElementsByClassName("max_grade")[row].value.replace("%", "").replace("-", "")
    num3 = document.getElementsByClassName("percentage_grade")[row].value.replace("%", "").replace("-", "")
    sum_calculate()

    assessment_name = document.getElementsByClassName("row_label")[row].innerText
    var sum_others = 0
    all_grades = document.getElementsByClassName("grade_label")
    for (i=0;i<all_grades.length;i++) {
        if (isNaN(all_grades[i].innerText || i == row)) {
            console.log("Skipping " + all_grades[i].innerText)
        } else {
        sum_others += parseFloat(all_grades[i].innerText)
        }
        console.log(sum_others)
    }
    var percentage_sum = 0
    all_percentage = document.getElementsByClassName("percentage_grade")
    for (i=0;i<all_percentage.length;i++) {
        current_percentage = all_percentage[i].value
        if (current_percentage == "") {
            console.log("Skipping " + current_percentage)
        } else {percentage_sum += parseFloat(current_percentage)}
        // console.log(all_grades[i])
    }
    // A2 -> HD | Final -> 18.4
    document.getElementById('whatif_title').innerText = "What if " + assessment_name + " is ..."
    document.getElementById("whatif_100").innerText = "100 (" + num2 + ") | Final -> " + ((Number(sum_others)+Number(parseFloat(num3))).toFixed(1) + " / " + percentage_sum + " ( " + getGradeAbrev(((sum_others+parseFloat(num3))/percentage_sum*100)) + " )")
    document.getElementById("whatif_HD").innerText = "HD ("+ (0.85*num2).toFixed(1) + ") | Final -> " + ((Number(sum_others)+Number(parseFloat(num3*0.85))).toFixed(1) + " / " + percentage_sum + " ( " + getGradeAbrev(((sum_others+parseFloat(num3*0.85))/percentage_sum*100)) + " )")
    document.getElementById("whatif_D").innerText = "D (" + (0.75*num2).toFixed(1) + ") | Final -> " + ((Number(sum_others)+Number(parseFloat(num3*0.75))).toFixed(1) + " / " + percentage_sum + " ( " + getGradeAbrev(((sum_others+parseFloat(num3*0.75))/percentage_sum*100)) + " )")
    document.getElementById("whatif_C").innerText = "C (" + (0.65*num2).toFixed(1) + ") | Final -> " + ((Number(sum_others)+Number(parseFloat(num3*0.65))).toFixed(1) + " / " + percentage_sum + " ( " + getGradeAbrev(((sum_others+parseFloat(num3*0.65))/percentage_sum*100)) + " )")
    document.getElementById("whatif_P").innerText = "P (" + (0.5*num2).toFixed(1) + ") | Final -> " + ((Number(sum_others)+Number(parseFloat(num3*0.50))).toFixed(1) + " / " + percentage_sum + " ( " + getGradeAbrev(((sum_others+parseFloat(num3*0.50))/percentage_sum*100)) + " )")
    document.getElementById("whatif_F").innerText = "0 (0) | Final -> " + ((Number(sum_others)).toFixed(1) + " / " + percentage_sum + " ( " + getGradeAbrev(((sum_others)/percentage_sum*100)) + " )")
    configWhatIfChart(row)
}

function calculate_only(row) {    
    var num1 = document.getElementsByClassName("your_grade")[row].value
    var num2 = document.getElementsByClassName("max_grade")[row].value
    var num3 = document.getElementsByClassName("percentage_grade")[row].value
    
    document.getElementsByClassName("grade_label")[row].innerText = (parseFloat(num1) / parseFloat(num2) * num3).toFixed(2)
    document.getElementsByClassName("grade_label")[row].setAttribute("style", ("background: " + getColor(parseFloat(num1) / parseFloat(num2)*100)))
}

function Calculate(row) {
    if (document.getElementById("whatif_active") && document.getElementById("whatif_active").getAttribute("row") == row && num1 != "What If") {
        document.getElementById("whatif_active").removeAttribute("id")
        calculate_only(row)       

    }
    if (checkValid(row)) {
        var num1 = document.getElementsByClassName("your_grade")[row].value.replace("%", "")
        var num2 = document.getElementsByClassName("max_grade")[row].value.replace("%", "").replace("-", "")
        var num3 = document.getElementsByClassName("percentage_grade")[row].value.replace("%", "").replace("-", "")
        document.getElementsByClassName("grade_label")[row].innerText = (parseFloat(num1) / parseFloat(num2) * num3).toFixed(2)
        document.getElementsByClassName("grade_label")[row].setAttribute("style", ("background: " + getColor(parseFloat(num1) / parseFloat(num2)*100)))
        sum_calculate()

        calc_func = "Calculate(" + (row) + ")"
        document.getElementsByClassName("your_grade")[row].setAttribute("onchange", calc_func)
        document.getElementsByClassName("max_grade")[row].setAttribute("onchange", calc_func)
        updateConstantChart()
            
    if (num1 == "?" || num1 == "*" || num1 == "#" || num1 == "!" || num1.toLowerCase() == "x" || num1 == "@" || num1.toLowerCase().replace(" ", "") == "whatif") {
        document.getElementsByClassName("your_grade")[row].value = "What If"
        whatIf(row)
        return false
    } else { 
        if (document.getElementById("whatif_active")) {whatIf(document.getElementById("whatif_active").getAttribute("row"))
        } else {
            document.getElementById("what_if").setAttribute("style", "display: none")
            document.getElementById("whatif_main_holder").setAttribute("style", "display: none")
            document.getElementById("h1").innerText = "Grade Calculator"

        }
    }

    calc_func = "Calculate(" + (row) + ")"
    document.getElementsByClassName("your_grade")[row].setAttribute("onchange", calc_func)
    document.getElementsByClassName("max_grade")[row].setAttribute("onchange", calc_func)
    cookieSaveCurrent()
}
}

function addRow() {
    row_number = document.getElementsByClassName("row_label").length + 1
    calc_func = "Calculate(" + document.getElementsByClassName("row_label").length + ")"
    var div = document.createElement('div');
    div.setAttribute('class', 'row_label');
    div.innerHTML = "A" + row_number;
    document.getElementById('main_grid').appendChild(div);

    var div = document.createElement('input');
    div.setAttribute('class', 'input_field your_grade');
    div.setAttribute('type', ' text');
    div.setAttribute('autocomplete', 'off');
    div.setAttribute('placeholder', 'I got ...');
    document.getElementById('main_grid').appendChild(div);

    var div = document.createElement('input');
    div.setAttribute('class', 'input_field max_grade');
    div.setAttribute('type', ' text');
    div.setAttribute('autocomplete', 'off');
    div.setAttribute('placeholder', 'Out of ...');
    document.getElementById('main_grid').appendChild(div);

    var div = document.createElement('input');
    div.setAttribute('onchange', calc_func);
    div.setAttribute('class', 'input_field percentage_grade');
    div.setAttribute('type', ' text');
    div.setAttribute('autocomplete', 'off');
    div.setAttribute('placeholder', 'is ...% of final mark');
    document.getElementById('main_grid').appendChild(div);
    
    var div = document.createElement('div');
    div.setAttribute('class', 'grade_label');
    div.innerHTML = "← Fill First";
    document.getElementById('main_grid').appendChild(div);
}

function updateConstantChart() {
    if (document.getElementById("whatif_active")) {
        document.getElementById("constant_visual_section").setAttribute("style", "display: none")
    } else {
    document.getElementsByClassName('constant_visual_chart')[0].innerHTML = ""
    console.log("update visual")
    document.getElementById("constant_visual_section").setAttribute("style", "display: block")
    // document.getElementById("h1").innerText = "Grade Calculator > WhatIf ?!"

    all_grade = document.getElementsByClassName("grade_label")

    var percentage_array = []
    var percentage_remain = 100
    for (i=0;i<all_grade.length;i++) {
        current_grade = all_grade[i].innerText
        // console.log(current_grade)


        if (current_grade != "← Fill First") {
            percentage_array.push(parseFloat(current_grade))
            percentage_remain -= parseFloat(current_grade)
            // console.log(percentage_remain)
            // console.log(percentage_array)

            var div = document.createElement('div');
            div.innerHTML = document.getElementsByClassName("row_label")[i].innerText;
            document.getElementsByClassName('constant_visual_chart')[0].appendChild(div);
        }
    }
        
    if (percentage_remain != 0) {
        percentage_array.push(percentage_remain)
    }

    // console.log(percentage_array)
    grid_template = "grid-template-columns: "
    for (i=0;i<percentage_array.length;i++) {
        grid_template += percentage_array[i].toString()
        // console.log(grid_template)
        grid_template += "% "
    }
    console.log(grid_template)
    document.getElementById("constant_visual_section").getElementsByClassName("constant_visual_chart")[0].setAttribute("style", grid_template)
    }

}

function cookieSaveCurrent() {
    // console.log("trigger cookie")
    all_fields = document.getElementsByClassName("input_field");
    // console.log(all_fields)
    all_field_string = ""
    for (i=0;i<all_fields.length;i++){
        all_field_string += all_fields[i].value
        all_field_string += ","
    }
    console.log(all_field_string)
    document.cookie = cookie_magic_word + "=" + all_field_string
}
