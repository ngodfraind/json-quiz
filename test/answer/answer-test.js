var assert = require('./../../assert')('answer');

describe('Answer', function () {
  describe('Schema', function () {
    describe('An answer', function () {
      it('must be an object', function () {
        assert.hasError('not-an-object', {
          '': 'should be object'
        });
      });

      it('must have a *questionId* property', function () {
        assert.hasError('no-question-id', {
          '.questionId': 'property .questionId is required'
        });
      });

      it('may have a *tries* property', function () {
        assert.isValid('with-tries');
      });

      it('may have a *score* property', function () {
        assert.isValid('with-score');
      });

      it('may have a *data* property', function () {
        assert.isValid('with-used-hints');
      });

      it('may have a *usedHints* property', function () {
        assert.isValid('with-data');
      });

      describe('The *questionId* property', function () {
        it('must be a string', function () {
          assert.hasError('question-id-is-not-a-string', {
            '.questionId': 'should be string'
          });
        });
      });

      describe('The *tries* property', function () {
        it('must be a number', function () {
          assert.hasError('tries-is-not-a-number', {
            '.tries': 'should be number'
          });
        });
      });

      describe('The *score* property', function () {
        it('must be a number', function () {
          assert.hasError('score-is-not-a-number', {
            '.score': 'should be number'
          });
        });
      });

      describe('The *usedHints* property', function () {
        it('must be an array', function () {
          assert.hasError('used-hints-is-not-an-array', {
            '.usedHints': 'should be array'
          });
        });

        describe('Each item', function () {
          it('must be unique', function () {
            assert.hasError('duplicate-used-hints', {
              '.usedHints': 'items ## 0 and 1 are duplicate'
            });
          });

          it('must satisfy the #hint# schemas', function () {
            assert.hasError('used-hint-not-satisfying-hint-schema', {
              '.usedHints[0]': 'should be object'
            });
          });
        });
      });

      describe('The *data* property', function () {
        it('must satisfy the #answer-data# schema', function () {
          assert.hasError('data-not-satisfying-answer-data-schema', {
            '.data': 'should match exactly one schema in oneOf'
          });
        });
      });
    });
  });

  describe('Examples', function () {
    assert.areValid([
      'with-tries',
      'with-score',
      'with-used-hints',
      'with-data',
      'full'
    ]);
  });
});