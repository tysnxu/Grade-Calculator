var gpa_marks_default = [7, 6, 5, 4, 0]
var gpa_marks = gpa_marks_default
var gpa_names = ["HD - ", "D - ", "C - ", "P - ", "F - "]
// var gpa_marks = [4, 3.5, 2.5, 1.5, 0.5]

function trigger_scale_area() {
    var scale_area = document.getElementById("scale_area");
    if (scale_area.hasAttribute("style")) {
        scale_area.removeAttribute("style")
    } else {
        scale_area.setAttribute("style", "display: none;")
    }
}


function change_scale(clear) {
    var all_scale_input = document.getElementById("scale_grid").getElementsByClassName("scale_input_field");

    if (clear) {
        scale_input = gpa_marks_default;
        for (i=0;i<all_scale_input.length;i++) {
            all_scale_input[i].value = ""
            document.getElementById("main_grid").getElementsByClassName("row_label")[i].removeAttribute("scale-rep")
        }
    } else {
        var scale_input = [];
        for (i=0;i<all_scale_input.length;i++) {
            current_value = all_scale_input[i].value
            scale_input.push(current_value)
        }
    }

    for (i=0;i<scale_input.length;i++) {
        var current_value = scale_input[i]
        if (current_value == "") {
            current_value = gpa_marks_default[i]
        }
        current_value = Number(current_value)
        scale_input[i] = current_value
        document.getElementById("main_grid").getElementsByClassName("row_label")[i].innerText = gpa_names[i] + current_value
        document.getElementById("main_grid").getElementsByClassName("row_label")[i].setAttribute("scale-rep", current_value)
    }
    CalculateAll()
}

function fetch_all_scale() {
    scale_fetched = []
    all_rep = document.getElementById("main_grid").getElementsByClassName("row_label");
    for (i=0;i<all_rep.length;i++) {
        if (all_rep[i].hasAttribute("scale-rep")) {
            scale_fetched.push(all_rep[i].getAttribute("scale-rep"))
        } else {
            scale_fetched.push(gpa_marks_default[i])
        }
}
    return scale_fetched
}

function CalculateAll() {
    // get all numbers
    var gpa_marks = fetch_all_scale()
    all_subjects = document.getElementsByClassName("input_field")
    total_subjects = 0
    sum_gpa = 0
    for (i=0; i<5; i++) {
        if (document.getElementById("main_grid").getElementsByClassName("input_field")[i].value != "") {
            total_subjects += parseInt(document.getElementById("main_grid").getElementsByClassName("input_field")[i].value)
            sum_gpa += document.getElementById("main_grid").getElementsByClassName("input_field")[i].value * gpa_marks[i]
        }
    }
    if (total_subjects == 0) {
        document.getElementById("total_sum").innerText = "GPA: " + 0 + " | Subjects: " + total_subjects
    } else {
        document.getElementById("total_sum").innerText = "GPA: " + (sum_gpa/total_subjects).toFixed(2) + " | Subjects: " + total_subjects
        document.getElementById("total_sum").setAttribute("sum_gpa", (sum_gpa))
        document.getElementById("total_sum").setAttribute("total_subjects", total_subjects)
    }
    calculate_guess_only()
}

function countAddSubtract(operation, row) {
    current_cell = document.getElementById("main_grid").getElementsByClassName("input_field")[row].value
    if (current_cell == "") {
        document.getElementById("main_grid").getElementsByClassName("input_field")[row].value = 0}
    
    if (operation == "+") {
        document.getElementById("main_grid").getElementsByClassName("input_field")[row].value = parseInt(document.getElementById("main_grid").getElementsByClassName("input_field")[row].value) + 1
    } else if (operation == "-") {
        if (document.getElementById("main_grid").getElementsByClassName("input_field")[row].value != 0) {
            document.getElementById("main_grid").getElementsByClassName("input_field")[row].value = parseInt(document.getElementById("main_grid").getElementsByClassName("input_field")[row].value) - 1
        }
    }
    CalculateAll()
}

function triggerGuessGPA() {
    current_style = document.getElementById("guess-gpa-trigger").getAttribute("class")
    if (current_style == "black_block button") {
        // trigger
        document.getElementById("guess-gpa-trigger").setAttribute("class", "black_block_pressed button")
        // document.getElementById("hint_text_div").setAttribute("style", "display: none")
        document.getElementById("hint_text_div").setAttribute("style", "color: lightgrey")

        // update Placeholder
        current_gpa = document.getElementById("total_sum").getAttribute("sum_gpa")
        total_subjects = document.getElementById("total_sum").getAttribute("total_subjects")
        if (total_subjects == null) {
            document.getElementById("guess-gpa-trigger").innerText = "Guess GPA (Fill the chart above first.)"
        } else {            
            document.getElementById("guess-gpa-trigger").innerText = "Guess GPA"
            hint_subjects = 3
            placeholder_hint = ((parseInt(current_gpa) + 21)/(parseInt(total_subjects)+parseInt(hint_subjects))).toFixed(2)
            document.getElementById("guess_GPA_main").getElementsByClassName("input_field")[0].setAttribute("placeholder", placeholder_hint)
        }
        calculate_guess_only()

        document.getElementById("guess_GPA_main").setAttribute("style", "display: grid")
    } else if (current_style == "black_block_pressed button") {
        document.getElementById("hint_text_div").removeAttribute("style")
        // Deactivate
        document.getElementById("guess-gpa-trigger").setAttribute("class", "black_block button")
        document.getElementById("guess_GPA_main").setAttribute("style", "display: none")
    }
}

function calculate_guess_only() {
    var gpa_marks = fetch_all_scale()
    if (document.getElementById("new_subject_input").value != "" && document.getElementById("new_gpa").value != "") {

        // get new total gpa, average it, if equal new gpa, return it
        var new_subject = document.getElementById("new_subject_input").value;
        var new_total_subject = parseInt(new_subject) + parseInt(total_subjects)
        var new_gpa = document.getElementById("new_gpa").value
        var old_total_gpa = document.getElementById("total_sum").getAttribute("sum_gpa")

        // console.log("Subjects Added")
        // console.log(new_subject)
        // console.log("New Total Subjects")
        // console.log(new_total_subject)
        // console.log("Target GPA")
        // console.log(new_gpa)
        // console.log("Old Total GPA")
        // console.log(old_total_gpa)

        guessed_results = guessGPA(new_gpa, new_subject, new_total_subject, old_total_gpa)

        // console.log(guessed_results)
        document.getElementById("guess_gpa_result").innerHTML = "Possibilities: <br>"
        counter = 1
    
        if (guessed_results.length == 0) {
            document.getElementById("guess_gpa_result").innerHTML += "<br>";
            document.getElementById("guess_gpa_result").innerHTML += "( Can't think of anything. )";
            document.getElementById("guess_gpa_result").innerHTML += "<br>";
            document.getElementById("guess_gpa_result").innerHTML += "( Please double check. )";
        }


        for (i=0;i<guessed_results.length;i++) {
            current_comb = guessed_results[i];
            // console.log(current_comb);
            // console.log(current_comb.toString().length);

            if (current_comb.toString().length != 1) {
                current_comb = current_comb.split(gpa_marks[0]).join("HD");
                current_comb = current_comb.split(gpa_marks[1]).join("D");
                current_comb = current_comb.split(gpa_marks[2]).join("C");
                current_comb = current_comb.split(gpa_marks[3]).join("P");
                current_comb = current_comb.split(gpa_marks[4]).join("F");
                current_comb = current_comb.split(",").join(" + ");
            } else {
                current_comb = current_comb.toString().replace(gpa_marks[0], "HD");
                current_comb = current_comb.replace(gpa_marks[1], "D");
                current_comb = current_comb.replace(gpa_marks[2], "C");
                current_comb = current_comb.replace(gpa_marks[3], "P");
                current_comb = current_comb.replace(gpa_marks[4], "F");
            }
            
            // console.log(current_comb);

            document.getElementById("guess_gpa_result").innerHTML += "<br>";
            document.getElementById("guess_gpa_result").innerHTML += counter;
            document.getElementById("guess_gpa_result").innerHTML += ". ";
            document.getElementById("guess_gpa_result").innerHTML += current_comb;
            counter += 1;
        }
    }
}

function guessGPA(target_gpa, new_sub, new_total_subject, old_total_gpa) {
    var tried_combinations = []
    var success_combinations = []
    var gpa_marks = fetch_all_scale()

    if (new_sub == 1) {
        for (a=0;a<gpa_marks.length;a++) {
            n1 = gpa_marks[a]
            
            if (! tried_combinations.includes(n1)) {
                tried_combinations.push(n1)

                current_gpa = ((parseFloat(old_total_gpa) + parseFloat(n1)) / new_total_subject).toFixed(2)
                current_gpa = Number(current_gpa)

                if (current_gpa == target_gpa) {
                        // console.log(n1);
                        success_combinations.push(n1)
                }
            }
        }
    } else if (new_sub == 2) {
        for (a=0;a<gpa_marks.length;a++) {
            for (b=0;b<gpa_marks.length;b++) {
                n1 = gpa_marks[a]
                n2 = gpa_marks[b]
                current_combination = [n1, n2].sort((a,b)=>a-b)                
                current_combination = current_combination.join()

                if (! tried_combinations.includes(current_combination)) {
                    tried_combinations.push(current_combination)
                    // console.log(current_combination)

                    current_gpa = ((parseFloat(old_total_gpa) + parseFloat(n1) + parseFloat(n2)) / new_total_subject).toFixed(2)
                    current_gpa = Number(current_gpa)

                    if (current_gpa == target_gpa) {
                        success_combinations.push(current_combination)
                    }
                }
            }
        }
    } else if (new_sub == 3){        
        for (a=0;a<gpa_marks.length;a++) {
            for (b=0;b<gpa_marks.length;b++) {
                for (c=0;c<gpa_marks.length;c++) {
                    n1 = gpa_marks[a]
                    n2 = gpa_marks[b]
                    n3 = gpa_marks[c]
                    current_combination = [n1, n2, n3].sort((a,b)=>a-b)
                    current_combination = current_combination.join()

                    if (! tried_combinations.includes(current_combination)) {
                        tried_combinations.push(current_combination)

                        // console.log(current_combination);
                        current_gpa = ((parseFloat(old_total_gpa) + parseFloat(n1) + parseFloat(n2) + parseFloat(n3)) / new_total_subject).toFixed(2)
                        current_gpa = Number(current_gpa)


                        if (current_gpa == target_gpa) {
                            success_combinations.push(current_combination)
                    }
                }
            }
        }
    }
        
    } else if (new_sub == 4){        
        for (a=0;a<gpa_marks.length;a++) {
            for (b=0;b<gpa_marks.length;b++) {
                for (c=0;c<gpa_marks.length;c++) {
                    for (d=0;d<gpa_marks.length;d++) {
                    n1 = gpa_marks[a]
                    n2 = gpa_marks[b]
                    n3 = gpa_marks[c]
                    n4 = gpa_marks[d]
                    current_combination = [n1, n2, n3, n4].sort((a,b)=>a-b)
                    current_combination = current_combination.join()

                    if (! tried_combinations.includes(current_combination)) {
                        tried_combinations.push(current_combination)
                        // console.log(current_combination);
                        current_gpa = ((parseFloat(old_total_gpa) + parseFloat(n1) + parseFloat(n2) + parseFloat(n3) + parseFloat(n4)) / new_total_subject).toFixed(2)
                        current_gpa = Number(current_gpa)

                        if (current_gpa == target_gpa) {
                            success_combinations.push(current_combination)
                    }
                }
            }
        }
    }
}
        
    }
    return success_combinations
}


function grade_calculator_link() {
    window.location.href = 'https://tysnxu.github.io/';
}
