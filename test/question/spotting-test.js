var assert = require('./../../assert')('spotting-question');

describe('Spotting question', function () {
  describe('Schema', function () {
    describe('A spotting question', function () {
      it('must satisfy the #base-question# schema', function () {
        assert.hasErrors('spotting-not-satisfying-base-schema', {
          '.id': 'property .id is required',
          '.type': 'property .type is required',
          '.title': 'property .title is required',
          '.meta': 'should be object',
          '.objects': 'should be array'
        });
      });

      it('must have a *file* property', function () {
        assert.hasError('spotting-no-file', {
          '.file': 'property .file is required'
        });
      });

      it('may have a *solutions* property', function () {
        assert.isValid('spotting-solutions');
      });
    });

    describe('The *file* property', function () {
      it('must satisfy the #content# schema', function () {
        assert.hasError('spotting-file-not-satisfying-content-schema', {
          '.file.type': 'property .type is required'
        });
      });
    });

    describe('The *solutions* property', function () {
      it('must be an array', function () {
        assert.hasError('spotting-solutions-not-an-array', {
          '.solutions': 'should be array'
        });
      });

      it('must contain at least one solution', function () {
        assert.hasError('spotting-empty-solutions-array', {
          '.solutions': 'should NOT have less than 1 items'
        });
      });

      describe('The *score* property', function () {
        it('must be a number', function () {
          assert.hasError('spotting-solution-score-is-not-a-number', {
            '.solutions[0].score': 'should be number'
          });
        });
      });

      describe('Each solution', function () {
        it('must be object', function () {
          assert.hasError('spotting-solution-is-not-an-object', {
            '.solutions[0]': 'should be object'
          });
        });

        it('must be unique', function () {
          assert.hasError('spotting-duplicate-solutions', {
            '.solutions': 'items ## 0 and 1 are duplicate'
          });
        });

        it('must have a *score* property', function () {
          assert.hasError('spotting-solutions-no-score', {
            '.solutions[0].score': 'property .score is required'
          });
        });

        it('must have a *region* property', function () {
          assert.hasError('spotting-solutions-no-region', {
            '.solutions[0].region': 'property .region is required'
          });
        });

        describe('Each region', function () {
          it('must be object', function () {
            assert.hasError('spotting-solution-region-is-not-an-object', {
              '.solutions[0].region': 'should be object'
            });
          });
        });
      });
    });
  });

  describe('Examples', function () {
    assert.areValid([
      'spotting-basic',
      'spotting-solutions'
    ]);
  });
});
