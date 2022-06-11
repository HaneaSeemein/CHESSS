function refine(rids) {
    alert("out of range filter on: " + rids);
    let solid = []
    for (let x = 0; x < rids.length; x++) {
        if ((10 < rids[x]) && (rids[x] % 10 != 0) && (rids[x] % 10 != 9) && (rids[x] < 89)) {
            solid.push(rids[x]);
        }
    }
    return solid
}

function valid(id, curr) {
    // alert("valid");
    let limit = eval("document.getElementById(" + id + ")");
    let current = eval("document.getElementById(" + curr + ")");
    limitcolor = limit.getAttribute("value");
    currentcolor = current.getAttribute("value");
    // alert(id, curr)
    color = limitcolor.charAt(0);
    if (limitcolor == "none") return true;
    else if (limitcolor == currentcolor) return false;
    else if (limitcolor != currentcolor) return true;
}

function knightmove(current) {
    var curr = parseInt(current);
    var nextid = [];
    nextid.push(curr + 12);
    nextid.push(curr + 8);
    nextid.push(curr + 21);
    nextid.push(curr + 19);
    nextid.push(curr - 12);
    nextid.push(curr - 8);
    nextid.push(curr - 21);
    nextid.push(curr - 19);
    nextid = refine(nextid);
    return nextid
}

function kingmove(current) {
    var curr = parseInt(current);
    var nextid = [];
    nextid.push(curr + 1);
    nextid.push(curr - 1);
    nextid.push(curr + 10);
    nextid.push(curr - 10);
    nextid.push(curr + 11);
    nextid.push(curr + 9);
    nextid.push(curr - 11);
    nextid.push(curr - 9);
    nextid = refine(nextid);
    return nextid
}

function queenmove(current) {
    var curr = parseInt(current);
    var nextid = bishopmove(current);
    var curr = parseInt(current);
    var ya = (parseInt(curr / 10)) * 10;
    var temp = curr + 10;
    while (temp < 89) {
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp + 10;
    }
    var temp = curr - 10;
    while (temp > 10) {
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp - 10;
    }
    var temp = curr - 1;
    while (temp > ya) {
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp - 1;
    }
    var temp = curr + 1;
    while (temp < (ya + 9)) {
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp + 1;
    }
    return nextid;
}

function bishopmove(current) {
    var curr = parseInt(current);
    var nextid = [];
    var temp = curr + 9;
    while ((10 < temp) && (temp % 10 != 0) && (temp % 10 != 9) && (temp < 89)) {
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp + 9;
    }

    var temp = curr + 11;
    while ((temp % 10 != 0) && (temp % 10 != 9) && (temp < 89)) {
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp + 11;
    }

    var temp = curr - 9;
    while ((10 < temp) && (temp % 10 != 0) && (temp % 10 != 9)) {
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp - 9;
    }

    var temp = curr - 11;
    while ((10 < temp) && (temp % 10 != 0) && (temp % 10 != 9)) {
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp - 11;
    }
    nextid = refine(nextid);
    return nextid
}

function rookmove(current) {
    var curr = parseInt(current);
    var nextid = [];
    var ya = (parseInt(curr / 10)) * 10;
    var temp = curr + 10;
    while (temp < 89) {
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp + 10;
    }
    var temp = curr - 10;
    while (temp > 10) {
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp - 10;
    }
    var temp = curr - 1;
    while (temp > ya) {
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp - 1;
    }
    var temp = curr + 1;
    while (temp < (ya + 9)) {
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp + 1;
    }
    return nextid;
}

function wpawnmove(current) {
    var curr = parseInt(current);
    var nextid = [];
    if (valid(curr + 10, curr))
        nextid.push(curr + 10);
    if (parseInt(curr / 10) == 2)
        if (valid(curr + 20, curr))
            nextid.push(curr + 20);
    return nextid
}

function bpawnmove(current) {
    var curr = parseInt(current);
    var nextid = [];
    if (valid(curr + 10, curr)) nextid.push(curr - 10);
    if (parseInt(curr / 10) == 2)
        if (valid(curr - 20, curr)) nextid.push(curr - 20);
    return nextid
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var moved = false;
// function play(c) {
var firstrow = true;
// if (c == "white") {}
var blocks = document.querySelectorAll(".blocks li button");
for (let index = 0; index < blocks.length; index++) {
    blocks[index].addEventListener("click", function() {
        let type = this.getAttribute("value");
        var ID = this.getAttribute("id");
        let allowedmoves = []
        if (type === "wpawn") {
            allowedmoves = wpawnmove(ID);
        } else if (type === "bpawn") {
            allowedmoves = bpawnmove(ID);
        } else if (type === "wrook" || type === "brook") {
            allowedmoves = rookmove(ID);
        } else
        if (type === "wbishop" || type === "bbishop") {
            allowedmoves = bishopmove(ID);
        } else if (type === "wknight" || type === "bknight") {
            allowedmoves = knightmove(ID);
        } else if (type === "wking" || type === "bking") {
            allowedmoves = kingmove(ID);
        } else if (type === "wkween" || type === "bkween") {
            allowedmoves = queenmove(ID);
        }
        // alert("checkpoint after allowed moves if else blocks");
        allowedboxes = [];
        for (let index = 0; index < allowedmoves.length; index++) {
            let box = eval("document.getElementById(" + allowedmoves[index] + ")");
            allowedboxes.push(box);
        }
        /////////////////////////////FAULTY////////////////////////////////////////////
        // let backbtn = document.querySelector("#back");
        // backbtn.classList.add("highlight");
        for (let index = 0; index < allowedboxes.length; index++) {
            moved = false;
            allowedboxes[index].classList.add("highlight");
            allowedboxes[index].addEventListener("click", function() {
                if (!moved) {
                    this.setAttribute("value", type);
                    let old = eval("document.getElementById(" + ID + ")");
                    old.setAttribute("value", "none");
                    moved = true;
                    index = allowedboxes.length;
                }
                allowedboxes = [];
                ////////////////////FAULTY//////////////////////////////////////////
                for (let index = 0; index < allowedboxes.length; index++) {
                    allowedboxes[index].classList.remove("highlight");
                }
            });
        }
    });
}
// }




// function rookmov(current) {
//     var curr = parseInt(current);
//     var nextid = [];
//     var xa = current % 10;
//     var ya = parseInt(current / 10);
//     for (let x = 0; x < 8; x++) {
//         z = (10 * x) + xa + 10;
//         if (valid(z, curr) || z == curr) {
//             if (z != curr) nextid.push(z);
//         } else break;
//     }
//     for (let y = 0; y < 8; y++) {
//         z = (10 * ya) + y + 1;
//         if (valid(z, curr) || z == curr) {
//             if (z != curr) nextid.push(z);
//         } else break;
//     }
//     return nextid
// }



// document.body.addEventListener("click", function() {
//     for (let index = 0; index < allowedboxes.length; index++) {
//         allowedboxes[index].classList.remove("highlight");
//     }
//     this.classList.remove("highlight");
// })