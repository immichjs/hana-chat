import { plainToInstance } from 'class-transformer';
import {
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	validateSync,
} from 'class-validator';

import { Environment } from '../enums/environment.enum';

class EnvironmentVariables {
	@IsEnum(Environment)
	NODE_ENV: Environment;

	@IsNumber()
	@IsNotEmpty()
	PORT: number;

	@IsString()
	@IsNotEmpty()
	JWT_SECRET: string;

	@IsString()
	@IsNotEmpty()
	MONGO_URI: string;

	@IsOptional()
	@IsString()
	REDIS_HOST: string;

	@IsOptional()
	@IsNumber()
	REDIS_PORT: number;

	@IsString()
	@IsOptional()
	REDIS_USERNAME: string;

	@IsString()
	@IsOptional()
	REDIS_PASSWORD: string;
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true,
	});
	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false,
	});

	let errorMessage = errors
		.map((message) => message.constraints[Object.keys(message.constraints)[0]])
		.join('\n');

	const COLOR = {
		reset: '\x1b[0m',
		bright: '\x1b[1m',
		fgRed: '\x1b[31m',
	};

	errorMessage = `${COLOR.fgRed}${COLOR.bright}${errorMessage}${COLOR.reset}`;

	if (errors.length > 0) {
		throw new Error(errorMessage);
	}

	return validatedConfig;
}
