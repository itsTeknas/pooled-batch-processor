# pooled-batch-processor
A utility wrapper around es6-promise-pool that lets you process data arrays in batches

## Installation

```bash
npm install pooled-batch-processor --save
```

## Usage

```js

let pool = require('pooled-batch-processor')

let longDataArray = [
    1,
    2,
    ...
]

pool.processInPool(longDataArray, 5, 10, (batch) => {
    // This function should return a promise.

    return new Promise(resolve => {

        // Process the batch

        // each batch will have 5 items from longDataArray
        // this will be run in 10 promises at a time simultaneously

        // If split is set to 1,
        // you will get individual items in place of a array.
        resolve();
    }) 
}).then(() => {
    // All items processed
})
```