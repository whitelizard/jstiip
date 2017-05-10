import chai from 'chai';
import tiip from '../index.js';

const msg = tiip.unpack(tiip.pack('req', 'conf', 'function', {a:1}));

chai.expect(msg).to.have.property('type').and.equal('req');
chai.expect(msg).to.have.property('target').and.equal('conf');
chai.expect(msg).to.have.property('signal').and.equal('function');
chai.expect(msg).to.have.property('arguments').and.equal({a:1});
