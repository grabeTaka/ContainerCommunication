import { expect } from 'chai';
import sinon from 'sinon';
import { userModel } from '../model/index';
import { connect, disconnect, clearDatabase } from '../../../config/mock/index';

describe('User Model Tests', function () {
  let sandbox: sinon.SinonSandbox;

  before(async () => {
    await connect();
  });

  after(async () => {
    await clearDatabase();
    await disconnect();
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create and save a user', async () => {
    const userPayload = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
      coordinates: [40.7128, 74.0060],
    };

    const user = await userModel.create(userPayload);

    expect(user).to.have.property('_id');
    expect(user.name).to.equal('John Doe');
    expect(user.email).to.equal('john.doe@example.com');
    expect(user.address).to.equal('123 Main St');
    expect(user.coordinates).to.deep.equal([40.7128, 74.0060]);
  });

  it('should throw an error if required fields are missing', async () => {
    const invalidUserPayload = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    };

    try {
      await userModel.create(invalidUserPayload);
    } catch (err) {
      expect(err).to.exist;
      expect(err.message).to.include('address');
      expect(err.message).to.include('coordinates');
    }
  });
});