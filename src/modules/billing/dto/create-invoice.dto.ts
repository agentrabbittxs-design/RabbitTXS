export class CreateInvoiceDto {
    // Mal: Falta @IsNumber(), @IsString(), etc.
    monto: number;
    cliente: string;
}
