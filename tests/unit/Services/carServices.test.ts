import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import CarServices from '../../../src/Services/CarServices';

const carNotFound = 'Car not found';
const invalidMongoDB = 'Invalid mongo id';

describe('Testa os serviços de carro', function () {
  it('Deveria criar um novo carro cadastrado', async function () {
    const inputCar: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const outputCar: Car = new Car(
      {
        id: '63c447122a23bfb21569a044', 
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      },
    );
    sinon.stub(Model, 'create').resolves(outputCar);

    const service = new CarServices();
    const result = await service.create(inputCar);

    expect(result).to.be.deep.equal(outputCar);
  });
  it('Deveria retornar os carros cadastrados com sucesso', async function () {
    const outputCar: Car = new Car(
      {
        id: '63c447122a23bfb21569a044', 
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      },
    );
    sinon.stub(Model, 'find').resolves([outputCar]);
        
    const service = new CarServices();
    const result = await service.find();
    
    expect(result).to.be.deep.equal([outputCar]);
  });
  it('Deveria retornar o carro cadastrado pelo ID com sucesso', async function () {
    const carByIdOutput: Car = new Car(
      {
        id: '63c447122a23bfb21569a044', 
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      },
    );
    sinon.stub(Model, 'find').resolves([carByIdOutput]);
          
    const service = new CarServices();
    const result = await service.findById('63c447122a23bfb21569a044');
      
    expect(result).to.be.deep.equal(carByIdOutput);
  });
  it(
    'Deveria retornar um erro caso o Id passado não esteja no formato mongo id', 
    async function () {
      sinon.stub(Model, 'find').resolves();
      
      try {
        const service = new CarServices();
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
        const service = new CarServices();
        await service.findById('63c447122a23bfb21569a044');
      } catch (error) { 
        expect((error as Error).message).to.be.equal(carNotFound);
      }
    },
  );
  it('Deveria retornar o carro com as infos atualizadas com sucesso', async function () {
    const inputCar: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    const outputCar: Car = new Car(
      {
        id: '63c447122a23bfb21569a044', 
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      },
    );

    sinon.stub(Model, 'findByIdAndUpdate').resolves(outputCar);
    const service = new CarServices();
    const result = await service.update('63c447122a23bfb21569a044', inputCar);

    expect(result).to.be.deep.equal(outputCar);
  });
  it(
    'Deveria retornar um erro no update caso o Id passado não esteja no formato mongo id', 
    async function () {
      const inputCar: ICar = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };
      sinon.stub(Model, 'findByIdAndUpdate').resolves();
      
      try {
        const service = new CarServices();
        await service.update('xxx', inputCar);
      } catch (error) { 
        expect((error as Error).message).to.be.equal(invalidMongoDB);
      }
    },
  );
  it(
    'Deveria retornar um erro no update caso o Id passado não seja encontrado no banco de dados', 
    async function () {
      const inputCar: ICar = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };
          
      sinon.stub(Model, 'findByIdAndUpdate').resolves();
      
      try {
        const service = new CarServices();
        await service.update('63c447122a23bfb21569a044', inputCar);
      } catch (error) { 
        expect((error as Error).message).to.be.equal(carNotFound);
      }
    },
  );
  //   it('Deveria detelar com sucesso', async function () {  
  //   });
  it(
    'Deveria retornar um erro no delete caso o Id passado não esteja no formato mongo id', 
    async function () {
      const outputCarDeleted = {
        deleteResult: 1, acknowledged: true, deletedCount: 1,
      };    
      sinon.stub(Model, 'deleteOne').resolves(outputCarDeleted);
      
      try {
        const service = new CarServices();
        await service.delete('xxx');
      } catch (error) { 
        expect((error as Error).message).to.be.equal(invalidMongoDB);
      }
    },
  );
  //   it(
  //     'Deveria retornar um erro no delete caso o Id passado não seja encontrado no banco de dados', 
  //     async function () {  
  //       const outputCarDeleted = {
  //         deleteResult: 1, acknowledged: true, deletedCount: 1,
  //       };       
  //       sinon.stub(Model, 'deleteOne').resolves(outputCarDeleted);
  //       try {
  //         const service = new CarServices();
  //         await service.delete('63c447122a23bfb21569a044');
  //       } catch (error) { 
  //         expect((error as Error).message).to.be.equal(carNotFound);
  //       } 
  //     },
  //   );
  afterEach(function () {
    sinon.restore();
  });
});