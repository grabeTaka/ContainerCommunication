/*import { expect } from 'chai';
import sinon from 'sinon';
import { CreateUserUseCase } from './index';
import { userModel } from '../../model';
import { IUser } from '@/types/user';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let createStub: sinon.SinonStub;

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase();
    
    createStub = sinon.stub(userModel, 'create').resolves({
      _id: 'mocked-id',
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
      coordinates: [123.45, 678.90],
    } as any);
  });

  afterEach(() => {
    createStub.restore();
  });

  it('should prepare the user correctly', async () => {
    const user: Partial<IUser> = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
      coordinates: [123.45, 678.90],
    };

    createUserUseCase.prepare(user);
    expect(createUserUseCase.user).to.deep.equal(user);
  });

  it('should call create method and return a user', async () => {
    const user: Partial<IUser> = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
      coordinates: [123.45, 678.90],
    };

    createUserUseCase.prepare(user);
    const result = await createUserUseCase.execute();

    expect(createStub.calledOnce).to.be.true;
    expect(result).to.have.property('_id');
    expect(result).to.have.property('name', 'John Doe');
    expect(result).to.have.property('email', 'john.doe@example.com');
  });

  it('should throw an error if create fails', async () => {
    createStub.rejects(new Error('Failed to create user'));

    const user: Partial<IUser> = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
      coordinates: [123.45, 678.90],
    };

    createUserUseCase.prepare(user);

    try {
      await createUserUseCase.execute();
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.equal('Failed to create user');
    }
  });
});*/