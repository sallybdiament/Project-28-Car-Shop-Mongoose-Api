import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleServices from '../../../src/Services/MotorcycleServices';
import Motorcycle from '../../../src/Domains/Motorcycle';

const MotorcycleNotFound = 'Motorcycle not found';
const invalidMongoDB = 'Invalid mongo id';

describe('Testa os serviços de Motorcycle', function () {
  it('Deveria criar uma nova Motorcycle cadastrada', async function () {
    const inputMotorcycle: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const outputMotorcycle: Motorcycle = new Motorcycle({
      id: '63c447122a23bfb21569a044', 
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    });
    sinon.stub(Model, 'create').resolves(outputMotorcycle);

    const service = new MotorcycleServices();
    const result = await service.create(inputMotorcycle);

    expect(result).to.be.deep.equal(outputMotorcycle);
  });

  it('Deveria retornar as Motorcycle cadastradas com sucesso', async function () {
    const outputMotorcycle: Motorcycle = new Motorcycle({
      id: '63c447122a23bfb21569a044',      
      model: 'Honda Cb 600f',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    });
    sinon.stub(Model, 'find').resolves([outputMotorcycle]);
        
    const service = new MotorcycleServices();
    const result = await service.find();
    
    expect(result).to.be.deep.equal([outputMotorcycle]);
  });

  it('Deveria retornar a Motorcycle cadastrada pelo ID com sucesso', async function () {
    const MotorcycleByIdOutput: Motorcycle = new Motorcycle({
      id: '63c447122a23bfb21569a044',
      model: 'Honda Cb',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    });
    sinon.stub(Model, 'find').resolves([MotorcycleByIdOutput]);
    
    const service = new MotorcycleServices();
    const result = await service.findById('63c447122a23bfb21569a044');
      
    expect(result).to.be.deep.equal(MotorcycleByIdOutput);
  });

  it(
    'Deveria retornar um erro caso o Id passado não esteja no formato mongo id', 
    async function () {
      sinon.stub(Model, 'find').resolves();
      
      try {
        const service = new MotorcycleServices();
        await service.findById('xxx');
      } catch (error) { 
        expect((error as Error).message).to.be.equal(invalidMongoDB);
      }
    },
  );

  it(
    'Deveria retornar um erro caso o Id passado não seja encontrado no banco de dados',
    async function () {
      sinon.stub(Model, 'find').resolves();
      
      try {
        const service = new MotorcycleServices();
        await service.findById('63c447122a23bfb21569a044');
      } catch (error) { 
        expect((error as Error).message).to.be.equal('Motorcycle not found');
      }
    },
  );
  it('Deveria retornar a Motorcycle com as infos atualizadas com sucesso', async function () {
    const inputMotorcycle: IMotorcycle = {
      model: 'Honda',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const outputMotorcycle: Motorcycle = new Motorcycle({
      id: '63c447122a23bfb21569a044',
      model: 'Honda Cbx',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    });

    sinon.stub(Model, 'findByIdAndUpdate').resolves(outputMotorcycle);
    const service = new MotorcycleServices();
    const result = await service.update('63c447122a23bfb21569a044', inputMotorcycle);

    expect(result).to.be.deep.equal(outputMotorcycle);
  });

  it(
    'Deveria retornar um erro no update caso o Id passado não esteja no formato mongo id', 
    async function () {
      const inputMotorcycle: IMotorcycle = {
        model: 'Honda',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };
      sinon.stub(Model, 'findByIdAndUpdate').resolves();
      
      try {
        const service = new MotorcycleServices();
        await service.update('xxx', inputMotorcycle);
      } catch (error) { 
        expect((error as Error).message).to.be.equal(invalidMongoDB);
      }
    },
  );

  it(
    'Deveria retornar um erro no update caso o Id passado não seja encontrado no banco de dados', 
    async function () {
      const inputMotorcycle: IMotorcycle = {
        model: 'Honda Cb 600',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };
          
      sinon.stub(Model, 'findByIdAndUpdate').resolves();
      
      try {
        const service = new MotorcycleServices();
        await service.update('63c447122a23bfb21569a044', inputMotorcycle);
      } catch (error) { 
        expect((error as Error).message).to.be.equal(MotorcycleNotFound);
      }
    },
  );
  //   it('Deveria detelar com sucesso', async function () {  
  //   });
  it(
    'Deveria retornar um erro no delete caso o Id passado não esteja no formato mongo id', 
    async function () {
      const outputMotorcycleDeleted = {
        deleteResult: 1, acknowledged: true, deletedCount: 1,
      };    
      sinon.stub(Model, 'deleteOne').resolves(outputMotorcycleDeleted);
      
      try {
        const service = new MotorcycleServices();
        await service.delete('xxx');
      } catch (error) { 
        expect((error as Error).message).to.be.equal(invalidMongoDB);
      }
    },
  );
  it(
    'Deveria retornar um erro no delete caso o Id passado não seja encontrado no banco de dados', 
    async function () {    
      sinon.stub(Model, 'find').resolves();
      try {
        const service = new MotorcycleServices();
        await service.delete('63c447122a23bfb21569a044');
      } catch (error) { 
        expect((error as Error).message).to.be.equal(MotorcycleNotFound);
      } 
    },
  );
  afterEach(function () {
    sinon.restore();
  });
});