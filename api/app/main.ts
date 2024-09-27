import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { SerializationInterceptor } from './common/interceptors/serialization.interceptor';

import * as momentTimezone from 'moment-timezone';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);

	app.enableCors();
	app.setGlobalPrefix('api');
	app.useGlobalInterceptors(new SerializationInterceptor());
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidUnknownValues: true,
			stopAtFirstError: true,
			validateCustomDecorators: true,
		}),
	);

	Date.prototype.toJSON = () =>
		momentTimezone(this)
			.tz('America/Sao_Paulo')
			.format('YYYY-MM-DD HH:mm:ss.SSS');

	const port = configService.get('PORT');

	await app.listen(port);
}
bootstrap();
