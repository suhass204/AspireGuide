const model = require('../config/geminiConfig'); 
const cleanResponse = (response) => {
    return response
        .replace(/[\n*]/g, '')  
        .replace(/\s+/g, ' ')   
        .trim();                
};

const careerChat = async (req, res) => {
    try {
        
        const { prompt, category } = req.body;
        let fullPrompt;

        
        switch (category) {
            case 'Career Advice':
                fullPrompt = `You are AI based career counseling chatbot, Provide career advice for ${prompt} with a focus on clarity and actionable steps. Avoid unnecessary formatting, and keep the response direct and to the point.`;
                break;
            case 'Skill Development':
                fullPrompt = `Suggest essential skills, learning resources, and projects to excel in ${prompt}. Keep the response concise and clean, avoiding unnecessary formatting or symbols.`;
                break;
            case 'Mentorship':
                fullPrompt = `Offer practical advice for finding mentors, networking, and growing professionally in ${prompt}. Ensure the response is clear and easy to understand.`;
                break;
            default:
                fullPrompt = `Share key insights about ${prompt} in a clean and concise manner. Avoid extra characters or formatting, and keep the response focused on the essential details`;
        }

        
        const result = await model.generateContent(fullPrompt);
        const response=await result.response;
        const  text=await response.text();
        const cleanedText = cleanResponse(text);


        
        res.json(cleanedText); 

    } catch (error) {
        
        console.error("Error in career chat:", error);
        res.status(500).json({ error: error.message || "Failed to generate response" });
    }
};

module.exports = { careerChat };
