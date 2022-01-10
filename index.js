function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    const timeOutEvents = []
    const timeInEvents = []
    const employeeObject = {firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents}
    return employeeObject 
}

function createEmployeeRecords(employees){
const employeeRecords = employees.map(createEmployeeRecord)
    return employeeRecords
}

function createTimeInEvent(employee, datestamp){
    const timeInEvent = {type: "TimeIn", date: datestamp.split(" ")[0], hour: parseInt(datestamp.split(" ")[1])}
    employee.timeInEvents.push(timeInEvent)
    return employee
}

function createTimeOutEvent(employee, datestamp){
    const timeOutEvent = {type: "TimeOut", date: datestamp.split(" ")[0], hour: parseInt(datestamp.split(" ")[1])}
    employee.timeOutEvents.push(timeOutEvent)
    return employee
}

function hoursWorkedOnDate (record, date) {
    const timeIn = record.timeInEvents.find(event => event.date === date)
    const timeOut = record.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(record, date){
    return (record.payPerHour * hoursWorkedOnDate(record, date)) 
}
function allWagesFor(record){
    const dates = record.timeOutEvents.map(event => event.date)
    return dates.reduce((total, date) => total + wagesEarnedOnDate (record, date), 0)
}

function calculatePayroll(array){
    const reducer = (total, employeeRecord) => total + allWagesFor(employeeRecord)
    return array.reduce(reducer, 0)
}