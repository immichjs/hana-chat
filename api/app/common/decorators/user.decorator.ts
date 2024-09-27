import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export type UserDataAuthenticated = 'sub' | 'email' | 'iss' | 'exp' | 'iat';

export const UserAuthenticated = createParamDecorator(
	(data: UserDataAuthenticated, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();

		if (data) {
			return request.user[data];
		}

		return request.user;
	},
);
