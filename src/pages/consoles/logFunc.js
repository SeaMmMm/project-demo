/* eslint-disable no-console */
const logFunc = () => {
  console.log('The answer is:', 42)
  console.debug('Debug information')
  console.info('This is an informational message.')
  console.warn('Warning: This operation is deprecated.')
  console.error('An error occurred while processing the data.')
  console.assert(1 === 2, '1 should be equal to 2.')

  console.count('counter')
  console.count('counter')
  console.count('counter')

  console.group('Group')
  console.log('Name: John Doe')
  console.log('Age: 30')
  console.groupEnd()

  console.time('Timer')
  console.timeLog('Timer', 'Checkpoint 1')
  console.timeLog('Timer', 'Checkpoint 2')
  console.timeEnd('Timer')

  const users = [
    { name: 'John Doe', age: 30 },
    { name: 'Jane Smith', age: 25 },
  ]
  console.table(users)

  const person = { name: 'John Doe', age: 30 }
  console.dir(person)
  console.dirxml(document)

  console.groupCollapsed('Collapsed Group')
  console.log('This group is collapsed by default.')
  console.groupEnd()

  console.memory

  console.log('%c Oh my heavens! ', 'background: #222; color: #bada55', 'more text')
  console.log(
    '%c JavaScript!!',
    'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)'
  )
}
export default logFunc
