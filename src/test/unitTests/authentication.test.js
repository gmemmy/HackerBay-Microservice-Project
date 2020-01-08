import chai from 'chai';
import Authentication from '../../utils/Authentication';

const { expect } = chai;

const data = {
  username: 'gmemmy'
};

describe('Tests for authentication helper methods', () => {
  it('should generate a shuffled token', async () => {
    const token = await Authentication.getToken(data);
    expect(token).to.be.a('string');
  });

  it('it should unscramble token and validate', async () => {
    const token = await Authentication.getToken(data);
    const responsePayload = await Authentication.verifyToken(token);
    expect(responsePayload.username).to.be.equal('gmemmy');
    expect(responsePayload).to.be.a('object');
  });

  it('should return a response of success false if the token is invalid', async () => {
    const invalidToken = await Authentication.verifyToken('wer#rergfdfgt454rFEF%$Ff3fw');
    expect(invalidToken).to.be.an('object');
    expect(invalidToken).to.haveOwnProperty('success');
    expect(invalidToken.success).to.be.equal(false);
  });
});
