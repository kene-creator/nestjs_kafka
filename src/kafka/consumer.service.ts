import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
  });
  private readonly consumers: Consumer[] = [];

  async consume(topics: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    try {
      const consumer = this.kafka.consumer({ groupId: 'nestjs' });
      await consumer.connect();
      await consumer.subscribe(topics);
      await consumer.run(config);
      this.consumers.push(consumer);
    } catch (error) {
      console.error('Error setting up Kafka consumer:', error);
    }
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
