import {sum, pi} from "./calc"
class Greeter {
  constructor(msg) {
    this.message = msg;
  }

  getGreeting() {
    return this.message;
  }

  getValue() {
    return sum(3,4);
  }
}

window.addEventListener('load',() => {
  var cls = new Greeter('Hello World');
  document.getElementById('content').innerHTML = cls.getValue();
}, false);
