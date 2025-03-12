import { Controller } from '@nestjs/common';
import { AiService } from './ai.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @MessagePattern('generate_suggestions')
  async getSuggestions(data: { input: string }) {
    const { input } = data;
    return this.aiService.generateSuggestions(input);
  }

  @MessagePattern('generate-tags-categories')
  async getTagsAndCategories(data: { description: string }) {
    const { description } = data;
    return this.aiService.generateTagsAndCategories(description);
  }
}
