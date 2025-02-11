const model = require('../config/geminiConfig'); 

const assessment = async (req, res) => {
    try {
        const { prompt } = req.body;
        let fullPrompt = `Please generate a detailed career path suggestion based on the user's responses according to Indian standards:

        These are the questions : 
 { question: "What excites you the most?", options: ["Technology", "Leadership", "Problem-solving", "Teamwork"] },
    { question: "What do you prioritize in your career?", options: ["High Salary", "Job Satisfaction", "Growth Opportunities", "Work-Life Balance"] },
    { question: "How do you prefer working?", options: ["Independently", "In a Team", "Leading a Team", "In a Flexible Environment"] },
    { question: "What is your preferred work environment?", options: ["Corporate Office", "Startup", "Remote Work", "Outdoor/Field Work"] },
    { question: "What motivates you the most?", options: ["Recognition", "Continuous Learning", "Achieving Goals", "Helping Others"] },
    { question: "Which of these do you enjoy the most?", options: ["Analyzing Data", "Creating Designs", "Writing Code", "Managing People"] },
    { question: "What type of problems do you like solving?", options: ["Technical Challenges", "Creative Problems", "Human/Behavioral Issues", "Strategic Issues"] },
    { question: "How do you handle tasks?", options: ["Plan and Execute", "Adapt as I Go", "Delegate to Others", "Work on the Fly"] },
    { question: "What kind of projects excite you?", options: ["Technical", "Creative", "Strategic", "Service-Oriented"] },
    { question: "How do you measure success?", options: ["Achievements", "Impact Created", "Happiness", "Growth"] },
    { question: "What kind of training appeals to you?", options: ["Technical Skills", "Leadership Skills", "Creative Skills", "Behavioral Skills"] },
    { question: "What kind of goals do you set?", options: ["Short-Term Goals", "Long-Term Goals", "Flexible Goals", "Specific Milestones"] },
    { question: "What describes your decision-making style?", options: ["Data-Driven", "Intuitive", "Collaborative", "Strategic"] },
    { question: "How do you approach challenges?", options: ["Logically", "Creatively", "Emotionally", "With a Team"] },
    { question: "What type of skills do you want to develop?", options: ["Technical", "Creative", "Leadership", "Communication"] },
    { question: "How do you prefer communicating?", options: ["Emails/Chats", "Face-to-Face", "Through Presentations", "Group Discussions"] },
    { question: "What inspires you?", options: ["Innovative Ideas", "Successful Leaders", "Positive Impact", "Team Achievements"] },
    { question: "How do you approach learning?", options: ["Self-Study", "Workshops", "Mentorship", "Group Activities"] },
    { question: "Which role do you naturally take in a group?", options: ["Leader", "Supporter", "Innovator", "Coordinator"] },
    { question: "What’s your ideal level of responsibility?", options: ["Individual Contributor", "Team Member", "Team Leader", "Manager"] },
    { question: "Which industry excites you the most?", options: ["Technology", "Healthcare", "Finance", "Creative Arts"] },
    { question: "How do you handle feedback?", options: ["Seek Regular Feedback", "Process it Internally", "Discuss it Openly", "Use it for Growth"] },
    { question: "What’s your preferred way of working?", options: ["Structured", "Flexible", "Collaborative", "Goal-Oriented"] },
    { question: "What’s your long-term aspiration?", options: ["Master a Skill", "Lead a Team", "Start a Business", "Make a Difference"] },
    { question: "How do you balance personal and professional life?", options: ["Set Clear Boundaries", "Blend Work and Life", "Prioritize Flexibility", "Focus on Work When Needed"] }


User's Responses: ${prompt}


The user's profile includes the following factors:
- Skills and strengths: Problem-solving, programming languages, data structures, communication
- Job preferences: Enjoys working in a team, prefers analytical tasks, comfortable with deadlines
- Education: Currently pursuing a Bachelor's in Computer Science
- Experience: Internships in software development, familiar with Java and Python

The output should be structured into the following segments:

1. Career Overview: A brief description of the career path.
2. Skills & Strengths: A list of key skills that match the career.
3. Job Roles: A list of specific roles within the career path that match the user's profile.
4. Growth Potential: Include salary range, job market trends, and career growth projections.
5. Top Companies: A list of well-known companies in the industry.
6. Education Pathways: Recommended degrees or certifications to advance in the field.

The result should be provided in a structured JSON format as shown below:

{
  "career_path": {
    "name": "Software Engineering",
    "overview": "Software engineering involves designing, developing, and maintaining software systems.",
    "skills_and_strengths": ["Problem-solving", "Programming languages", "Data structures", "Communication"],
    "job_roles": [
      {"role": "Frontend Developer", "description": "Develops user-facing applications."},
      {"role": "Backend Developer", "description": "Builds the server-side logic and databases."}
    ],
    "growth_potential": {
      "salary_range": "$70,000 - $120,000",
      "job_market": "High demand in the tech industry.",
      "growth": "Expected to grow by 22% in the next decade."
    },
    "top_companies": ["Google", "Amazon", "Microsoft", "Apple"],
    "education_pathways": [
      {"degree": "Bachelor's in Computer Science", "duration": "4 years"},
      {"certification": "Certified Software Developer", "duration": "1 year"}
    ]
  }
}

Ensure the response adheres strictly to this format for easy parsing. Provide clear and concise recommendations based on the user's profile and responses.`;

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
            message: "Career insights generated successfully",
            data: structuredResponse
        });

    } catch (error) {
        console.error("Error in career chat:", error);
        res.status(500).json({ error: error.message || "Failed to generate response" });
    }
};

module.exports = { assessment };
