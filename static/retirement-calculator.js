window.onload = function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', calcBalance);
}

function calcBalance(event){
    event.preventDefault();

    let curAge = document.getElementById("age").value;
    let retAge = document.getElementById("retAge").value;
    let curBal = document.getElementById("balance").value;
    let contribution = document.getElementById("401kCont").value;
    let empMatch = document.getElementById("empMatch").value;
    let rateOfRtn = document.getElementById("rateOfReturn").value;
    let numCompounds = document.getElementById("compounds").value;

    //This only represents compound interest on principal at this point
    let futureBalance = getFutureBalance(curBal, rateOfRtn, numCompounds, retAge, curAge)
    let futureBalText = getFutureBalText(curAge, futureBalance);

    addFutureBalanceToDOM(futureBalText);
}

function getFutureBalance(curBal, rateOfRtn, numCompounds, retAge, curAge) {
    return curBal * (1 + rateOfRtn / numCompounds) ^ (numCompounds * (retAge - curAge));
}

function getFutureBalText(curAge, futureBalance) {
    return "Your total 401k balance at age "
        .concat(curAge).concat(" will be: $").concat(futureBalance.toLocaleString());
}

function addFutureBalanceToDOM(futureBalText) {
    let futureBalDiv = document.createElement("div");
    futureBalDiv.setAttribute("id", "futureBalText");

    let textNode = document.createTextNode(futureBalText);
    futureBalDiv.appendChild(textNode);

    document.querySelector('body').appendChild(futureBalDiv);
}