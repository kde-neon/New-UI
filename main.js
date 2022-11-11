let frame = document.querySelectorAll(".frame");
let shaodw = document.querySelector(".shadow");

// Step select array
let step = {
    select: Array(),
    index: 0,

    // Math progress
    // Frame total length - 1 | becouse in frame class one element not for select
    get prog() {
        return (100 / frame.length - 1) * step.select.length
    }
}

function frame_click(e) {
    const index = Array.from(e.parentElement.children).indexOf(e)
    step.index = index;

    if (e.classList.contains("select")) {

        step.select.splice(index - 1, 1)

        // Removing elemtn
        e.classList.remove("select");
        e.children[2].classList.remove("rm")
    } else {
        e.classList.add("select");

        // Adding element
        e.children[2].classList.add("rm")
        step.select.push(e.children[0].innerText)
    }

    // This print function is for exmple
    console.log(Math.floor(step.prog), "%")
    console.log(step.select)
}

let swip = document.querySelector(".swip");
let steps = document.querySelector(".step");
let closeSteps = document.getElementById("closeSteps");

function show_step() {
    shaodw.style.display = "block";
    steps.classList.remove("down");
    document.body.style.overflow = "hidden";
}

// swipe areat on stouch and move

let sugation = document.querySelector('.sugation');
let approvalCard = document.getElementById("approvalCard")
let approvalButton = document.getElementById("approvalButton");

approvalButton.addEventListener("click", function () {
    if (sugation.classList.contains("dn")) {
        sugation.classList.remove("dn")
        approvalCard.classList.add("dn")
        steps.classList.add("down")
        shaodw.style.display = "none";
    } else {
        sugation.classList.add("dn")
        approvalCard.classList.remove("dn")
        steps.classList.add("down")
        shaodw.style.display = "none";
    }
    console.log(sugation.classList.contains("dn"))
})

closeSteps.addEventListener("click", function(){
    steps.classList.add("down")
    shaodw.style.display = "none";
})
