// src/modules/e-sign/services/e-sign.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
// import * as fs from 'fs'; // Import the 'fs' module

@Injectable()
export class ESignService {
  private zohoApiBaseUrl = 'https://sign.zoho.com/api/v1'; // Update the base URL as per your Zoho Sign API

  async createESignTags(documentId: string, tags: any[]): Promise<any> {
    try {
      const response = await axios.post(
        `${this.zohoApiBaseUrl}/tags?document_id=${documentId}`,
        tags,
        {
          headers: {
            Authorization: `Bearer ${process.env.ZOHO_SIGN_API_TOKEN}`, // Use your API token here
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(`Error creating eSign tags: ${error.message}`);
    }
  }

  async submitForESign(documentId: string, recipients: any[]): Promise<any> {
    try {
      const response = await axios.post(
        `${this.zohoApiBaseUrl}/document/${documentId}/actions/sign`,
        { recipients }, // Update with your request payload
        {
          headers: {
            Authorization: `Bearer ${process.env.ZOHO_SIGN_API_TOKEN}`, // Use your API token here
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(`Error submitting for eSign: ${error.message}`);
    }
  }

  async signDocument(documentId: string, role: string): Promise<any> {
    try {
      // Implement your e-signing logic here for the specified role
      // This is where you can integrate with your e-signing library or service

      // For demonstration purposes, let's assume you are using Zoho Sign API
      const response = await axios.post(
        `${this.zohoApiBaseUrl}/document/${documentId}/actions/sign`,
        { recipients: [{ role }] }, // Replace with your request payload
        {
          headers: {
            Authorization: `Bearer ${process.env.ZOHO_SIGN_API_TOKEN}`, // Use your API token here
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(`Error signing the document: ${error.message}`);
    }
  }
}
