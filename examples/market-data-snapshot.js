import { Client, Contract } from '../index.js';



async function run() {
  let api = new Client();

  await api.connect({
    host: '127.0.0.1',
    port: 4001,
    /*log_info: console.log,
    log_debug: console.log,
    log_debug_bytes: console.log*/
  })

  let contract = Contract.stock('AAPL');

  let ticker = await api.getMarketDataSnapshot({
    contract: contract
  });

  console.log(ticker);
}



run()
  .then(() => {
    console.log('finish');
    process.exit();
  })
  .catch((e) => {
    console.log('failure');
    console.log(e);
    process.exit();
  });