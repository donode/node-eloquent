function defer() {
  let resolve, reject;
  const promise = new Promise((...args) => {
    resolve = args[0];
    reject = args[1];
  });
  return {
    resolve,
    reject,
    promise
  };
}

function promisify(fn) {
  if (typeof fn !== 'function') throw 'not a function';

  return (...args) => {
    const deferred = defer();
    try {
      args.push(cb);
      fn.apply(this, args);
    } catch (e) {
      deferred.reject(e);
    }

    return deferred.promise;

    function cb(e, ...values) {
      if (e) deferred.reject(e);
      else deferred.resolve(...values);
    }
  };
}

module.exports = {
  defer,
  promisify
};
