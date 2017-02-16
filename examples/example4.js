{
  setTimeout(function X() {
    console.log('setTimeout function')
  }, 1000);
  setTimeout(() => {
    console.log('setTimeout arrow function')
  }, 1000);
  setTimeout('console.log("setTimeout string")', 1000);
  let f1 = () => { console.log('setTimeout f1') };
  setTimeout(f1, 1000);
  setInterval(function X() {
    console.log('setInterval function')
  }, 1000);
  setInterval(() => {
    console.log('setInterval arrow function')
  }, 1000);
  setInterval('console.log("setInterval string")', 1000);
  let f2 = () => { console.log('setInterval f2') };
  setInterval(f2, 1000);
}
