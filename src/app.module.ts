import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Page } from './entities/page.entity';

import { PageController } from './controllers/page.controller';
import { PageService } from './services/page.service';

import { WechatController } from './controllers/wechat.robot.controller';
import { WechatRobotService } from './services/wechat.robot.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '8.138.123.250',
      port: 3306,
      username: 'robot',
      password: 'root123456',
      database: 'robot',
      entities: [Page],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Page]),
  ],
  controllers: [AppController, PageController, WechatController],
  providers: [AppService, PageService, WechatRobotService],
})
export class AppModule {}
