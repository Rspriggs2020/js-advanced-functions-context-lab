/* Your Code Here */
let createEmployeeRecord = function(src) {
    return {
        firstName: src[0],
        familyName: src[1],
        title: src[2],
        payPerHour: src[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

let createEmployeeRecords = function(srcdata) {
    return srcdata.map(function(src){
        return createEmployeeRecord(src)
    })
}

let createTimeInEvent = function(time) {
    let [date, hour] = time.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let createTimeOutEvent = function(time) {
    let [date, hour] = time.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let hoursWorkedOnDate = function(time) {
    let timeIn = this.timeInEvents.find(function(e){
        return e.date === time
    })
    let timeOut = this.timeOutEvents.find(function(e){
        return e.date === time
    })
    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(date) {
    let wage = hoursWorkedOnDate.call(this, date)
        * this.payPerHour
    return parseFloat(wage.toString())
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(person, firstName) {
    return person.find(function(record){
        return record.firstName === firstName
    })
}

let calculatePayroll = function(array) {
    return array.reduce(function(memo, record){
        return memo + allWagesFor.call(record)
    }, 0)
}