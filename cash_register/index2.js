function checkCashRegister(price, cash, cid) {
    //calculate rest
    let rest = cash - price
    console.log("begin rest" + rest);
    let index = 0
    //object with conversion
    const conversion = [
        ["HUNDRED", 100],
        ["TWENTY", 20],
        ["TEN", 10],
        ["FIVE", 5],
        ["ONE", 1],
        ["QUARTER", 0.25],
        ["DIME", 0.1],
        ["NICKEL", 0.05],
        ["PENNY", 0.01],
    ]



    recursiveCash(rest)

    //recursive function to gave cash
    function recursiveCash(restParam) {
        if (restParam <= 0) {
            return console.log("end")
        } else {


            //check conversion array to see what devise is ok
            let ind = 0
            for (let i = 0; i < conversion.length; i++) {
                console.log(conversion[i][1]);
                if (restParam >= conversion[i][1]) {
                    let ind = i
                    let deviseToChange = conversion[ind]

                    //check the array to see the amount of devise in cash 
                    const checkInCid = cid
                        .filter(ele => ele[0] === deviseToChange[0])
                        .flatMap(ele => ele)

                    console.log("deviseToChange: " + deviseToChange);
                    console.log("checkInCid: " + checkInCid);

                    if (checkInCid[1] >= deviseToChange[1]) {
                        console.log("you can substract");
                        const newValue = substractCID(checkInCid[1], deviseToChange[1])
                        updatedCid(cid, deviseToChange[0], newValue)
                        console.log(cid);
                        console.log("devise to substract: " + deviseToChange[1]);

                        if (restParam -= deviseToChange[1] >= 0) {

                            restParam -= deviseToChange[1]
                            console.log("new rest after substract" + restParam);
                            recursiveCash(restParam, ind)

                        } else {
                            console.log("restPARAM < 0");
                        }

                    } else {
                        console.log("you can't substract");
                        console.log(ind);
                        return
                        // recursiveCash(restParam, ind + 1)
                    }

                    break
                }
            }







        }
        console.log("restParam: " + restParam);
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
                c[1] = newValue
            }
        }
    }
    return;
}

checkCashRegister(19.5, 22, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);