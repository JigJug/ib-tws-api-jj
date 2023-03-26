import assert from 'assert';



export default class Contract {
  static limit(data, transmit, parentId) {//transmit true or false for bracket orders. true to send order straight away, false to idle
    assert(data.action);
    assert(data.totalQuantity > 0);
    //assert(data.lmtPrice > 0);

    return Contract._toOrder(data, 'LMT', {
      transmit: transmit,
      //openClose: 'O',
	    tif: 'GTC',
      parentId: parentId,
      ocaType: 1
      //percentOffset: percentOffset
      /*
      origin: 0,
      parentId: 0,
      blockOrder: 0,
      sweepToFill: 0,
      displaySize: 0,
      triggerMethod: 0,
      outsideRth: 0,
      hidden: 0,
      discretionaryAmt: 0,
      shortSaleSlot: 0,
      exemptCode: -1,
      ocaType: 0,
      allOrNone: 0,
      eTradeOnly: 1,
      firmQuoteOnly: 1,
      auctionStrategy: 0,
      overridePercentageConstraints: 0,
      continuousUpdate: 0,
      optOutSmartRouting: 0,
      notHeld: 0,
      whatIf: 0,
      solicited: 0,
      randomizeSize: 0,
      randomizePrice: 0,
      extOperator: 0,
      mifid2ExecutionAlgo: 0,*/
    });
  }

  static relative(data, transmit, parentId, offset){

    return Contract._toOrder(data, 'REL', {
      parentId: parentId,
      transmit: transmit,
	    tif: 'GTC',
      ocaType: 1,
      percentOffset: offset
    });
  }



  static market(data, transmit) {
    assert(data.action);
    assert(data.totalQuantity > 0);

    return Contract._toOrder(data, 'MKT', {
      transmit: transmit,
      goodAfterTime: '',
      goodTillDate: ''
    });
  }



  static stop(data, transmit, parentId) {
    assert(data.action);
    assert(data.totalQuantity > 0);
    //assert(data.auxPrice > 0);

    return Contract._toOrder(data, 'STP', {
      transmit: transmit,
      tif: 'GTC',
      parentId: parentId,
      ocaType: 1
      //percentOffset: percentOffset
    });
  }



  static _toOrder(data, orderType, defaults) {
    assert(!data.orderType);

    let o = {
      orderType: orderType
    };

    for (let k in defaults) {
      o[k] = defaults[k];
    }
    for (let k in data) {
      o[k] = data[k];
    }

    return o;
  }
}
