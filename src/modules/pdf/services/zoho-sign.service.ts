// zoho-sign.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ZohoSignService {
  private zohoApiBaseUrl = 'https://api.zoho.com/sign/v1';

  async addESignTags(
    pdfData: any,
    role1: string,
    role2: string,
  ): Promise<void> {
    try {
      // Use the pdfData, role1, and role2 to construct the request data
      const requestData = {
        document_id: pdfData.documentId,
        tags: [
          {
            role: role1,
            // Add other tag properties as needed
          },
          {
            role: role2,
            // Add other tag properties as needed
          },
        ],
      };

      await axios.post(`${this.zohoApiBaseUrl}/tags`, requestData, {
        headers: {
          Authorization: `Bearer ${process.env.ZOHO_API_TOKEN}`,
        },
      });
    } catch (error) {
      throw new Error(`Error adding eSign tags: ${error.message}`);
    }
  }

  async forwardDocumentToRole3(
    eSignedDocument: any,
    recipientEmail: string,
  ): Promise<any> {
    try {
      // Implement code to forward the document to Role 3 using the Zoho Sign API
      const zohoSignEndpoint = 'https://api.zoho.com/sign/v1/forward';

      const data = {
        document: eSignedDocument,
        recipientEmail, // Replace with Role 3's email
      };

      const response = await axios.post(zohoSignEndpoint, data, {
        headers: {
          Authorization: `Bearer ${process.env.ZOHO_API_TOKEN}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(
        `Error forwarding the document to Role 3: ${error.message}`,
      );
    }
  }
}
