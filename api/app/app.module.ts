import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ChatModule } from './modules/chat/chat.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { NotificationService } from './modules/notification/notification.service';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
	imports: [ConfigModule.forRoot(), DatabaseModule, ChatModule, UserModule, NotificationModule],
	providers: [NotificationService],
})
export class AppModule {}
