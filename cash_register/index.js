function checkCashRegister(price, cash, cid) {
    //calculate rest
    let rest = cash - price
    //object with conversion
    const conversion = {
        "HUNDRED": 100,
        "TWENTY": 20,
        "TEN": 10,
        "FIVE": 5,
        "DOLLAR": 1,
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

            // check minimum device to give
            function chooseMoney(restParam) {
                let devise = ""
                let deviseNumber = 0
                for (const conv in conversion) {
                    if (restParam >= conversion[conv]) {
                        console.log(conv, conversion[conv])
                        devise = conv
                        deviseNumber = conversion[conv]
                        break;
                    }
                }
                const amountDevise = checkInCid(devise)
                const restAmountDevise = substractCID(amountDevise, restParam)

                console.log(amountDevise)
                console.log(restAmountDevise)
                console.log(deviseNumber);
                rest -= deviseNumber
            }

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
                return cash - amount
            }

            console.log(rest)
            recursiveCash(rest)
        }
    }
    recursiveCash(rest)
    return;
}

checkCashRegister(19.5, 63, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);