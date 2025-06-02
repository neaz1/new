import React from 'react';
import { Button } from './Button';
import { Printer } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { Delivery } from '../../types';

interface PrintButtonProps {
  delivery: Delivery;
}

export function PrintButton({ delivery }: PrintButtonProps) {
  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Generate print content
    const printContent = `
      <!DOCTYPE html>
      <html lang="ckb" dir="rtl">
        <head>
          <meta charset="UTF-8">
          <title>وەسڵی گەیاندن - ${delivery.trackingNumber}</title>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;700&display=swap" rel="stylesheet">
          <style>
            @media print {
              @page { 
                size: 80mm auto;
                margin: 0;
              }
              body { 
                font-family: 'Noto Sans Arabic', sans-serif;
                padding: 10px;
                margin: 0;
                width: 80mm;
                font-size: 12px;
              }
              .header { 
                text-align: center;
                margin-bottom: 20px;
                border-bottom: 1px dashed #000;
                padding-bottom: 10px;
              }
              .info-row { 
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
                padding-bottom: 4px;
              }
              .label { 
                font-weight: bold;
              }
              .value {
                text-align: left;
              }
              .footer { 
                text-align: center;
                margin-top: 20px;
                padding-top: 10px;
                border-top: 1px dashed #000;
                font-size: 10px;
              }
              .total {
                font-size: 14px;
                font-weight: bold;
                border-top: 2px solid #000;
                padding-top: 8px;
                margin-top: 8px;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2 style="margin: 0 0 5px 0;">گەیاندنی خێرا</h2>
            <p style="margin: 0;">ژمارەی تراکینگ: ${delivery.trackingNumber}</p>
            <p style="margin: 5px 0 0 0;">بەرواری چاپکردن: ${formatDate(new Date())}</p>
          </div>
          
          <div class="info-row">
            <span class="label">ناوی وەرگر:</span>
            <span class="value">${delivery.recipientName}</span>
          </div>
          
          <div class="info-row">
            <span class="label">ژمارەی مۆبایل ١:</span>
            <span class="value">${delivery.phone1}</span>
          </div>
          
          ${delivery.phone2 ? `
          <div class="info-row">
            <span class="label">ژمارەی مۆبایل ٢:</span>
            <span class="value">${delivery.phone2}</span>
          </div>
          ` : ''}
          
          <div class="info-row">
            <span class="label">شار:</span>
            <span class="value">${delivery.city}</span>
          </div>
          
          <div class="info-row">
            <span class="label">ناوچە:</span>
            <span class="value">${delivery.district}</span>
          </div>
          
          <div class="info-row">
            <span class="label">گەڕەک:</span>
            <span class="value">${delivery.neighborhood}</span>
          </div>
          
          <div class="info-row">
            <span class="label">ناونیشانی تەواو:</span>
            <span class="value">${delivery.fullAddress}</span>
          </div>
          
          <div class="info-row">
            <span class="label">نرخی گشتی:</span>
            <span class="value">${delivery.totalPrice} د.ع</span>
          </div>
          
          <div class="info-row">
            <span class="label">ئەگەری شکان:</span>
            <span class="value">${delivery.hasBreakageRisk ? 'بەڵێ' : 'نەخێر'}</span>
          </div>
          
          <div class="info-row">
            <span class="label">جۆری گەیاندن:</span>
            <span class="value">${delivery.deliveryType}</span>
          </div>
          
          <div class="footer">
            <p style="margin: 0;">سوپاس بۆ متمانەتان</p>
            <p style="margin: 5px 0 0 0;">گەیاندنی خێرا - ٢٤ کاتژمێر</p>
          </div>
        </body>
      </html>
    `;

    // Write content and print
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for fonts to load before printing
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      leftIcon={<Printer size={14} />}
      onClick={handlePrint}
    >
      چاپکردن
    </Button>
  );
}