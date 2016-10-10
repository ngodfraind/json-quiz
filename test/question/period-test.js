var assert = require('./../../assert')('period-question');

describe('Period question', function () {
  describe('Schema', function () {
    describe('A period question', function () {
      it('must satisfy the #base-question# schema', function () {
        assert.hasErrors('period-not-satisfying-base-schema', {
          '.id': 'property .id is required',
          '.type': 'property .type is required',
          '.title': 'property .title is required',
          '.meta': 'should be object',
          '.objects': 'should be array'
        });
      });

      it('must have a *file* property', function () {
        assert.hasError('period-no-file', {
          '.file': 'property .file is required'
        });
      });

      it('may have a *solutions* property', function () {
        assert.isValid('period-solutions');
      });
    });

    describe('The *id* property', function () {
      it('must be a string', function () {
        assert.hasError('period-id-not-a-string', {
          '.id': 'should be string'
        });
      });
    });

    describe('The *file* property', function () {
      it('must satisfy the #content# schema', function () {
        assert.hasError('period-file-not-satisfying-content-schema', {
          '.file.type': 'property .type is required'
        });
      });
    });

    describe('The *solutions* property', function () {
      it('must be an array', function () {
        assert.hasError('period-solutions-not-an-array', {
          '.solutions': 'should be array'
        });
      });

      it('must contain at least one solution', function () {
        assert.hasError('period-empty-solutions-array', {
          '.solutions': 'should NOT have less than 1 items'
        });
      });

      describe('The *score* property', function () {
        it('must be a number', function () {
          assert.hasError('period-solution-score-is-not-a-number', {
            '.solutions[0].score': 'should be number'
          });
        });
      });

      describe('Each solution', function () {
        it('must be object', function () {
          assert.hasError('period-solution-not-an-object', {
            '.solutions[0]': 'should be object'
          });
        });

        it('must be unique', function () {
          assert.hasError('period-duplicate-solutions', {
            '.solutions': 'items ## 0 and 1 are duplicate'
          });
        });

        it('must have a *score* property', function () {
          assert.hasError('period-solution-no-score', {
            '.solutions[0].score': 'property .score is required'
          });
        });

        it('must have a *region* property', function () {
          assert.hasError('period-solutions-no-region', {
            '.solutions[0].region': 'property .region is required'
          });
        });

      });
    });
  });

  describe('Examples', function () {
    assert.areValid([
      'period-basic',
      'period-solutions'
    ]);
  });
});
