package com.aijobassistant.aijobassistant.dto;

import java.util.List;

public record CvAnalysisResponse(
        int matchScore,
        List<String> matchingSkills,
        List<String> missingSkills,
        List<String> recommendations
) {

}
