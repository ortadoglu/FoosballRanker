const Probability = (rating1, rating2) => {
    return 1.0 / (1 + 1.0 * (Math.pow(10, 1.0 * (rating1 - rating2) / 400)));
}

const EloRating = (Ra, Rb, K, winner) =>
{
    let Pa = Probability(Rb, Ra);
    console.log(Pa);
    let Pb = Probability(Ra, Rb);
    console.log(Pb);
    let change = 0;

    if (winner === true) {
        Ra = Ra + K * (1 - Pa);
        Rb = Rb + K * (0 - Pb);
        change = K * (1 - Pa);
        // console.log( K * (1 - Pa));
        //console.log( K * (0 - Pb));
    }

    else {
        Ra = Ra + K * (0 - Pa);
        Rb = Rb + K * (1 - Pb);
        change =  K * (1 - Pb);
        // console.log( K * (0 - Pa));
        // console.log( K * (1 - Pb));        
    }

    console.log("Updated Ratings:-\n");

    console.log("Ra = " + (Math.round(Ra
        * 1000000.0) / 1000000.0)
        + " Rb = " + Math.round(Rb
            * 1000000.0) / 1000000.0);
    return change;
}

export default EloRating;