const users = require('./users')
const { getCurrentYear } = require('./date')
const currentMonth = require('./date').getCurrentMonth()

const {admins} = users
const currentYear = getCurrentYear()



console.log('Hello World with Nodemon', admins, {
    currentYear,
  currentMonth
})