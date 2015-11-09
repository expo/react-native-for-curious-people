/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule doSomeExpensiveOperation
 */
'use strict';

export default function doSomeExpensiveOperation() {
  var takeForever = "";
  for (var i = 0; i <= 20000; i++) {
    takeForever = takeForever + (new Date()).toString();
  }
}
