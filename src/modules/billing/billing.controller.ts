import { Controller, Post, Body } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller('billing')
export class BillingController {
  
  @Post('invoice')
  createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
    try {
      if (createInvoiceDto.monto < 0) {
        throw new Error('Monto no puede ser negativo');
      }
      
      const savedInvoice = {
        id: Math.random(),
        ...createInvoiceDto,
        status: 'Pendiente'
      };

      return {
        message: 'Factura creada',
        data: savedInvoice
      };
      
    } catch (error) {
      return {
        success: false,
        message: 'Ocurrió un error',
        error: error.message
      };
    }
  }
}
