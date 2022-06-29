function refine(rids) {
    let solid = []
    for (let x = 0; x < rids.length; x++) {
        if ((10 < rids[x]) && (rids[x] % 10 != 0) && (rids[x] % 10 != 9) && (rids[x] < 89)) {
            solid.push(rids[x]);
        }
    }
    return solid
}

function kill(id, curr) {
    let limit = eval("document.getElementById(" + id + ")");
    let current = eval("document.getElementById(" + curr + ")");
    limitcolor = limit.getAttribute("value");
    currentcolor = current.getAttribute("value");
    colordest = limitcolor.charAt(0);
    colorcurr = currentcolor.charAt(0);
    if (colordest == 'n') return false;
    else if (colordest != colorcurr) {
        if (limitcolor == "wking" || limitcolor == "bking") { alert("check") }
        return true;
    } else return false;
}

function valid(id, curr) {
    let limit = eval("document.getElementById(" + id + ")");
    let current = eval("document.getElementById(" + curr + ")");
    limitcolor = limit.getAttribute("value");
    currentcolor = current.getAttribute("value");
    colordest = limitcolor.charAt(0);
    colorcurr = currentcolor.charAt(0);
    if (colordest == "n") return true;

    else if (colordest == colorcurr) return false;
}


function knightmove(current) {
    var curr = parseInt(current);
    var allnext = [12, 8, 21, 19];
    var nid = [];
    var nextid = [];
    for (let index = 0; index < allnext.length; index++) {
        nid.push(curr + allnext[index]);
    }
    for (let index = 0; index < allnext.length; index++) {
        nid.push(curr - allnext[index]);
    }
    nid = refine(nid);
    for (let index = 0; index < nid.length; index++) {
        if (valid(nid[index], curr) || kill(nid[index], curr)) { nextid.push(nid[index]); }
    }
    return nextid
}

function kingmove(current) {
    var curr = parseInt(current);
    var allnext = [1, 10, 11, 9];
    var nid = [];
    var nextid = [];
    for (let index = 0; index < allnext.length; index++) nid.push(curr + allnext[index]);
    for (let index = 0; index < allnext.length; index++) nid.push(curr - allnext[index]);

    nid = refine(nid);

    for (let index = 0; index < nid.length; index++)
        if (valid(nid[index], curr) || kill(nid[index], curr)) nextid.push(nid[index]);

    return nextid
}

function queenmove(current) {
    var curr = parseInt(current);
    var nextid = bishopmove(current);
    var curr = parseInt(current);
    var ya = (parseInt(curr / 10)) * 10;
    var temp = curr + 10;
    while (temp < 89) {
        if (kill(temp, curr)) nextid.push(temp);
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp + 10;
    }
    var temp = curr - 10;
    while (temp > 10) {
        if (kill(temp, curr)) nextid.push(temp);
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp - 10;
    }
    var temp = curr - 1;
    while (temp > ya) {
        if (kill(temp, curr)) nextid.push(temp);
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp - 1;
    }
    var temp = curr + 1;
    while (temp < (ya + 9)) {
        if (kill(temp, curr)) nextid.push(temp);
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
        if (kill(temp, curr)) nextid.push(temp);
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp + 9;
    }

    var temp = curr + 11;
    while ((temp % 10 != 0) && (temp % 10 != 9) && (temp < 89)) {
        if (kill(temp, curr)) nextid.push(temp);
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp + 11;
    }

    var temp = curr - 9;
    while ((10 < temp) && (temp % 10 != 0) && (temp % 10 != 9)) {
        if (kill(temp, curr)) nextid.push(temp);
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp - 9;
    }

    var temp = curr - 11;
    while ((10 < temp) && (temp % 10 != 0) && (temp % 10 != 9)) {
        if (kill(temp, curr)) nextid.push(temp);
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
        if (kill(temp, curr)) nextid.push(temp);
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp + 10;
    }
    var temp = curr - 10;
    while (temp > 10) {
        if (kill(temp, curr)) nextid.push(temp);
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp - 10;
    }
    var temp = curr - 1;
    while (temp > ya) {
        if (kill(temp, curr)) nextid.push(temp);
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp - 1;
    }
    var temp = curr + 1;
    while (temp < (ya + 9)) {
        if (kill(temp, curr)) nextid.push(temp);
        if (valid(temp, curr)) nextid.push(temp);
        else break;
        temp = temp + 1;
    }
    return nextid;
}

function wpawnmove(current) {
    var curr = parseInt(current);
    var nextid = [];
    if (valid(curr + 10, curr)) nextid.push(curr + 10);
    if (parseInt(curr / 10) == 2 && (valid(curr + 20, curr))) nextid.push(curr + 20);
    if ((10 < (curr + 11)) && ((curr + 11) % 10 != 0) && ((curr + 11) % 10 != 9) && ((curr + 11) < 89))
        if (kill((curr + 11), curr)) nextid.push(curr + 11);
    if ((10 < (curr + 9)) && ((curr + 9) % 10 != 0) && ((curr + 9) % 10 != 9) && ((curr + 9) < 89))
        if (kill((curr + 9), curr)) nextid.push(curr + 9);
    return nextid
}


function bpawnmove(current) {
    var curr = parseInt(current);
    var nextid = [];
    if (valid(curr - 10, curr)) nextid.push(curr - 10);
    if (parseInt(curr / 10) == 7 && (valid(curr - 20, curr))) nextid.push(curr - 20);
    if ((10 < (curr - 11)) && ((curr - 11) % 10 != 0) && ((curr - 11) % 10 != 9) && ((curr - 11) < 89))
        if (kill((curr - 11), curr)) nextid.push(curr - 11);
    if ((10 < (curr - 9)) && ((curr - 9) % 10 != 0) && ((curr - 9) % 10 != 9) && ((curr - 9) < 89))
        if (kill((curr - 9), curr)) nextid.push(curr - 9);
    return nextid
}

function wkingcheck() {
    let king = document.querySelector(button[value = "wking"]);
    let kingsplace = king.getAttribute("id");
    let path = queenmove(kingsplace);
    for (let x = 0; x < path.length; x++) {
        let danger = eval("document.getElementById(" + path[x] + ")");
        if (danger.getAttribute("value") == "bqueen") return false;
    }

    path = bishopmove(kingsplace);
    for (let x = 0; x < path.length; x++) {
        let danger = eval("document.getElementById(" + path[x] + ")");
        if (danger.getAttribute("value") == "bbishop") return false;
    }
    path = rookmove(kingsplace);
    for (let x = 0; x < path.length; x++) {
        let danger = eval("document.getElementById(" + path[x] + ")");
        if (danger.getAttribute("value") == "brook") return false;
    }
    path = knightmove(kingsplace);
    for (let x = 0; x < path.length; x++) {
        let danger = eval("document.getElementById(" + path[x] + ")");
        if (danger.getAttribute("value") == "bknight") return false;
    }
    path = [parseInt(kingsplace) - 9, parseInt(kingsplace) - 11];
    for (let x = 0; x < path.length; x++) {
        let danger = eval("document.getElementById(" + path[x] + ")");
        if (danger.getAttribute("value") == "bpawn") return false;
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var step = "white";
var type = "none";
var ID = 0;
var allowedboxes = [];
var moved = false;
var blocks = document.querySelectorAll(".blocks li button");
for (let index = 0; index < blocks.length; index++) {
    blocks[index].addEventListener("click", function() {
        switch (step) {
            case "white":
                {
                    type = this.getAttribute("value");
                    ID = this.getAttribute("id");
                    let allowedmoves = [];
                    allowedboxes = [];
                    if (type === "wpawn") {
                        step = "wmove";
                        allowedmoves = wpawnmove(ID);
                    } else if (type === "wrook") {
                        step = "wmove";
                        allowedmoves = rookmove(ID);
                    } else if (type === "wbishop") {
                        step = "wmove";
                        allowedmoves = bishopmove(ID);
                    } else if (type === "wknight") {
                        step = "wmove";
                        allowedmoves = knightmove(ID);
                    } else if (type === "wking") {
                        step = "wmove";
                        allowedmoves = kingmove(ID);
                    } else if (type === "wkween") {
                        step = "wmove";
                        allowedmoves = queenmove(ID);
                    }
                    for (let index = 0; index < allowedmoves.length; index++) {
                        let box = eval("document.getElementById(" + allowedmoves[index] + ")");
                        allowedboxes.push(box);
                        box.classList.add("highlight");
                    }
                    moved = false;
                }
                break;
            case "wmove":
                {
                    let oID = this.getAttribute("id");
                    for (let index = 0; index < allowedboxes.length; index++) {
                        allowedboxes[index].classList.remove("highlight");
                        let theID = allowedboxes[index].getAttribute("id");
                        if (oID == theID) {
                            this.setAttribute("value", type);
                            let old = eval("document.getElementById(" + ID + ")");
                            old.setAttribute("value", "none");
                            step = "black";
                            moved = true;
                        } else if (!moved) step = "white";
                    }
                }
                break;
            case "black":
                {
                    type = this.getAttribute("value");
                    ID = this.getAttribute("id");
                    allowedmoves = [];
                    allowedboxes = [];
                    if (type === "bpawn") {
                        step = "bmove";
                        allowedmoves = bpawnmove(ID);
                    } else if (type === "brook") {
                        step = "bmove";
                        allowedmoves = rookmove(ID);
                    } else if (type === "bbishop") {
                        step = "bmove";
                        allowedmoves = bishopmove(ID);
                    } else if (type === "bknight") {
                        step = "bmove";
                        allowedmoves = knightmove(ID);
                    } else if (type === "bking") {
                        step = "bmove";
                        allowedmoves = kingmove(ID);
                    } else if (type === "bkween") {
                        step = "bmove";
                        allowedmoves = queenmove(ID);
                    }
                    for (let index = 0; index < allowedmoves.length; index++) {
                        let box = eval("document.getElementById(" + allowedmoves[index] + ")");
                        allowedboxes.push(box);
                        box.classList.add("highlight");
                        moved = false;
                    }
                }
                break;
            case "bmove":
                {
                    let oID = this.getAttribute("id");
                    for (let index = 0; index < allowedboxes.length; index++) {
                        allowedboxes[index].classList.remove("highlight");
                        let theID = allowedboxes[index].getAttribute("id");
                        if (oID == theID) {
                            this.setAttribute("value", type);
                            let old = eval("document.getElementById(" + ID + ")");
                            old.setAttribute("value", "none");
                            step = "white";
                            moved = true;
                        } else if (!moved) step = "black";

                    }
                }
                break;
        }

    })
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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


// var moved = false;
// function play(c) {
//     var firstrow = true;
//     if (c == "white") {}
//     var blocks = document.querySelectorAll(".blocks li button");
//     for (let index = 0; index < blocks.length; index++) {
//         blocks[index].addEventListener("click", function() {
//             let type = this.getAttribute("value");
//             var ID = this.getAttribute("id");
//             let allowedmoves = []
//             if (type === "wpawn") {
//                 allowedmoves = wpawnmove(ID);
//             } else if (type === "bpawn") {
//                 allowedmoves = bpawnmove(ID);
//             } else if (type === "wrook" || type === "brook") {
//                 allowedmoves = rookmove(ID);
//             } else
//             if (type === "wbishop" || type === "bbishop") {
//                 allowedmoves = bishopmove(ID);
//             } else if (type === "wknight" || type === "bknight") {
//                 allowedmoves = knightmove(ID);
//             } else if (type === "wking" || type === "bking") {
//                 allowedmoves = kingmove(ID);
//             } else if (type === "wkween" || type === "bkween") {
//                 allowedmoves = queenmove(ID);
//             }
//             // alert("checkpoint after allowed moves if else blocks");
//             allowedboxes = [];
//             for (let index = 0; index < allowedmoves.length; index++) {
//                 let box = eval("document.getElementById(" + allowedmoves[index] + ")");
//                 allowedboxes.push(box);
//             }
//             /////////////////////////////FAULTY////////////////////////////////////////////
//             // let backbtn = document.querySelector("#back");
//             // backbtn.classList.add("highlight");
//             for (let index = 0; index < allowedboxes.length; index++) {
//                 moved = false;
//                 allowedboxes[index].classList.add("highlight");
//                 allowedboxes[index].addEventListener("click", function() {
//                     if (!moved) {
//                         this.setAttribute("value", type);
//                         let old = eval("document.getElementById(" + ID + ")");
//                         old.setAttribute("value", "none");
//                         moved = true;
//                         index = allowedboxes.length;
//                     }
//                     allowedboxes = [];
//                     ////////////////////FAULTY//////////////////////////////////////////
//                     for (let index = 0; index < allowedboxes.length; index++) {
//                         allowedboxes[index].classList.remove("highlight");
//                     }
//                 });
//             }
//         });
//     }
// }


// if (step == "white") {
//     type = this.getAttribute("value");
//     ID = this.getAttribute("id");
//     let allowedmoves = [];
//     allowedboxes = [];
//     if (type === "wpawn") {
//         step = "move";
//         allowedmoves = wpawnmove(ID);
//     } else if (type === "bpawn") {
//         step = "move";
//         allowedmoves = bpawnmove(ID);
//     } else if (type === "wrook" || type === "brook") {
//         step = "move";
//         allowedmoves = rookmove(ID);
//     } else if (type === "wbishop" || type === "bbishop") {
//         step = "move";
//         allowedmoves = bishopmove(ID);
//     } else if (type === "wknight" || type === "bknight") {
//         step = "move";
//         allowedmoves = knightmove(ID);
//     } else if (type === "wking" || type === "bking") {
//         step = "move";
//         allowedmoves = kingmove(ID);
//     } else if (type === "wkween" || type === "bkween") {
//         step = "move";
//         allowedmoves = queenmove(ID);
//     }
//     for (let index = 0; index < allowedmoves.length; index++) {
//         let box = eval("document.getElementById(" + allowedmoves[index] + ")");
//         allowedboxes.push(box);
//         box.classList.add("highlight");
//     }
// } else if (step == "move") {
//     let oID = this.getAttribute("id");
//     for (let index = 0; index < allowedboxes.length; index++) {
//         allowedboxes[index].classList.remove("highlight");
//         let theID = allowedboxes[index].getAttribute("id");
//         if (oID == theID) {
//             this.setAttribute("value", type);
//             let old = eval("document.getElementById(" + ID + ")");
//             old.setAttribute("value", "none");
//             step = "";
//         }

//     }
// }))