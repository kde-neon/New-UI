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


// Mobiel device toush controll
let touch = {
    go: false,
    start: 0,
    move: 0,
    end: 0,
}


let swip = document.querySelector(".swip");
let steps = document.querySelector(".step");

function show_step() {
    shaodw.style.display = "block";
    steps.classList.remove("down");
    document.body.style.overflow = "hidden";
}

// swipe areat on stouch and move


swip.addEventListener("touchstart", function (e) {
    if (e.cancelable) {
        e.preventDefault();
        e.stopPropagation();
    }

    touch.go = true;
    touch.start = e.touches[0].clientY;

})

swip.addEventListener("touchmove", function (e) {
    if (e.cancelable) {
        e.preventDefault();
    }

    touch.move = e.touches[0].clientY;
})


// swipe step card on touchscreen device
function swipe(rm) {
    console.log(touch.go)
    let position = steps.getBoundingClientRect().top
    if (touch.go) {
        if (touch.start <= touch.move) {
            steps.style.transition = "all .0 ease";
            console.log(`-${Math.floor((touch.move - position) - 10)}px`)
            steps.style.bottom = `-${Math.floor((touch.move - position) * 1)}px`;
        } else {
            steps.style.transition = ".2s ease";
            steps.style.bottom = `0px`;
        }
    } else {
        steps.style.transition = ".2s ease";
        steps.style.bottom = `0px`
    }

    if (rm) {
        if ((touch.start * 2) < touch.move && touch.go === false) {
            steps.classList.add("down")
            shaodw.style.display = "none";
            document.body.style.overflow = "auto";
        } else {
            steps.style.transition = ".2s ease"
            steps.style.bottom = `0px`
        }
        touch.go = false;
        touch.start = 0;
        touch.move = 0;
    }

}

window.addEventListener("touchmove", function (e) {

    if (touch.go) {
        swipe()
        touch.move = e.changedTouches[0].clientY;
        if (e.cancelable) {
            e.preventDefault();
        }
    }

})

window.addEventListener("touchend", function () {
    touch.go = false;
    swipe(true)
})

window.addEventListener("touchcancill", function () {
    touch.go = false;
    swipe(true)
})