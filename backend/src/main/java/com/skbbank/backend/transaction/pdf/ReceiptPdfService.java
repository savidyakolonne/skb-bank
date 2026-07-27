package com.skbbank.backend.transaction.pdf;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import com.skbbank.backend.common.exception.TransactionNotFoundException;
import com.skbbank.backend.transaction.Transaction;
import com.skbbank.backend.transaction.TransactionRepository;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;

@Service
public class ReceiptPdfService implements PdfService {

    private final TransactionRepository transactionRepository;

    public ReceiptPdfService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Override
    public ByteArrayOutputStream generateTransferReceipt(Long transactionId) {

        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(TransactionNotFoundException::new);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Document document = new Document();

        try {

            PdfWriter.getInstance(document, outputStream);

            document.open();

            Font titleFont = FontFactory.getFont(
                    FontFactory.HELVETICA_BOLD,
                    22,
                    Color.BLUE
            );

            Font headingFont = FontFactory.getFont(
                    FontFactory.HELVETICA_BOLD,
                    16
            );

            Font normalFont = FontFactory.getFont(
                    FontFactory.HELVETICA,
                    12
            );

            document.add(new Paragraph("SKB BANK", titleFont));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Transfer Receipt", headingFont));
            document.add(new Paragraph("------------------------------------------------------------"));
            document.add(new Paragraph("Receipt No : TRX-" + transaction.getId(), normalFont));
            document.add(new Paragraph("Date : " +
                    transaction.getCreatedAt().format(
                            DateTimeFormatter.ofPattern("dd MMM yyyy HH:mm")
                    ), normalFont));
            document.add(new Paragraph("------------------------------------------------------------"));

            document.add(new Paragraph(
                    "Customer : " +
                            transaction.getAccount().getUser().getName(),
                    normalFont
            ));

            document.add(new Paragraph(
                    "Username : " +
                            transaction.getAccount().getUser().getUsername(),
                    normalFont
            ));

            document.add(new Paragraph(
                    "Account Number : " +
                            transaction.getAccount().getAccountNumber(),
                    normalFont
            ));

            document.add(new Paragraph(
                    "Transaction Type : " +
                            transaction.getTransactionType(),
                    normalFont
            ));

            document.add(new Paragraph(
                    "Amount : Rs. " +
                            transaction.getAmount(),
                    normalFont
            ));

            document.add(new Paragraph(
                    "Destination Bank : " +
                            (transaction.getDestinationBank() == null
                                    ? "-"
                                    : transaction.getDestinationBank()),
                    normalFont
            ));

            document.add(new Paragraph(
                    "Remarks : " +
                            (transaction.getRemarks() == null
                                    ? "-"
                                    : transaction.getRemarks()),
                    normalFont
            ));

            document.add(new Paragraph("------------------------------------------------------------"));

            document.add(new Paragraph(
                    "Status : SUCCESSFUL",
                    headingFont
            ));

            document.add(new Paragraph(" "));
            document.add(new Paragraph(
                    "Thank you for banking with SKB Bank.",
                    normalFont
            ));

        } catch (DocumentException e) {
            throw new RuntimeException("Failed to generate receipt PDF", e);
        } finally {
            document.close();
        }

        return outputStream;
    }
}