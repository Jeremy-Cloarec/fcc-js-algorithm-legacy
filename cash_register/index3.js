function checkCashRegister(price, cash, cid) {
    //calculate rest
    let rest = cash - price
    console.log("begin rest: " + rest);

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

    if (rest === 0) {
        return response
    } else {
        const conversionToUse = conversion.reverse().find((ele => ele[1] <= rest))

        response.change = [...[conversionToUse[0]]]
        let checkInCid = cid.find(ele => ele[0] === conversionToUse[0])

        rest -= conversionToUse[1]
        checkInCid[1] -= conversionToUse[1]

        response.change.push(conversionToUse[1])  

        response.change[1] += conversionToUse[1]   

        if(response.change[1]){
            console.log(true);
        } else {
            console.log(false);
        }

        console.log(checkInCid);
        console.log(conversionToUse)
        console.log(checkInCid)
        console.log(rest);

    }
    console.log(response);
    return response



}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

//{status: "OPEN", change: [["QUARTER", 0.5]]}.