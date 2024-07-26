import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WechatRobotService } from '../services/wechat.robot.service';
import { wechatArticleDto } from '../dots/wechat-message.dto';

@Controller('wechat')
export class WechatController {
  constructor(private readonly wechatRobotService: WechatRobotService) {}

  @Post('sendNews')
  @UsePipes(new ValidationPipe())
  async sendNewsMessage(@Body() newsMessage: wechatArticleDto) {
    // console.log('11111111', newsMessage);
    try {
      await this.wechatRobotService.sendNewsMessage(newsMessage);
      return { success: true, message: '消息发送成功' };
    } catch (error) {
      return { success: false, message: '消息发送失败' };
    }
  }
}
