import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ESignService {
  private zohoApiBaseUrl = 'https://api.zoho.com/sign/v1';

  async createESignTags(documentId: string, tags: any[]): Promise<any> {
    try {
      const response = await axios.post(
        `${this.zohoApiBaseUrl}/tags?document_id=${documentId}`,
        { tags }, // Send tags as an object
        {
          headers: {
            Authorization: `Bearer ${process.env.ZOHO_API_TOKEN}`, // Use your API key here
            'Content-Type': 'application/json', // Set content type to JSON
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(`Error creating eSign tags: ${error.message}`);
    }
  }
}
