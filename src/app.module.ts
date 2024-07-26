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
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
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
