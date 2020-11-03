var gpa_marks = [7, 6, 5, 4, 0]
// var gpa_marks = [4, 3.5, 2.5, 1.5, 0.5]

function CalculateAll() {
    all_subjects = document.getElementsByClassName("input_field")
    total_subjects = 0
    sum_gpa = 0
    for (i=0; i<5; i++) {
        if (document.getElementsByClassName("input_field")[i].value != "") {
            total_subjects += parseInt(document.getElementsByClassName("input_field")[i].value)
            if (i == 0) {
                sum_gpa += document.getElementsByClassName("input_field")[i].value * gpa_marks[0]
            } else if (i == 1) {
                sum_gpa += document.getElementsByClassName("input_field")[i].value * gpa_marks[1]
            }  else if (i == 2) {
                sum_gpa += document.getElementsByClassName("input_field")[i].value * gpa_marks[2]
            }  else if (i == 3) {
                sum_gpa += document.getElementsByClassName("input_field")[i].value * gpa_marks[3]
            }
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
    current_cell = document.getElementsByClassName("input_field")[row].value
    if (current_cell == "") {
        document.getElementsByClassName("input_field")[row].value = 0}
    
    if (operation == "+") {
        document.getElementsByClassName("input_field")[row].value = parseInt(document.getElementsByClassName("input_field")[row].value) + 1
    } else if (operation == "-") {
        if (document.getElementsByClassName("input_field")[row].value != 0) {
            document.getElementsByClassName("input_field")[row].value = parseInt(document.getElementsByClassName("input_field")[row].value) - 1
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
    if (document.getElementById("new_subject_input").value != "" && document.getElementById("new_gpa").value != "") {

        new_subject = document.getElementById("new_subject_input").value
        new_gpa = document.getElementById("new_gpa").value
        gpa_gap = (new_gpa * (parseInt(new_subject) + parseFloat(total_subjects)) - parseInt(document.getElementById("total_sum").getAttribute("sum_gpa"))).toFixed(0)
        guessed_results = guessGPA(gpa_gap, new_subject)

        console.log(gpa_gap)
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
            console.log(current_comb.toString().length);

            if (current_comb.toString().length != 1) {
                current_comb = current_comb.split("7").join("HD");
                current_comb = current_comb.split("6").join("D");
                current_comb = current_comb.split("5").join("C");
                current_comb = current_comb.split("4").join("P");
                current_comb = current_comb.split("0").join("F");
                current_comb = current_comb.split(",").join(" + ");
            } else {
                current_comb = current_comb.toString().replace("7", "HD");
                current_comb = current_comb.replace("6", "D");
                current_comb = current_comb.replace("5", "C");
                current_comb = current_comb.replace("4", "P");
                current_comb = current_comb.replace("0", "F");
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

function guessGPA(mark_gap, subjects_count) {
    var tried_combinations = []
    var success_combinations = []

    if (subjects_count == 1) {
        for (a=0;a<gpa_marks.length;a++) {
            n1 = gpa_marks[a]
            
            if (! tried_combinations.includes(n1)) {
                tried_combinations.push(n1)

                if (n1 == mark_gap) {
                    console.log(n1)
                    success_combinations.push(n1)
                }
            }
        }
    } else if (subjects_count == 2) {
        for (a=0;a<gpa_marks.length;a++) {
            for (b=0;b<gpa_marks.length;b++) {
                n1 = gpa_marks[a]
                n2 = gpa_marks[b]
                current_combination = [n1, n2].sort((a,b)=>a-b)                
                current_combination = current_combination.join()

                if (! tried_combinations.includes(current_combination)) {
                    tried_combinations.push(current_combination)

                    if (n1 + n2 == mark_gap) {
                        console.log(n1 + "  + " + n2)
                        success_combinations.push(current_combination)
                    }
                }
            }
        }
    } else if (subjects_count == 3){        
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

                        if (n1 + n2 + n3 == mark_gap) {
                            console.log(n1 + "  + " + n2 + " + " + n3)
                            success_combinations.push(current_combination)
                    }
                }
            }
        }
    }
        
    } else if (subjects_count == 4){        
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

                        if (n1 + n2 + n3 + n4 == mark_gap) {
                            console.log(n1 + "  + " + n2 + " + " + n3 + " + " + n4)
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
