import { expect } from 'chai';
import sinon from 'sinon';
import { FindByFilterUseCase } from './index';
import { userModel } from '../../model';

describe('FindByFilterUseCase', () => {
  let findByFilterUseCase: FindByFilterUseCase;
  let userModelStub: sinon.SinonStub;

  beforeEach(() => {
    findByFilterUseCase = new FindByFilterUseCase();
    userModelStub = sinon.stub(userModel, 'find');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return a user when found by email', async () => {
    const mockUser = { email: 'john.doe@example.com', name: 'John Doe' };
    userModelStub.resolves([mockUser]);
    findByFilterUseCase.prepare('john.doe@example.com', 'email');

    const result = await findByFilterUseCase.execute();
    expect(result).to.deep.equal([mockUser]);
    expect(userModelStub.calledOnceWithExactly({ email: 'john.doe@example.com' })).to.be.true;
  });

  it('should return a user when found by name', async () => {
    const mockUser = { email: 'john.doe@example.com', name: 'John Doe' };
    userModelStub.resolves([mockUser]);
    findByFilterUseCase.prepare('John Doe', 'name');

    const result = await findByFilterUseCase.execute();

    expect(result).to.deep.equal([mockUser]);
    expect(userModelStub.calledOnceWithExactly({ name: 'John Doe' })).to.be.true;
  });


  it('should return undefined if no user is found', async () => {
    userModelStub.resolves([]);
    findByFilterUseCase.prepare('nonexistent.email@example.com', 'email');
    const result = await findByFilterUseCase.execute();

    expect(result).to.deep.equal([]);
    expect(userModelStub.calledOnceWithExactly({ email: 'nonexistent.email@example.com' })).to.be.true;
  });
});