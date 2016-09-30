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

      it('must have a *audio* property', function () {
        assert.hasError('spotting-no-audio', {
          '.audio': 'property .audio is required'
        });
      });

      it('may have a *solutions* property', function () {
        assert.isValid('spotting-solutions');
      });
    });

    describe('The *audio* property', function () {
      it('must satisfy the #content# schema', function () {
        assert.hasError('spotting-audio-not-satisfying-content-schema', {
          '.audio.type': 'property .type is required'
        });
      });
    });

    describe('The *solutions* property', function () {
        it('must be an array', function () {
          assert.hasError('spotting-solutions-not-an-array', {
            '.solutions': 'should be array'
          });
        });
        describe('Each solution', function () {
        it('Must be unique', function () {
          assert.hasError('spotting-duplicate-solutions', {
            '.solutions': 'items ## 0 and 1 are duplicate'
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
