import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service';

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) {}

  async getHello() {
    try {
      await this.producerService.produce({
        topic: 'test-topic',
        messages: [{ value: 'Hello World!' }],
      });

      console.log('Message produced successfully.');
    } catch (error) {
      console.error('Error producing message:', error);
    }

    return 'Hello World!';
  }
}
