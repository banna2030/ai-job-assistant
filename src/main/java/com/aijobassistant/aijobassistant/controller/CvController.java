package com.aijobassistant.aijobassistant.controller;

import com.aijobassistant.aijobassistant.dto.CvAnalysisRequest;
import com.aijobassistant.aijobassistant.dto.CvAnalysisResponse;
import com.aijobassistant.aijobassistant.service.AiService;
import com.aijobassistant.aijobassistant.service.PdfService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.io.IOException;

@RestController
@RequestMapping("/api/cv")
@CrossOrigin(origins = "http://localhost:3000")
public class CvController {
    private final AiService aiService;
    private final PdfService pdfService;
    public CvController(AiService aiService,PdfService pdfService){
        this.aiService=aiService;
        this.pdfService=pdfService;
    }

    @PostMapping("/analyze")
    public CvAnalysisResponse analyzeCv(
            @RequestParam("cv")MultipartFile cvFile,
            @RequestParam("jobDescription") String jobDescription) throws IOException {
    String cvText= pdfService.extractText(cvFile);
    return  aiService.analyzeCv(cvText,jobDescription);
    }
}
