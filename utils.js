function getAge(birthYear, month) {
    return ((new Date().getTime()-new Date(birthYear+"-"+month+"-01").getTime())/(1000*60*60*24*365.25))|0
}