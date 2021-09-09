import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  const today = new Date();
  const date = `${today.getDate()}.${today.getMonth()+1}.${today.getFullYear()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

  await app.listen(PORT, () =>
    console.log(`Server start (${date} ${time}) at port = ${PORT}`),
  );
}

start();