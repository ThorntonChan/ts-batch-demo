# ts-batch-demo

## Description

ts-batch-demo is demo showing usage of ts-batch for micro-batching and usage in a web server. The server is a simple
Express server that accepts POST and GET requests invokes the micro-batcher's methods. See more on ts-batch
on [github](https://github.com/ThorntonChan/ts-batch)
or [npm-registry](https://www.npmjs.com/package/ts-batch).
A test suite is included to verify the functionality of the server and ts-batch's micro-batcher.

## Usage

To install and run the project:

1. Install the dependencies: `npm install`
2. Run with `npm start`

A collection of [API calls](./Insomnia_api_collection.json). developed in [Insomnia](https://insomnia.rest/) is
available for testing. Compatability with other API testing tools is not
guaranteed. [insomnia-plugin-save-variables](https://insomnia.rest/plugins/insomnia-plugin-save-variables) is
not required to run the collection, but recommended for automatically saving variables for subsequent calls.

## License

`ts-batch` is [MIT licensed](./LICENSE).