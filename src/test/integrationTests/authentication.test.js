import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Integration tests for the user controller', () => {
  describe('Test general error handling and welcome message', () => {
    it('should send an error when invalid URL is given', async () => {
      const response = await chai.request(app).get('/api/v1/some/funny/url');
      expect(response.status).to.equal(404);
      expect(response.body).to.have.property('message');
      expect(response.body.message)
        .to.equal('The page you are looking for does not exist');
    });
    it('should welcome the user to the Microservice Project', async () => {
      const response = await chai.request(app).get('/api/v1/');
      expect(response.status).to.deep.equal(200);
      expect(response.body).to.have.property('message');
      expect(response.body).to.have.property('success');
      expect(response.body.success).to.equal(true);
      expect(response.body.message).to.equal('Welcome to the Microservice Project');
    });
  });
  describe('Test login a user', () => {
    it('should log a user in when valid details are given', async () => {
      const response = await chai.request(app).post('/api/v1/auth/login')
        .send({
          username: 'gmemmy',
          password: 'password'
        });
      expect(response.status).to.deep.equal(200);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.equal('Login successful!');
      expect(response.body.data).to.have.property('success');
      expect(response.body.data.success).to.equal(true);
      expect(response.body.data.user).to.be.an('object');
    });
    it('should return client error when the password is missing', async () => {
      const response = await chai.request(app).post('/api/v1/auth/login')
        .send({
          username: 'gmemmy'
        });
      expect(response.status).to.deep.equal(400);
      expect(response.body).to.have.property('success');
      expect(response.body.success).to.equal(false);
      expect(response.body).to.have.property('message');
      expect(response.body.message)
        .to.equal('Invalid request! \'password\' field is required');
    });
    it('should return client error when user details are missing', async () => {
      const response = await chai.request(app).post('/api/v1/auth/login')
        .send();
      expect(response.status).to.deep.equal(400);
      expect(response.body).to.have.property('success');
      expect(response.body.success).to.equal(false);
      expect(response.body).to.have.property('message');
      expect(response.body.message)
        .to.equal('Invalid request! \'username\' field is required');
    });
  });
});
