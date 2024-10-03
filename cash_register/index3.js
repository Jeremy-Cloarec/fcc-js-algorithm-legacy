function checkCashRegister(price, cash, cid) {
    //calculate rest
    let rest = cash - price
    console.log("begin rest: " + rest);


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
    response.statut = "OPEN"
    response.change = []
    let usingDevises = []

    let conversionToUse = conversion.reverse().find((ele => ele[1] <= rest))

    function recursiveCid() {

        console.log("conversion to use at begining of the recursive function: " + conversionToUse);
        console.log("rest at begining of the recursive function: " + rest);
        console.log("");

        //out of the recursive function
        if (rest <= 0) {
            console.log("go out of the function");
            return response
        }
        //substract the devise in cid with the devise
        let checkInCid = cid.find(ele => ele[0] === conversionToUse[0])
        console.log("checkInCId at begining of the recursive function: " + checkInCid);

        if (checkInCid[1] - conversionToUse[1] < 0 || rest - conversionToUse[1] < 0) {
            //find the way to pass to the next devise in conversion and in cid
            console.log("not enought");
            console.log("");

            for (let i = 0; i < conversion.length; i++) {

                let cidReverse = [...cid].reverse()
                console.log(rest);
                if (conversion[i][1] <= rest && cidReverse[i][1] != 0) {
                    console.log(cidReverse[i]);
                    console.log("new devise");
                    console.log(conversion[i]);
                    console.log("cidReverse");
                    console.log(cidReverse);
                    console.log("conversion");
                    console.log(conversion);

                    conversionToUse = conversion[i]
                    break
                }
            }
        }


        if (checkInCid[1] - conversionToUse[1] >= 0) {
            console.log("enought in the cid :" + checkInCid[1] + " - " + conversionToUse[1])
            console.log("______________");
            console.log(conversionToUse);
            console.log(checkInCid);
            console.log("______________");
            console.log("");

            console.log(rest);


            checkInCid[1] -= conversionToUse[1]
            checkInCid[1] = Math.round(checkInCid[1] * 100) / 100
            console.log("");

            console.log(`push ${conversionToUse} `);
            usingDevises.push([...conversionToUse])

            console.log("");
            console.log("cid");
            console.log(cid);
            console.log("");

            console.log("conversion to substract to the rest: " + conversionToUse[1]);
            console.log("rest to substract to the conversion: " + rest);
            rest -= conversionToUse[1]
            rest = Math.round(rest * 100) / 100
            console.log("rest just after substract: " + rest);

        }

        //checkInCid = cid.find(ele => ele[0] === conversionToUse[0])
        recursiveCid()

    }

    recursiveCid()
    //reduce
    console.log("reduce");


    

    for (let i = 0; i < usingDevises.length; i++) {
        if (usingDevises[i - 1] && usingDevises[i - 1][0] === usingDevises[i][0]) {
            usingDevises[i][1] += usingDevises[i - 1][1]
            usingDevises[i - 1] = undefined
        } 
    }

    const usingDevisesReduced = usingDevises.filter(ele => ele !== undefined )

    response.change = [...usingDevisesReduced]
    console.log(response);
   
    return response
}

//checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

//{status: "OPEN", change: [["QUARTER", 0.5]]}.

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])

// {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
