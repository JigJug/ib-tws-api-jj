import { Client, Contract } from '../index.js';



async function run() {
  let api = new Client();

  await api.connect({
    host: '127.0.0.1',
    port: 4001,
    /*
    log_info: console.log,
    log_debug: console.log,
    log_debug_bytes: console.log*/
  })

  let contract = Contract.stock('SPY', 'SMART', 'USD');

  let e = api.streamTickByTickData({
    contract: contract,
    tickType: 'BidAsk',
    numberOfTicks: 0,
    ignoreSize: false
  });

  e.on('tickByTick', (t) => {
    console.log('ticker');
    console.log(t);
  });

  setTimeout(() => {
    e.stop();
    console.log('shut down streaming');
  }, 10000);
}



run()
  .then(() => {
    console.log('finish');
  })
  .catch((e) => {
    console.log('failure');
    console.log(e);
    process.exit();
  });