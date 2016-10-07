var assert = require('./../../assert')('moment-question');

describe('Moment question', function () {
  describe('Schema', function () {
    describe('A moment question', function () {
      it('must satisfy the #base-question# schema', function () {
        assert.hasErrors('moment-not-satisfying-base-schema', {
          '.id': 'property .id is required',
          '.type': 'property .type is required',
          '.title': 'property .title is required',
          '.meta': 'should be object',
          '.objects': 'should be array'
        });
      });

      it('must have a *file* property', function () {
        assert.hasError('moment-no-file', {
          '.file': 'property .file is required'
        });
      });

      it('may have a *solutions* property', function () {
        assert.isValid('moment-solutions');
      });
    });

    describe('The *file* property', function () {
      it('must satisfy the #content# schema', function () {
        assert.hasError('moment-file-not-satisfying-content-schema', {
          '.file.type': 'property .type is required'
        });
      });
    });

    describe('The *solutions* property', function () {
      it('must be an array', function () {
        assert.hasError('moment-solutions-not-an-array', {
          '.solutions': 'should be array'
        });
      });

      it('must contain at least one solution', function () {
        assert.hasError('moment-empty-solutions-array', {
          '.solutions': 'should NOT have less than 1 items'
        });
      });

      describe('The *score* property', function () {
        it('must be a number', function () {
          assert.hasError('moment-solution-score-is-not-a-number', {
            '.solutions[0].score': 'should be number'
          });
        });
      });

      describe('Each solution', function () {
        it('must be object', function () {
          assert.hasError('moment-solution-is-not-an-object', {
            '.solutions[0]': 'should be object'
          });
        });

        it('must be unique', function () {
          assert.hasError('moment-duplicate-solutions', {
            '.solutions': 'items ## 0 and 1 are duplicate'
          });
        });

        it('must have a *score* property', function () {
          assert.hasError('moment-solutions-no-score', {
            '.solutions[0].score': 'property .score is required'
          });
        });

        it('must have a *marker* property', function () {
          assert.hasError('moment-solutions-no-marker', {
            '.solutions[0].marker': 'property .marker is required'
          });
        });

        describe('Each marker', function () {
          it('must be object', function () {
            assert.hasError('moment-solution-marker-is-not-an-object', {
              '.solutions[0].marker': 'should be object'
            });
          });
        });
      });
    });
  });

  describe('Examples', function () {
    assert.areValid([
      'moment-basic',
      'moment-solutions'
    ]);
  });
});
