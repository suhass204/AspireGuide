const model = require('../config/geminiConfig'); 

const swot = async (req, res) => {
    try {
        const { strengths, weaknesses, opportunities, threats, fieldOfInterest } = req.body;
        let fullPrompt = `You are an expert consultant specializing in SWOT analysis. Based on the inputs provided, generate detailed and actionable insights for each section (Strengths, Weaknesses, Opportunities, Threats) and align them with the given field of interest. Focus on providing practical steps for the following:

1. How to maximize and further enhance strengths.
2. How to systematically address weaknesses and convert them into strengths.
3. How to capitalize on opportunities effectively.
4. How to mitigate and overcome threats.

Inputs:
- Strengths: ${strengths}
- Weaknesses: ${weaknesses}
- Opportunities: ${opportunities}
- Threats: ${threats}
- Field of Interest: ${fieldOfInterest}

Output:
Return the results as a structured JSON object with the following keys and this is the format it should not have extra sub keys for opportunities or threats:
- "strengths": {
    "enhancements": ["Steps to further enhance strengths"],
    "applications": ["Ways to apply strengths effectively"]
  },
- "weaknesses": {
    "conversions": ["Steps to convert weaknesses into strengths"],
    "actions": ["Immediate actions to minimize the impact of weaknesses"]
  },
- "opportunities": {
             "suggestions": ["Suggestions to capitalize on opportunities effectively"]
    },
- "threats":{
"strategies": ["Strategies to mitigate and overcome threats"]
    },
- "summary": "A cohesive strategy combining strengths, weaknesses, opportunities, and threats for the field of interest."
`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = await response.text();

        
        const cleanedText = text
            .replace(/```json/g, '')  
            .replace(/```/g, '')      
            .trim();                  

        
        let structuredResponse;
        try {
            structuredResponse = JSON.parse(cleanedText);
        } catch (error) {
            console.error("Error parsing AI response:", error);
            structuredResponse = {
                error: "Failed to parse AI response. Please try again."
            };
        }

        
        res.json({
            message: "swot analysis sucessfully done",
            data: structuredResponse
        });

    } catch (error) {
        console.error("Error in career chat:", error);
        res.status(500).json({ error: error.message || "Failed to generate response" });
    }
};

module.exports = { swot };
