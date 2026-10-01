package com.aijobassistant.aijobassistant.controller;

import com.aijobassistant.aijobassistant.service.PdfService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class PdfController {
    private final PdfService pdfService;
    public PdfController(PdfService pdfService){
        this.pdfService=pdfService;

    }
    @PostMapping("/api/pdf/extract")
    public String extractPdf(@RequestParam("file")MultipartFile file) throws IOException{
        return pdfService.extractText(file);
    }
}
