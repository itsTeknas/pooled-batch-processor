"use strict";
var PromisePool = require('es6-promise-pool');

/**
 * An amazing utility function to hand pooling of promises
 * @param {*} data The actual data array that needs to be processed
 * @param {*} split the chunks to split the data in to be processed in batched
 * @param {*} concurrency the concurrency of processing chunks of data
 * @param {*} processBatchFn a promise generating function that processes the data chunks
 */

module.exports.processInPool = (data, split, concurrency, processBatchFn) => {
  if (split < 1) {
    throw new Error("Split cannot be lesser than 1");
  }
  if (concurrency < 1) {
    throw new Error("Concurrency cannot be lesser than 1");
  }

  let batches = [];

  if (split === 1) {
    batches = data;
  } else {
    for (var i = 0; i < data.length; i += split) {
      batches.push(data.slice(i, i + split))
    }
  }
  let count = 0;
  let promiseProducer = () => {
    if (count < batches.length) {
      let currentBatch = batches[count];
      count++;

      if (Array.isArray(currentBatch)) {
        if (currentBatch.length > 0) {
          return processBatchFn(currentBatch)
        } else {
          return null;
        }
      } else {
        return processBatchFn(currentBatch)
      }

      if (currentBatch && currentBatch.length > 0) {
        return processBatchFn(batches[count])
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  var pool = new PromisePool(promiseProducer, concurrency)

  var poolPromise = pool.start()
  return poolPromise;
}