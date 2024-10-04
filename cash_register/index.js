function checkCashRegister(price, cash, cid) {
    //calculate rest
    let rest = cash - price
    //array with conversion
    const conversion = [
        ["PENNY", 0.01],
        ["NICKEL", 0.05],
        ["DIME", 0.1],
        ["QUARTER", 0.25],
        ["ONE", 1],
        ["FIVE", 5],
        ["TEN", 10],
        ["TWENTY", 20],
        ["ONE HUNDRED", 100],
    ]

    const response = {}
    response.status = "OPEN"
    response.change = []


    let usingDevises = []
    let conversionToUse = conversion.reverse().find((ele => ele[1] <= rest))

    function recursiveCid() {
        //out of the recursive functio
        if (rest <= 0) {
            console.log("go out of the function");
            return response
        }

        //substract the devise in cid with the devise
        let checkInCid = cid.find(ele => ele[0] === conversionToUse[0])

        if (checkInCid[1] - conversionToUse[1] < 0 || rest - conversionToUse[1] < 0) {
            for (let i = 0; i < conversion.length; i++) {

                let cidReverse = [...cid].reverse()
                if (conversion[i][1] <= rest && cidReverse[i][1] != 0) {
                    conversionToUse = conversion[i]
                    break
                }

                if(conversionToUse[0] === "PENNY" && checkInCid[1] === 0 && rest >= 0 ) {
                    console.log("last devise");
                    response.status = "INSUFFICIENT_FUNDS"
                    return response
                }
            }
        }

        if (checkInCid[1] - conversionToUse[1] >= 0) {

            checkInCid[1] -= conversionToUse[1]
            checkInCid[1] = Math.round(checkInCid[1] * 100) / 100
            usingDevises.push([...conversionToUse])
            rest -= conversionToUse[1]
            rest = Math.round(rest * 100) / 100
        }

        recursiveCid()
    }

    recursiveCid()

    for (let i = 0; i < usingDevises.length; i++) {
        if (usingDevises[i - 1] && usingDevises[i - 1][0] === usingDevises[i][0]) {
            usingDevises[i][1] += usingDevises[i - 1][1]
            usingDevises[i - 1] = undefined
        }
    }

    let usingDevisesReduced = usingDevises.filter(ele => ele !== undefined)
    usingDevisesReduced = usingDevisesReduced.map(ele => {
        Math.round(ele[1] * 100) / 100
        return ele
    })

    response.change = [...usingDevisesReduced]

    if (response.status === "INSUFFICIENT_FUNDS") {
        response.change = []
    } 
    
    if (cid.every(ele => ele[1] === 0) && rest === 0) {        
        cid.map(ele => {
            if(ele[0] === response.change[0][0] ){
                ele[1] = Math.round(response.change[0][1] * 100) / 100  
            }
        })

        response.status = "CLOSED"
        response.change = [...cid]
        return response
    } 

    return response
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))

//{status: "OPEN", change: [["QUARTER", 0.5]]}.

//console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))

//{status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.

//console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))
//{status: "INSUFFICIENT_FUNDS", change: []}.

//console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))
//{status: "INSUFFICIENT_FUNDS", change: []}.

//console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))
//{status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}