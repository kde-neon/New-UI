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
    index: 0,
    start: 0,
    move: 0,
    end: 0,
}


let swip = document.querySelectorAll(".swip");
let steps = document.querySelectorAll(".step");

function show_step() {
    shaodw.style.display = "block";
    steps[0].classList.remove("down");
    document.body.style.overflow = "hidden";
}

// Swipe areat on stouch and move
swip.forEach((el, i) => {

    el.addEventListener("touchstart", function (e) {
        if (e.cancelable) {
            e.preventDefault();
            e.stopPropagation();
        }

        touch.index = i;
        touch.go = true;
        touch.start = e.touches[0].clientY;
    })

    el.addEventListener("touchmove", function (e) {
        if (e.cancelable) {
            e.preventDefault();
            e.stopPropagation();
        }
        touch.move = e.touches[0].clientY;
    })

})

// Swipe step card on touchscreen device
function Swipe(rm) {
    let el = steps[touch.index]
    let position = steps[touch.index].getBoundingClientRect().top
    if (touch.go) {
        if (touch.start < touch.move) {
            el.style.transition = "none";
            el.style.transform = `translateY(${Math.floor(touch.move - position)}px)`
        } else {
            el.style.transition = ".5s ease"
            el.style.transform = `translateY(0px)`
        }
    } else {
        el.style.transition = ".5s ease"
        el.style.transform = `translateY(0px)`
    }

    if (rm) {
        if ((touch.start * 2) < touch.move && touch.go === false) {
            el.classList.add("down")
            shaodw.style.display = "none";
            document.body.style.overflow = "auto";
        } else {
            el.style.transition = ".5s ease"
            el.style.transform = `translateY(0px)`
        }
        touch.go = false;
        touch.start = 0;
        touch.move = 0;
    }

}

window.addEventListener("touchmove", function (e) {

    if (touch.go) {
        if (e.cancelable) {
            e.preventDefault();
        }
        Swipe()
        touch.move = e.changedTouches[0].clientY;
    }

})

window.addEventListener("touchend", function (e) {
    touch.go = false;
    Swipe(true)
})

window.addEventListener("touchcancill", function (e) {
    touch.go = false;
    Swipe(true)
})