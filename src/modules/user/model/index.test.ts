import { expect } from 'chai';
import sinon from 'sinon';
import { userModel } from '@/modules/user/model';
import { connect, disconnect, clearDatabase } from '@/config/mock/index';
import { userPayloadMock } from '@/modules/user/mock/index';

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
    const user = await userModel.create(userPayloadMock);

    expect(user).to.have.property('_id');
    expect(user.name).to.equal(userPayloadMock.name);
    expect(user.email).to.equal(userPayloadMock.email);
    expect(user.address).to.equal(userPayloadMock.address);
    expect(user.coordinates).to.deep.equal([userPayloadMock.coordinates[0], userPayloadMock.coordinates[1]]);
  });

  it('should throw an error if required fields are missing', async () => {
    const invalidUserPayload = {
      name: userPayloadMock.name,
      email: userPayloadMock.email,
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