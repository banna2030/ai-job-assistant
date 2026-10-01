package com.aijobassistant.aijobassistant.controller;

import com.aijobassistant.aijobassistant.dto.AiRequest;
import com.aijobassistant.aijobassistant.service.AiService;
import org.springframework.web.bind.annotation.*;

@RestController
public class AiController {
    private final AiService aiService;
   public AiController(AiService aiService){
        this.aiService=aiService;
    }
    @PostMapping("/ai")
    public String askAi(@RequestBody AiRequest request){
       return aiService.ask(request.message());
    }
}
