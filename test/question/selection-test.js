var assert = require('./../../assert')('selection-question');

describe('Selection question', function () {
  describe('Examples', function () {
    assert.areValid([
      'highlight',
      'select',
      'find'
    ]);
  });
});
