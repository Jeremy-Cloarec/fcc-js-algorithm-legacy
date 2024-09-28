function checkCashRegister(price, cash, cid) {
    //calculate rest
    let rest = cash - price
    //object with conversion
    const conversion = {
        "HUNDRED": 100,
        "TWENTY": 20,
        "TEN": 10,
        "FIVE": 5,
        "ONE": 1,
        "QUARTER": 0.25,
        "DIME": 0.1,
        "NICKEL": 0.05,
        "PENNY": 0.01,
    }

    //recursive function to gave cash
    function recursiveCash(restParam) {
        if (restParam <= 0) {
            return
        } else {

            chooseMoney(restParam)

            //check conversation object to see what devise is ok
            //check the array to see if the devise in cash is enought for the rest sum
            //if it is not, go to the next device, etc

            //check the amount of these devise in the cid
            function checkInCid(devise) {
                for (const c of cid) {
                    if (c[0] === devise) {
                        return c[1]
                    }
                }
            }

            //substract amount for cash
            function substractCID(cash, amount) {
                if (cash > amount) {
                    return cash - amount
                } else {
                    console.log("not enought");
                }
            }

            //update cid with the new value
            function updatedCid(arrayCID, devise, newValue) {
                for (const c of arrayCID) {
                    if (c[0] === devise) {
                        console.log("devise to change: " + c[1]);
                        c[1] = newValue
                    }
                }
            }

            console.log(rest)
            recursiveCash(rest)
        }
    }
    recursiveCash(rest)
    return;
}

checkCashRegister(19.5, 60, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);