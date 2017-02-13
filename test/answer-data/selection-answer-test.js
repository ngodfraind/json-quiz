var assert = require('./../../assert')('selection-answer');

describe('Selection answer', function () {
  describe('Examples', function () {
    assert.areValid([
      'colored',
      'visible',
      'invisible'
    ]);
  });
});
