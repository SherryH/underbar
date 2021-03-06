(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined? array[array.length-1]: (n===0 ? [] : array.slice(-n));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)){
      for(var i = 0; i< collection.length;i++){
        iterator(collection[i],i,collection);
      }
    }else{
      for (var prop in collection){
        iterator(collection[prop],prop,collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var arr = [];
    _.each(collection,function(item,index){
      if (test(item)){
        arr.push(item);
      }
    });
    return arr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(item){
      return !test(item);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var arr = [];
    _.each(array,function(value,index){
      if (_.indexOf(arr,value)===-1){
        arr.push(value);
      }
    });
    return arr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var arr = [];
    _.each(collection,function(value){
      arr.push(iterator(value));
    });
    return arr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    //accumulator is passed in
    var pre = accumulator;

    //if accumulator is not passed in,ie.undefined, skip first element
    var skipFirst = pre===undefined ? true: false;
    _.each(collection,function(value){
      if (skipFirst=== true){
        pre = value;
        skipFirst = false;
      }else{
        pre = iterator(pre,value);
      }      
    });
    return pre;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (iterator===undefined){
      iterator=_.identity;
    }
    return _.reduce(collection,function(pre,cur){
      if (!pre){
        return false;
      }else{
        if(iterator(cur)){
          return true;
        }else{
          return false;
        }
      }     
    },true);
  };



  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity;
    return !_.every(collection,function(item){
      return !iterator(item);
    });
  }



  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var len = arguments.length;
    for (var i = 1; i< len; i++){
      for (var prop in arguments[i]){
        arguments[0][prop]=arguments[i][prop];
      }
    }
    return arguments[0];
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var argArray = Array.prototype.slice.call(arguments);
    for(var i = 1; i<argArray.length; i++){
      for(var prop in argArray[i]){
        if (obj[prop]===undefined){
          obj[prop]=argArray[i][prop];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(null, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };


  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // should remember the arguments passed in
    // if arguments passed in before, return that value
    var cache={};
    var memo = function(arg){
      var argString = Array.prototype.slice.call(arguments).toString();
      for (var i=0;i<arguments.length;i++){
        argString= argString.concat(typeof(arguments[i]));
      }
      if(cache[argString]===undefined){
        cache[argString] = func.apply(this,arguments);
      }
      return cache[argString];
    };
    return memo;
  };


  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments,2);
    setTimeout(function(){
      func.apply(this,args);
    },wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var arr = Array.prototype.slice.call(array);
    //generate a random number within the length of the array
    //Math.random() * (max - min) + min;
    _.each(arr,function(item,index){
      // do a swap position with a random item in array
      var randIndex = Math.floor(Math.random()*arr.length);
      arr[index]=arr[randIndex];
      arr[randIndex]=item;
    });
    return arr;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    //take a collection
    //apply the functionOrKey function with the args to all elem
    //
    return _.map(collection,function(elem){
       //debugger;
       //check to see if functionOrKey is a function or not
       //if it is a function, apply
       //if it is not (ie.a key), assume the key is a method of the elem
       // call elem[key]
       var fn = (typeof functionOrKey === 'function')? functionOrKey : elem[functionOrKey];
       return fn.apply(elem,args);
  
       
       // if (typeof functionOrKey === 'function'){
       //    return funcftionOrKey.apply(elem,args);
       // }else{
       //    return elem[functionOrKey].apply(elem,args);
       // } 
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    //a collection of objects
    //loop thru the items in the object
    // if the iterator is a callback func, takes in the item, returns the property to be sorted on
    var fn = (typeof iterator === 'function')?function(item){return iterator(item);}:function(item){return item[iterator];};
    collection.sort(function(a,b){
      if(fn(a)<fn(b)) return -1
      if (fn(a)>fn(b)) return 1
      return 0;  
    });

      // if (typeof iterator === 'function'){
      //   // sort by iterator(item), from smallest to biggest
      //   //use sort method
      //   collection.sort(function(a,b){
      //     if (iterator(a)<iterator(b)) return -1;
      //     if (iterator(a)>iterator(b)) return 1;
      //     return 0;
      //   });

      // }else{
      //   //if iterator is a string
      //   collection.sort(function(a,b){
      //     if (a[iterator]<b[iterator]) return -1;
      //     if (a[iterator]>b[iterator]) return 1;
      //     return 0;
      //   });
      // }    
      return collection;


  };


  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    //use array.concat to join corresponding 2 items together
    //take in a list of the arguments
    //check which arguments have longest length
    //loop thru according to that length
    var maxSubArrayLen=0;
    var finalArr=[];
    var arr = Array.apply(null,arguments);
    _.each(arr,function(item,index){
      maxSubArrayLen = (item.length>maxSubArrayLen)? item.length: maxSubArrayLen;
    });
    //for every subarray in the argument
    // take the first elem from each sub array
    //concate them together into an individual array
    //push to the final array
    //repeat until the last elem in longest subarray
    
    for (var j=0; j< maxSubArrayLen;j++){
      var indarray = [];
        for (var i = 0; i < arr.length; i++){
          indarray.push(arr[i].shift());
        }   
      finalArr.push(indarray);
    }
    return finalArr;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var arr = (result===undefined)?[]:result;
    _.each(nestedArray,function(subArray){    
      if (Array.isArray(subArray)){
        _.flatten(subArray,arr);
      } else{
        arr.push(subArray);
      }
    });
    return arr;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var inputArrays = Array.from(arguments);
    var minSubArray = _.reduce(inputArrays,function(pre,cur){
      return (pre.length<cur.length)? pre : cur;
    });
    //use filter to check whether the item is present in all arrays
    //check first elem in first array, if not present in all arry
    // take out that elem from present arrays
    // repeat for rest of elem in array
    //until 1 array is empty
    return _.filter(minSubArray,function(item){
      //check to see if this item is present in all subArrays in inputArray
      return _.every(inputArrays,function(subArray){
        //if the item is present, return true. 
        //when the item is present in all subArray, _.every will return true
        return (_.indexOf(subArray,item)===-1)?false:true;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    //get the other arrays
    var otherArrays = Array.prototype.slice.call(arguments,1);
    //for each of the elem in the first array
    // check against the other arrays
    // if it is present in some of the other arrays, dun return it
    return _.reject(array,function(item){
      return _.some(otherArrays,function(subArray){
        return (_.indexOf(subArray,item)!==-1)?true:false;
      });
    });
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
