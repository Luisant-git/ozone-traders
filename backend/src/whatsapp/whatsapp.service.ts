import { Injectable } from '@nestjs/common';
import axios from 'axios';
 
@Injectable()
export class WhatsappService {
  private readonly apiUrl = 'https://graph.facebook.com/v21.0';
  private readonly phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  private readonly accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
 
  constructor() {
    if (!this.phoneNumberId || !this.accessToken) {
      console.warn('WhatsApp configuration incomplete. Order status messages will not be sent.');
    }
  }
 
  async sendOrderConfirmation(order: any) {
    const phoneNumber = order.shippingAddress.mobile;
    const name = order.shippingAddress.fullName;
 
    try {
      const response = await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: phoneNumber,
          type: 'template',
          template: {
            name: 'order_status_en3',
            language: { code: 'en' },
            components: [
              {
                type: 'body',
                parameters: [
                  { type: 'text', text: name },
                  { type: 'text', text: `#ORD-${order.id}` },
                  { type: 'text', text: order.total },
                  { type: 'text', text: order.paymentMethod }
                ]
              }
            ]
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
 

 
      console.log(`WhatsApp message sent to ${phoneNumber}:`, response.data);
      return { success: true, messageId: response.data.messages[0].id };
    } catch (error) {
      console.error('WhatsApp API Error:', error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  }

  async sendOrderAccepted(order: any) {
    const phoneNumber = order.shippingAddress.mobile;
    const name = order.shippingAddress.fullName;

    try {
      const response = await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: phoneNumber,
          type: 'template',
          template: {
            name: 'order_ready_to_ship',
            language: { code: 'en' },
            components: [
              {
                type: 'body',
                parameters: [
                  { type: 'text', text: name },
                  { type: 'text', text: `#ORD-${order.id}` }
                ]
              }
            ]
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );



      console.log(`WhatsApp accepted message sent to ${phoneNumber}:`, response.data);
      return { success: true, messageId: response.data.messages[0].id };
    } catch (error) {
      console.error('WhatsApp API Error:', error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  }

  async sendOrderShipped(order: any, trackingInfo: { courier: string; trackingId: string; trackingUrl: string }, invoiceUrl: string) {
    const phoneNumber = order.shippingAddress.mobile;
    const name = order.shippingAddress.fullName;
 
    try {
      console.log('Original invoiceUrl received:', invoiceUrl);
      const invoiceFilename = invoiceUrl.includes('/') ? invoiceUrl.split('/').pop() : invoiceUrl;
      console.log('Extracted filename:', invoiceFilename);
      console.log('Sending to WhatsApp button parameter:', invoiceFilename);
      const response = await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: phoneNumber,
          type: 'template',
          template: {
            name: 'order_shipped_invoice_v4',
            language: { code: 'en' },
            components: [
              {
                type: 'body',
                parameters: [
                  { type: 'text', text: name },
                  { type: 'text', text: `#ORD-${order.id}` },
                  { type: 'text', text: trackingInfo.courier },
                  { type: 'text', text: trackingInfo.trackingId },
                  { type: 'text', text: trackingInfo.trackingUrl }
                ]
              },
              {
                type: 'button',
                sub_type: 'url',
                index: 0,
                parameters: [
                  { type: 'text', text: invoiceFilename }
                ]
              }
            ]
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
 

 
      console.log(`WhatsApp shipped message sent to ${phoneNumber}:`, response.data);
      console.log('Full request payload:', JSON.stringify({
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'template',
        template: {
          name: 'order_shipped_invoice_v1',
          language: { code: 'en' },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: name },
                { type: 'text', text: order.id.toString() },
                { type: 'text', text: trackingInfo.courier },
                { type: 'text', text: trackingInfo.trackingId },
                { type: 'text', text: trackingInfo.trackingUrl }
              ]
            },
            {
              type: 'button',
              sub_type: 'url',
              index: 0,
              parameters: [
                { type: 'text', text: invoiceFilename }
              ]
            }
          ]
        }
      }, null, 2));
      return { success: true, messageId: response.data.messages[0].id };
    } catch (error) {
      console.error('WhatsApp API Error:', error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  }

  async sendOrderDelivered(order: any, invoiceUrl: string) {
    const phoneNumber = order.shippingAddress.mobile;
    const name = order.shippingAddress.fullName;
 
    try {
      const response = await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: phoneNumber,
          type: 'template',
          template: {
            name: 'order_delivered_invoice',
            language: { code: 'en' },
            components: [
              {
                type: 'body',
                parameters: [
                  { type: 'text', text: name },
                  { type: 'text', text: `#ORD-${order.id}` },
                  { type: 'text', text: order.total },
                  { type: 'text', text: order.paymentMethod },
                  { type: 'text', text: invoiceUrl }
                ]
              }
            ]
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
 

 
      console.log(`WhatsApp delivered message sent to ${phoneNumber}:`, response.data);
      return { success: true, messageId: response.data.messages[0].id };
    } catch (error) {
      console.error('WhatsApp API Error:', error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  }

}