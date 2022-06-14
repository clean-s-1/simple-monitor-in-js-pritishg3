const {expect} = require('chai');

isTemperatureOutOfRange = function(temperature) {    
    let isOutOfRange = false;
    if (temperature > 45 || temperature < 0) {
        console.log('Temperature is out of range!');
        isOutOfRange = true;
    }
    return isOutOfRange;
}

isSocOutOfRange = function(soc) {
    let isOutOfRange = false;
    if (soc > 80 || soc < 20) {
        console.log('State of Charge is out of range!');
        isOutOfRange = true;
    }
    return isOutOfRange;
}

isChargeRateOutOfRange = function(charge_rate) { 
    let isOutOfRange = false;
    if (charge_rate > 0.8) {
        console.log('Charge rate is out of range!');
        isOutOfRange = true;
    }
    return isOutOfRange;
}

function batteryIsOk(temperature, soc, charge_rate) {
    if (isTemperatureOutOfRange(temperature) || isSocOutOfRange(soc) || isChargeRateOutOfRange(charge_rate)) {        
        return false;
    } 
    return true;
}

expect(batteryIsOk(25, 70, 0.7)).to.be.true;
expect(batteryIsOk(30, 85, 0)).to.be.false;
expect(batteryIsOk(30, 70, 0.9)).to.be.false;
expect(batteryIsOk(50, 70, 0.9)).to.be.false;