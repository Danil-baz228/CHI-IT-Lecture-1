class Transport {
    ride() {
      console.log('Riding...');
    }
  
    stop() {
      console.log('Stopping...');
    }
  }
  

  class Car extends Transport {
    ride() {
      console.log('Car is riding...');
    }
  }
  
  class Bike extends Transport {
    ride() {
      console.log('Bike is riding...');
    }
  }
  

  class TransportFactory {
    static createTransport(type) {
      if (type === 'car') return new Car();
      if (type === 'bike') return new Bike();
      throw new Error('Unknown transport type');
    }
  }
  

  const car = TransportFactory.createTransport('car');
  car.ride();  
  car.stop();  
  
  const bike = TransportFactory.createTransport('bike');
  bike.ride();  
  bike.stop();  
  