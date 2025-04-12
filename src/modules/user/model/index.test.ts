import { expect } from 'chai';
import sinon from 'sinon';
import { userModel } from '@/modules/user/model';
import { connect, disconnect, clearDatabase } from '@/config/mock/index';
import { userPayload } from '@/modules/user/mock/index';

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
    const user = await userModel.create(userPayload);

    expect(user).to.have.property('_id');
    expect(user.name).to.equal(userPayload.name);
    expect(user.email).to.equal(userPayload.email);
    expect(user.address).to.equal(userPayload.address);
    expect(user.coordinates).to.deep.equal([userPayload.coordinates[0], userPayload.coordinates[1]]);
  });

  it('should throw an error if required fields are missing', async () => {
    const invalidUserPayload = {
      name: userPayload.name,
      email: userPayload.email,
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