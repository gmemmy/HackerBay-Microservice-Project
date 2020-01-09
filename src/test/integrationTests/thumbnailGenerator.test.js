import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
const { expect } = chai;

let token;

describe('Integration tests for the Thumbnail Generator Controller', () => {
  const requestBody = {
   image: 'https://www.google.com/images/srpr/logo3w.png'
  }
  const invalidRequestBody = {
    something: 'rhbfrbfhrbfhrf'
  };
;
  describe('Authentication tests', () => {
    it('should return an error if the authentication token is missing', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/thumbnail')
        .send(requestBody);
      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('success');
      expect(response.body.success).to.equal(false);
      expect(response.body).to.have.property('message');
    });
    it('should return error if the authentication token is invalid', async () => {
      const response = await chai.request(app)
        .post('/api/v1/thumbnail')
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
    it('should generate a thumbnail image if the'
    +'request body passes validation', async () => {
      const response = await chai.request(app)
        .post('/api/v1/thumbnail')
        .set({ authorization: token })
        .send(requestBody);
      expect(response.status).to.deep.equal(200);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.equal('Thumbnail image'
      +' generated successfully!');
      expect(response.body.data).to.have.property('success');
      expect(response.body.data.success).to.equal(true);
      expect(response.body.data.thumbnail).to.be.an('object');
    });
    it('should return an error if the request body is invalid', async () => {
      const response = await chai.request(app)
        .post('/api/v1/thumbnail')
        .set({ authorization: token })
        .send(invalidRequestBody);
      expect(response.status).to.deep.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to
      .equal('Invalid request! \'image\' field is required');
      expect(response.body).to.have.property('success');
      expect(response.body.success).to.equal(false);
    });
    it('should return an error if the image value'
    +'is not a public image URL', async () => {
      const response = await chai.request(app)
        .post('/api/v1/thumbnail')
        .set({ authorization: token })
        .send({
          image: 'bhbhbhfhr'
        });
      expect(response.status).to.deep.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to
      .equal('Invalid! Please input a public image URL');
      expect(response.body).to.have.property('success');
      expect(response.body.success).to.equal(false);
    });
  });
});
