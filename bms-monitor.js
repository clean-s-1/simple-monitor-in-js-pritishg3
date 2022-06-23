const {expect} = require('chai');

const localization = {
    'de' : {
        'LOW_SOC_WARNING_Message' : 'Ladezustand nähert sich niedrig!',
        'HIGH_SOC_WARNING_Message' : 'State of Charge nähert sich hoch!',
        'LOW_TEMPERATURE_WARNING_Message' : 'Die Temperatur nähert sich dem Tiefpunkt',
        'HIGH_TEMPERATURE_WARNING_Message' : 'Die Temperatur nähert sich dem Hoch',   
        'LOW_CHARGE_RATE_WARNING_Message' : 'Laderate nähert sich niedrig!',
        'HIGH_CHARGE_RATE_WARNING_Message' : 'Laderate nähert sich hoch!',
        'Temperature_Out_Of_Range' : 'Temperatur außerhalb des zulässigen Bereichs!',
        'State_Of_Charge_Out_Of_Range' : 'Ladezustand außerhalb des Bereichs!',
        'Charge_Rate_Out_Of_Range' : 'Der Ladestrom liegt außerhalb des zulässigen Bereichs!'
    },
    'en' : {
        'LOW_SOC_WARNING_Message' : 'State of Charge is approaching low!',
        'HIGH_SOC_WARNING_Message' : 'State of Charge is approaching high!',
        'LOW_TEMPERATURE_WARNING_Message' : 'Temperature is approaching low!',
        'HIGH_TEMPERATURE_WARNING_Message' : 'Temperature is approaching high!',
        'LOW_CHARGE_RATE_WARNING_Message' : 'Charge rate is approaching low!',
        'HIGH_CHARGE_RATE_WARNING_Message' : 'Charge rate is approaching high!',
        'Temperature_Out_Of_Range' : 'Temperature is out of range!',
        'State_Of_Charge_Out_Of_Range' : 'State of Charge is out of range!',
        'Charge_Rate_Out_Of_Range' : 'Charge rate is out of range!'
    }
}

const locale = 'de';

isOutOfRange = function(value, min=null, max=null) { 
  return value < min || value > max;
}

fillSocWarning = (limits,compValue, boundaryVal, tolerance =0) => {
    if (compValue >= boundaryVal+1 && compValue<= boundaryVal+ tolerance)  
       limits[compValue] = 'LOW_WARNING'    
}

fillSocHighWarning = (limits,compValue, boundaryVal, tolerance =0) => {
    if (compValue >= (boundaryVal - tolerance) && compValue<= boundaryVal) 
       limits[compValue] = 'HIGH_WARNING'       
}


getSocLimitsData = (min=null, max, maxIterLimit=100, increment=1) => {
    let tolerance = 0.05 * max;
    let limits = {};
    for(let i=0; i<=maxIterLimit; i=i+increment)  {        
        fillSocWarning(limits, i, min, tolerance);
        fillSocHighWarning(limits, i, max, tolerance);
    }
    return limits;
}


isTemperatureOutOfRange = function(temperature, limits={}, isWarningEnabled=false)  {    
    let isOutOfrange = false;
    if (isOutOfRange(temperature, 0, 45)) {
        console.log(localization[locale].Temperature_Out_Of_Range);
        isOutOfrange = true;
    }
    printWarning(temperature, limits, localization[locale].LOW_TEMPERATURE_WARNING_Message, localization[locale].HIGH_TEMPERATURE_WARNING_Message);
    return isOutOfrange;
}

isSocOutOfRange = function(soc, limits={}, isWarningEnabled=false) {
    let isOutOfrange = false;

    if (isOutOfRange(soc, 20, 80)) {
        console.log(localization[locale].State_Of_Charge_Out_Of_Range);
        isOutOfrange = true;
    }
    printWarning(soc, limits, localization[locale].LOW_SOC_WARNING_Message, localization[locale].HIGH_SOC_WARNING_Message);
    return isOutOfrange;
}

isChargeRateOutOfRange = function(charge_rate, limits={}, isWarningEnabled=false) { 
    let isOutOfrange = false;
    if (isOutOfRange(charge_rate, null, 0.8)) {
        console.log(localization[locale].Charge_Rate_Out_Of_Range);
        isOutOfrange = true;
    }

    printWarning(charge_rate, limits, localization[locale].LOW_CHARGE_RATE_WARNING_Message, localization[locale].HIGH_CHARGE_RATE_WARNING_Message);
    return isOutOfrange;
}

getWarningLevel = function(parameter, limits) {
    return limits[parameter];
}

printWarning = (parameter, limits, warningLow, warningHigh) => {
   if (getWarningLevel(parameter, limits) === 'LOW_WARNING') { 
    console.log('Warning:',warningLow) 
   }
   else if (getWarningLevel(parameter, limits) === 'HIGH_WARNING') { 
    console.log('Warning:',warningHigh)
   }
}

function batteryIsOk(temperature, soc, charge_rate, enableWarningParam='') {
    let tempLimits = getSocLimitsData(0, 45);
    let socLimits = getSocLimitsData(20, 80);
    let chargeRateLimits = getSocLimitsData(0, 0.8, 1, 0.01);
    return !(isTemperatureOutOfRange(temperature, tempLimits) || isSocOutOfRange(soc, socLimits) || isChargeRateOutOfRange(charge_rate, chargeRateLimits));      
}


expect(batteryIsOk(1, 78, 0.7900000000000005)).to.be.true;