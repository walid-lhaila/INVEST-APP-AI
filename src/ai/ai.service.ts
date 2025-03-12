import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {
  private readonly apiKey = 'AIzaSyCBkdFQzsDOyHWKnjQD3qwRU9TSvhsqryo';
  private readonly apiUrl =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  async generateSuggestions(userInput: string): Promise<{ result: string }> {
    const prompt = `Based on the following input: "${userInput}", generate a response that includes:
    1. **Interests**
    2. **Services**: A short description of the company , focusing on what it offers and what it is looking for .
    Return the response in a single line JSON format like this: {"result": "Interests: [tags]. Services: [short description]."}`;

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 800,
            topP: 0.9,
            topK: 20,
          },
        },
        {
          headers: { 'Content-Type': 'application/json' },
          params: { key: this.apiKey },
        },
      );

      const generatedText =
        response.data.candidates[0].content.parts[0].text.trim();

      const jsonMatch = generatedText.match(/```json\s*({.*?})\s*```/s);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1]);
      }
      return JSON.parse(generatedText);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      throw new Error('API Error - Failed to parse response');
    }
  }

  async generateTagsAndCategories(
    description: string,
  ): Promise<{ tags: string[]; categories: string[] }> {
    const prompt = `Based on the following project description: "${description}", generate:
    1. **Tags**: A list of relevant tags (keywords) that describe the project.
    2. **Categories**: A list of relevant categories that the project belongs to.
    Return the response in JSON format like this: {"tags": ["tag1", "tag2"], "categories": ["category1", "category2"]}.`;

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 800,
            topP: 0.9,
            topK: 20,
          },
        },
        {
          headers: { 'Content-Type': 'application/json' },
          params: { key: this.apiKey },
        },
      );

      const generatedText =
        response.data.candidates[0].content.parts[0].text.trim();

      const jsonMatch = generatedText.match(/```json\s*({.*?})\s*```/s);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1]);
      }
      return JSON.parse(generatedText);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      throw new Error('API Error - Failed to parse response');
    }
  }
}
