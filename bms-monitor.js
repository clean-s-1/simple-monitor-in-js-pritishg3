const {expect} = require('chai');

isOutOfRange = function(value, min=null, max=null) { 
  return value < min || value > max;
}                            

isTemperatureOutOfRange = function(temperature) {    
    let isOutOfrange = false;
    if (isOutOfRange(temperature, 0, 45)) {
        console.log('Temperature is out of range!');
        isOutOfrange = true;
    }
    return isOutOfrange;
}

isSocOutOfRange = function(soc) {
    let isOutOfrange = false;
    if (isOutOfRange(soc, 20, 80)) {
        console.log('State of Charge is out of range!');
        isOutOfrange = true;
    }
    return isOutOfrange;
}

isChargeRateOutOfRange = function(charge_rate) { 
    let isOutOfrange = false;
    if (isOutOfRange(charge_rate, null, 0.8)) {
        console.log('Charge rate is out of range!');
        isOutOfrange = true;
    }
    return isOutOfrange;
}

function batteryIsOk(temperature, soc, charge_rate) {
   return !(isTemperatureOutOfRange(temperature) || isSocOutOfRange(soc) || isChargeRateOutOfRange(charge_rate))       
}

expect(batteryIsOk(25, 70, 0.7)).to.be.true;
expect(batteryIsOk(30, 85, 0)).to.be.false;
expect(batteryIsOk(30, 70, 0.9)).to.be.false;
expect(batteryIsOk(50, 70, 0.9)).to.be.false;
expect(batteryIsOk(50, 85, 0.9)).to.be.false;