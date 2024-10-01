function checkCashRegister(price, cash, cid) {
    //calculate rest
    let rest = cash - price
    console.log("begin rest: " + rest);
    let stop = 0

    //object with conversion
    const conversion = [
        ["PENNY", 0.01],
        ["NICKEL", 0.05],
        ["DIME", 0.1],
        ["QUARTER", 0.25],
        ["ONE", 1],
        ["FIVE", 5],
        ["TEN", 10],
        ["TWENTY", 20],
        ["HUNDRED", 100],
    ]

    const response = {}
    response.statut = "OPEN"
    response.change = []

    let conversionToUse = conversion.reverse().find((ele => ele[1] <= rest))
    let checkInCid = cid.find(ele => ele[0] === conversionToUse[0])

    function recursiveCid() {
        if (rest === 0) {
            return response
        } else {

            if (rest - conversionToUse[1] >= 0) {
                rest -= conversionToUse[1]
            }

            if (checkInCid[1] - conversionToUse[1] >= 0) {
                checkInCid[1] -= conversionToUse[1]
            } else {
                //find the way to pass to the next devise
                console.log("not enought");

                for (let i = 0; i < conversion.length; i++) {
                    if(conversion[i][0] === checkInCid[0] ){
                        console.log("new boucle");
                        conversionToUse = conversion[i + 1]
                    }
                    console.log(conversionToUse);
                }
            }

            if (!response.change[1]) {
                response.change = [...[conversionToUse[0]]]
                response.change.push(conversionToUse[1])
                console.log(true);
            } else {
                response.change[1] += conversionToUse[1]
                console.log(false);
            }

            console.log(conversionToUse)
            console.log(checkInCid)
            console.log(rest);

            stop++

            if (stop === 15) {
                return
            }


            recursiveCid()
        }
    }
    recursiveCid()

    console.log(response);
    return response
}

// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

//{status: "OPEN", change: [["QUARTER", 0.5]]}.

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])

// {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
