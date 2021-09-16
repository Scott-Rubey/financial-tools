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
    let futureBalance = getFutureValue(curBal, rateOfRtn, numCompounds, retAge, curAge, contribution)
    let futureBalText = getFutureBalText(retAge, futureBalance);

    addFutureBalanceToDOM(futureBalText);
}

//According to formula for future value of periodic payments when payments are due at end of month
//https://keisan.casio.com/exec/system/1234231998
function getFutureValue(curBal, rateOfRtn, numCompounds, retAge, curAge, contribution) {
    let presValPlusInterest = getPresValPlusInt(curBal, rateOfRtn, numCompounds, retAge, curAge);
    let periodicPmtsPlusInterest = getPerPmtsPlusInt(contribution, rateOfRtn, retAge, curAge);

    return presValPlusInterest + periodicPmtsPlusInterest;
}

function getFutureBalText(retAge, futureBalance) {
    return "Your total 401k balance at age "
        .concat(retAge).concat(" will be: $").concat(futureBalance.toLocaleString());
}

function getPresValPlusInt(curBal, rateOfRtn, numCompounds, retAge, curAge){
    let intRate = rateOfRtn / 100;

    return curBal * (Math.pow((1 + intRate / numCompounds), (numCompounds * getNumYrs(retAge, curAge))));
}

function getPerPmtsPlusInt(contribution, rateOfReturn, retAge, curAge){
    let intRate = rateOfReturn / 100;

    console.log(contribution);
    console.log((Math.pow((1 + intRate / 12), (getNumYrs(retAge, curAge) * 12)) - 1));
    console.log(intRate / 12);

    return contribution * ((Math.pow((1 + intRate / 12), (getNumYrs(retAge, curAge) * 12)) - 1) / (intRate / 12));
}

function getNumYrs(retAge, curAge){
    return retAge - curAge;
}

function addFutureBalanceToDOM(futureBalText) {
    let futureBalDiv = document.createElement("div");
    futureBalDiv.setAttribute("id", "futureBalText");

    let textNode = document.createTextNode(futureBalText);
    futureBalDiv.appendChild(textNode);

    document.querySelector('body').appendChild(futureBalDiv);
}

//TODO: add employer match to future-value calculation