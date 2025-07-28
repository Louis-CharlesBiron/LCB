function getAge(birthYear) {
    return new Date().getFullYear()-birthYear
}

function getInputRegulationCB(callback, msDelay) {
    let timeout
    return (...params)=>{
        clearTimeout(timeout)
        timeout = setTimeout(()=>callback(...params), msDelay)
    }
}