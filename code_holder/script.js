function showHide(block_number) {
    current_status = document.getElementsByClassName("textbox")[block_number].getAttribute("style")
    if (current_status != "display: none") {
        document.getElementsByClassName("textbox")[block_number].setAttribute("style", "display: none")
    } else {
    document.getElementsByClassName("textbox")[block_number].setAttribute("style", "display: block")
    }
}

// var b = ||1dli3oVPkMfk7HzYbEUPNQ==||

function copyText(block_number) {
    var el = document.createElement('textarea');
    el.value = document.getElementsByClassName("textbox")[block_number].innerText.trim();
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    document.getElementsByClassName("copy_button")[block_number].innerText = "Copied"
    document.getElementsByClassName("copy_button")[block_number].setAttribute("style", "background: #1ce65f; color: white")
    setTimeout(function(){
        document.getElementsByClassName("copy_button")[block_number].innerText = "Copy Code"
        document.getElementsByClassName("copy_button")[block_number].removeAttribute("style")
    }, 3000); 
}
