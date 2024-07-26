import { Injectable } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from '../entities/page.entity';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  async saveUrl(url: string, title: string): Promise<number> {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const content = $('html').html();
      const page = this.pageRepository.create({ url, content, title });
      await this.pageRepository.save(page);

      return page.id;
    } catch (error) {
      throw new Error(`Failed to save the page.${error}`);
    }
  }

  async getPageById(id: number): Promise<Page> {
    return await this.pageRepository.findOneBy({ id });
  }

  async findAll(page = 1, pageSize = 10): Promise<[Page[], number]> {
    const skip = (page - 1) * pageSize;
    const [articles, total] = await this.pageRepository.findAndCount({
      take: pageSize,
      skip,
    });
    return [articles, total];
  }
}
