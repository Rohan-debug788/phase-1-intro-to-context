// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    });
    return employee;
  }

  function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, targetDate) {
    const timeIn = employee.timeInEvents.find(event => event.date === targetDate);
    const timeOut = employee.timeOutEvents.find(event => event.date === targetDate);
    return (timeOut.hour - timeIn.hour) / 100;
  }
 
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, timeIn) => {
      return total + wagesEarnedOnDate(employee, timeIn.date);
    }, 0);
  }
  

  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
  }
  
  const employees = [
    ["Rohan", "Kibet", "Developer", 50],
    ["Alice", "Johnson", "Designer", 40]
  ];
  
 
  const employeeRecords = createEmployeeRecords(employees);
  
  createTimeInEvent(employeeRecords[0], "2024-10-12 0900");
  createTimeOutEvent(employeeRecords[0], "2024-10-12 1700");
  
  createTimeInEvent(employeeRecords[1], "2024-10-12 1000");
  createTimeOutEvent(employeeRecords[1], "2024-10-12 1800");
  
  const totalPayroll = calculatePayroll(employeeRecords);
  console.log("Total Payroll: $", totalPayroll);
  