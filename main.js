let frame = document.querySelectorAll(".frame");
let shaodw = document.querySelector(".shadow");

// Step select array
let step = {
    select: Array(0),
    index: 0,

    // Math progress
    get prog() {
        return (100 / frame.length) * step.select.length
    }
}

function frame_click(e) {
    const index = Array.from(e.parentElement.children).indexOf(e)
    if (e.classList.contains("select")) {
        step.select.splice(index, 1)

        // Removing elemtn
        e.classList.remove("select");
        e.children[2].classList.remove("rm")
    } else {
        e.classList.add("select");

        // Adding element
        e.children[2].classList.add("rm")
        step.select.push(e.children[0].innerText)
    }

    step.index = index;

    // This print function is for exmple
    console.log(Math.floor(step.prog), "%")
    console.log(step.select)
}

let swip = document.querySelector(".swip");
let steps = document.querySelector(".step");

function show_step() {
    shaodw.style.display = "block";
    steps.classList.remove("down");
    document.body.style.overflow = "hidden";
}

// swipe areat on stouch and move