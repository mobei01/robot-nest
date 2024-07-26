import { Controller, Post, Get, Body, Query, Logger } from '@nestjs/common';
import { PageService } from '../services/page.service';
import { Page } from '../entities/page.entity';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post('saveArticle')
  async saveUrl(@Body() body: { url: string; title: string }): Promise<number> {
    Logger.log('saveUrl', body.url, body.title);
    return this.pageService.saveUrl(body.url, body.title);
  }

  @Get('getArticle')
  async getById(@Query('id') id: string): Promise<Page> {
    Logger.log('getById', id);
    const page = await this.pageService.getPageById(+id);
    return page;
  }

  @Get('getArticleList')
  async getArticles(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ): Promise<{ lists: Page[]; currentPage: number; total: number }> {
    const [articles, total] = await this.pageService.findAll(page, pageSize);
    return { lists: articles, currentPage: page, total };
  }
}
