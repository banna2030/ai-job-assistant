package com.aijobassistant.aijobassistant.service;

import com.aijobassistant.aijobassistant.dto.CvAnalysisResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiService {
    private final ChatClient  chatClient;
    public AiService(ChatClient.Builder chatClientBuilder){

        this.chatClient=chatClientBuilder.build();
    }
    public String ask(String message){
        return chatClient
                .prompt()
                .user(message)
                .call()
                .content();
    }
    public CvAnalysisResponse analyzeCv(String cv, String jobDescription){
        String prompt= """
                Compare the following CV with the job description.
                CV:
                %s
                
                Job Description:
                %s
                
                
                Analyze:
                -Match score from 0 to 100
                -matching skills
                -missing skills
                -recommendations to improve the CV
                """.formatted(cv,jobDescription);
        return chatClient
                .prompt()
                .user(prompt)
                .call()
                .entity(CvAnalysisResponse.class);

    }
}
