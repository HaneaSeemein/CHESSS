function refine(rids) {
    let solid = []
    for (let x = 0; x < rids.length; x++) {
        if ((10 < rids[x]) && (rids[x] % 10 != 0) && (rids[x] % 10 != 9) && (rids[x] < 89)) {
            solid.push(rids[x]);
        }
    }
    return solid
}

function kill(id, colorcurr) {
    let limit = eval("document.getElementById(" + id + ")");
    // let current = eval("document.getElementById(" + curr + ")");
    limitcolor = limit.getAttribute("value");
    // currentcolor = current.getAttribute("value");
    colordest = limitcolor.charAt(0);
    // colorcurr = currentcolor.charAt(0);
    if (colordest == 'n') return false;
    else if (colordest != colorcurr) {
        if (limitcolor == "wking" || limitcolor == "bking") { alert("check") }
        return true;
    } else return false;
}

function valid(id, colorcurr) {
    let limit = eval("document.getElementById(" + id + ")");
    // let current = eval("document.getElementById(" + curr + ")");
    limitcolor = limit.getAttribute("value");
    // currentcolor = current.getAttribute("value");
    colordest = limitcolor.charAt(0);
    // colorcurr = currentcolor.charAt(0);
    if (colordest == "n") return true;
    else if (colordest == colorcurr) return false;
}

function knightmove(curr,color) {
    var allnext = [12, 8, 21, 19, -12, -8, -21, -19];
    var nid = [];
    var nextid = [];
    for (let index = 0; index < allnext.length; index++) nid.push(curr + allnext[index]);
    nid = refine(nid);
    for (let index = 0; index < nid.length; index++) if (valid(nid[index], color) || kill(nid[index], color)) nextid.push(nid[index]);
    // nextid = kingscheck(nextid, color);
    return nextid
}

function kingmove(curr,color) {
    var allnext = [1, 10, 11, 9, -1, -10, -11, -9];
    var nid = [];
    var nextid = [];
    for (let index = 0; index < allnext.length; index++) nid.push(curr + allnext[index]);
    nid = refine(nid);
    for (let index = 0; index < nid.length; index++) if (valid(nid[index], color) || kill(nid[index], color)) nextid.push(nid[index]);
    // nextid = kingscheck(nextid, color);
    return nextid
}

function queenmove(curr,color) {
    var cross = bishopmove(curr,color);
    var straight = rookmove(curr,color);
    alert(straight);
    nextid = cross.concat(straight);
    // nextid = kingscheck(nextid, color);
    return nextid;
}

function bishopmove(curr,color) {
    var nextid = [];
    var temparr = [9,11,-9,-11];
    for (let x = 0; x < temparr.length; x++) {
        var temp = curr+temparr[x];
        while ((10 < temp) && (temp % 10 != 0) && (temp % 10 != 9) && (temp < 89)) {
            if (kill(temp, color)) nextid.push(temp);
            if (valid(temp, color)) nextid.push(temp);
            else break;
            temp = temp + temparr[x];
        }     
    }
    // nextid = kingscheck(nextid, color);
    return nextid
}

function rookmove(curr,color) {
    var nextid = [];
    var temparr = [10,1,-10,-1];
    for (let x = 0; x < temparr.length; x++) {
        var temp = curr+temparr[x];
        while ((10 < temp) && (temp % 10 != 0) && (temp % 10 != 9) && (temp < 89)) {
            if (kill(temp, color)) nextid.push(temp);
            if (valid(temp, color)) nextid.push(temp);
            else break;
            temp = temp + temparr[x];
        }     
    }
    // nextid = kingscheck(nextid, color);
    return nextid;
}

function wpawnmove(curr) {
    // var curr = parseInt(current);
    var nextid = [];
    if (valid(curr + 10, curr)) nextid.push(curr + 10);
    if (parseInt(curr / 10) == 2 && (valid(curr + 20, curr))) nextid.push(curr + 20);
    if ((10 < (curr + 11)) && ((curr + 11) % 10 != 0) && ((curr + 11) % 10 != 9) && ((curr + 11) < 89))
        if (kill((curr + 11), curr)) nextid.push(curr + 11);
    if ((10 < (curr + 9)) && ((curr + 9) % 10 != 0) && ((curr + 9) % 10 != 9) && ((curr + 9) < 89))
        if (kill((curr + 9), curr)) nextid.push(curr + 9);
    return nextid
}

function bpawnmove(curr) {
    // var curr = parseInt(current);
    var nextid = [];
    if (valid(curr - 10, curr)) nextid.push(curr - 10);
    if (parseInt(curr / 10) == 7 && (valid(curr - 20, curr))) nextid.push(curr - 20);
    if ((10 < (curr - 11)) && ((curr - 11) % 10 != 0) && ((curr - 11) % 10 != 9) && ((curr - 11) < 89))
        if (kill((curr - 11), curr)) nextid.push(curr - 11);
    if ((10 < (curr - 9)) && ((curr - 9) % 10 != 0) && ((curr - 9) % 10 != 9) && ((curr - 9) < 89))
        if (kill((curr - 9), curr)) nextid.push(curr - 9);
    return nextid
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var step = "white";
var type = "none";
var ID = 0;
var allowedboxes = [];
var moved = false;
var blocks = document.querySelectorAll(".blocks li button");
// var path = [1,2,3,4,5,6,7,8,9,10];
// var danger = [];
// danger.push(path.slice(0, 3))
// alert(danger);
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
                        allowedmoves = wpawnmove(parseInt(ID));
                    } else if (type === "wrook") {
                        step = "wmove";
                        allowedmoves = rookmove(parseInt(ID),"w");
                    } else if (type === "wbishop") {
                        step = "wmove";
                        allowedmoves = bishopmove(parseInt(ID),"w");
                    } else if (type === "wknight") {
                        step = "wmove";
                        allowedmoves = knightmove(parseInt(ID),"w");
                    } else if (type === "wking") {
                        step = "wmove";
                        allowedmoves = kingmove(parseInt(ID),"w");
                    } else if (type === "wkween") {
                        step = "wmove";
                        allowedmoves = queenmove(parseInt(ID),"w");
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
                        allowedmoves = bpawnmove(parseInt(ID));
                    } else if (type === "brook") {
                        step = "bmove";
                        allowedmoves = rookmove(parseInt(ID),"b");
                    } else if (type === "bbishop") {
                        step = "bmove";
                        allowedmoves = bishopmove(parseInt(ID),"b");
                    } else if (type === "bknight") {
                        step = "bmove";
                        allowedmoves = knightmove(parseInt(ID),"b");
                    } else if (type === "bking") {
                        step = "bmove";
                        allowedmoves = kingmove(parseInt(ID),"b");
                    } else if (type === "bkween") {
                        step = "bmove";
                        allowedmoves = queenmove(parseInt(ID),"b");
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