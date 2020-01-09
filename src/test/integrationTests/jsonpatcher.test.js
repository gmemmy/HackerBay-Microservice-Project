import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
const { expect } = chai;

let token;

describe('Integration tests for the Json Patcher Controller', () => {
  const requestBody = {
    "firstKey": 'hey',
    secondKey: 'there'
  }
  const invalidRequestBody = 'abdhbhbdfh';
;
  describe('Authentication tests', () => {
    it('should return an error if the authentication token is missing', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/patch')
        .send(requestBody);
      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('success');
      expect(response.body.success).to.equal(false);
      expect(response.body).to.have.property('message');
    });
    it('should return error if the authentication token is invalid', async () => {
      const response = await chai.request(app)
        .post('/api/v1/patch')
        .set({ authorization: 'gygyygiiygyii' })
        .send(requestBody);
      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('success');
      expect(response.body.success).to.equal(false);
      expect(response.body).to.have.property('message');
    });
  });
  before('login to generate a valid token', async () => {
    const response = await chai.request(app).post('/api/v1/auth/login')
      .send({
        username: 'gmemmy',
        password: 'password',
      });
    token = response.body.data.token;
  });
  describe('Test patching a json doc', () => {
    it('should patch a json doc if the request body passes validation', async () => {
      const response = await chai.request(app)
        .post('/api/v1/patch')
        .set({ authorization: token })
        .send(requestBody);
      expect(response.status).to.deep.equal(200);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.equal('JSON object patched successfully!');
      expect(response.body.data).to.have.property('success');
      expect(response.body.data.success).to.equal(true);
      expect(response.body.data.patchedDoc).to.be.an('object');
    });
  });
});
