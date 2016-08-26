var ARROW_ARG = /^([^\(]+?)=>/;
var FN_ARGS = /^[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

function stringifyFn(fn) {
  return Function.prototype.toString.call(fn) + ' ';
}

function extractArgs(fn) {
  var fnText = stringifyFn(fn).replace(STRIP_COMMENTS, ''),
      args = fnText.match(ARROW_ARG) || fnText.match(FN_ARGS);
  return args;
}

class AngularBaseClass {
  constructor(args) {
    this.injectDependency(args);
  }

  injectDependency(args) {
    let argDecl = extractArgs(this.constructor);

    let listArguments = argDecl[1].split(FN_ARG_SPLIT);
    listArguments.forEach((value, index) => {
      if (this.constructor.$inject) {
        const key = this.constructor.$inject[index] || value.trim();
        this[key] = args[index];
      } else {
        this[value.trim()] = args[index];
      }
    });
  }
}

// class T extends AngularBaseClass {
//  constructor(x, y) {
//    super(arguments);
//  }
// }
//
// var t = new T(100, 100)
// console.log(t.x)

export default AngularBaseClass;
