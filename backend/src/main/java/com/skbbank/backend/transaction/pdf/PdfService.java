package com.skbbank.backend.transaction.pdf;

import java.io.ByteArrayOutputStream;

public interface PdfService {

    ByteArrayOutputStream generateTransferReceipt(Long transactionId);
}
