// src/services/wechat-robot.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { wechatArticleDto } from '../dots/wechat-message.dto';

@Injectable()
export class WechatRobotService {
  private readonly webhookUrl =
    'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=6bbdfff6-900b-41ec-8777-f76201622ab0';

  async sendNewsMessage(wechatArticleDto: wechatArticleDto): Promise<any> {
    const defaultUrl =
      'https://img.zcool.cn/community/016c325543065e0000019ae909489a.jpg@3000w_1l_0o_100sh.jpg';
    const defaultText = '代码创造未来，学习永无止境';
    const newsPayload = {
      msgtype: 'news',
      news: {
        articles: [
          {
            title: wechatArticleDto.title,
            description: wechatArticleDto.description || defaultText,
            url: wechatArticleDto.url,
            picurl: wechatArticleDto.picurl || defaultUrl,
          },
        ],
      },
    };
    return axios.post(this.webhookUrl, newsPayload);
  }
}
