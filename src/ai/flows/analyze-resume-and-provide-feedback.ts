'use server';
/**
 * @fileOverview A resume analyzer AI agent that compares a resume against a job description.
 *
 * - analyzeResumeAndProvideFeedback - A function that handles the resume analysis process.
 * - AnalyzeResumeAndProvideFeedbackInput - The input type for the analyzeResumeAndprovideFeedback function.
 * - AnalyzeResumeAndProvideFeedbackOutput - The return type for the analyzeResumeAndProvideFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getPortfolioContent } from '@/lib/portfolio-content';

const AnalyzeResumeAndProvideFeedbackInputSchema = z.object({
  jobDescription: z.string().describe('The job description to compare the resume against.'),
});
export type AnalyzeResumeAndProvideFeedbackInput = z.infer<typeof AnalyzeResumeAndProvideFeedbackInputSchema>;

const AnalyzeResumeAndProvideFeedbackOutputSchema = z.object({
  latexResume: z.string().describe('The full, ATS-optimized resume in LaTeX code.'),
  latexCoverLetter: z.string().describe('A tailored cover letter in LaTeX code using the specified template.'),
  reachOutEmail: z.object({
    subject: z.string().describe('The subject line for the email.'),
    body: z.string().describe('The body of the reach-out email.'),
  }).describe('A professional reach-out email for the hiring manager.'),
  error: z.string().optional().describe('An error message if the analysis failed.'),
});
export type AnalyzeResumeAndProvideFeedbackOutput = z.infer<typeof AnalyzeResumeAndProvideFeedbackOutputSchema>;

export async function analyzeResumeAndProvideFeedback(
  input: AnalyzeResumeAndProvideFeedbackInput
): Promise<AnalyzeResumeAndProvideFeedbackOutput> {
  return analyzeResumeAndProvideFeedbackFlow(input);
}

const analyzeResumeAndProvideFeedbackFlow = ai.defineFlow(
  {
    name: 'analyzeResumeAndProvideFeedbackFlow',
    inputSchema: AnalyzeResumeAndProvideFeedbackInputSchema,
    outputSchema: AnalyzeResumeAndProvideFeedbackOutputSchema,
  },
  async (input) => {
    try {
      const resumeContent = getPortfolioContent();
      const {output} = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: `You are an expert resume writer and career coach specializing in high-performance ATS optimization. Your task is to generate a complete application package (Resume, Cover Letter, and Reach-out Email) tailored perfectly for a specific job description.

    You must follow these rules strictly:
    1.  **Source of Truth**: The provided portfolio content is the ONLY source of facts about the candidate (Sheraz Hussain). You are forbidden from inventing, exaggerating, or fabricating any information.
    2.  **Target**: The provided job description is the target. Analyze it for key skills, keywords, and qualifications.
    3.  **Output Requirements**:
        - **LaTeX Resume**: Generate full, compile-ready LaTeX code for a professional resume. It MUST be ATS-optimized with a score-potential of 100+. Use standard LaTeX classes like 'article' and packages like 'hyperref', 'geometry', and 'enumitem'. Ensure sections (Experience, Projects, Education, Certifications) are clearly defined. Highlight the role as a "Freelancer working with SYNC TECH Solutions".
        - **LaTeX Cover Letter**: Generate full, compile-ready LaTeX code based EXACTLY on the template provided below. Replace all bracketed placeholders (e.g., [Job Title], [Company Name], [X years]) with tailored content derived from the candidate's portfolio and the job description. Ensure the tone is professional and persuasive.
        - **Reach-out Email**: Write a professional LinkedIn or Email reach-out message to the hiring manager. Include a compelling subject line and a concise body.
    4.  **Honesty**: Do not lie. Every skill in the output must have a basis in the source content.

    Candidate Information (Source of Truth):
    ${resumeContent}

    Job Description (Target):
    ${input.jobDescription}

    == COVER LETTER TEMPLATE ==
    \\documentclass[11pt,a4paper]{article}
    \\usepackage[utf8]{inputenc}
    \\usepackage[T1]{fontenc}
    \\usepackage{lmodern}
    \\usepackage[margin=1in]{geometry}
    \\usepackage{hyperref}
    \\usepackage{xcolor}
    \\pagestyle{empty}
    \\setlength{\\parindent}{0pt}
    \\setlength{\\parskip}{10pt}
    \\definecolor{darkblue}{RGB}{0,0,139}
    \\hypersetup{colorlinks=true, urlcolor=darkblue}
    \\begin{document}
    \\begin{center}
        \\textbf{\\Large SHERAZ HUSSAIN}\\\\
        \\vspace{4pt}
        \\small
        +353 8X XXX XXXX $|$ 
        \\href{mailto:sheraz@synctech.ie}{sheraz@synctech.ie} $|$ 
        \\href{https://linkedin.com/in/sherazhussain546}{linkedin.com/in/sherazhussain546} $|$
        Dublin, Ireland
    \\end{center}
    \\vspace{20pt}
    \\today
    \\vspace{10pt}
    Hiring Manager's Name\\\\
    Title\\\\
    Company Name\\\\
    City, State
    \\vspace{10pt}
    Dear [Hiring Manager's Name] / Dear Hiring Manager,
    I am writing to express my strong interest in the [Job Title] position at [Company Name], as advertised on [where you found the posting]. With [X years] of experience in [your field] and a proven track record of [key achievement or skill], I am confident that my skills and passion align perfectly with the requirements of this role and the innovative work being done at [Company Name].
    In my current role as Freelancer at SYNC TECH Solutions, I have successfully [describe major achievement or responsibility that relates to the job posting]. For example, I [specific accomplishment with measurable results]. This experience has equipped me with strong expertise in [relevant skills from job description], which I understand are critical for success in the [Job Title] position.
    My technical proficiency spans [list relevant technologies/skills from the job posting], and I have consistently demonstrated the ability to deliver high-quality solutions under tight deadlines. At [Previous Role/Project], I [another relevant achievement with quantifiable results]. Additionally, I [mention any relevant certifications, education, or specialized training]. These experiences have not only strengthened my technical capabilities but also honed my ability to collaborate effectively with cross-functional teams and communicate complex concepts to diverse stakeholders.
    What particularly excites me about [Company Name] is [specific reason related to the company's mission, products, culture, or recent achievements]. I have followed [Company Name]'s work on [specific project, product, or initiative], and I am impressed by [something specific that resonates with you]. I am eager to contribute to [specific team or project mentioned in job posting] and believe that my background in [relevant area] would enable me to make meaningful contributions from day one.
    Beyond my technical skills, I bring strong [soft skills like leadership, communication, problem-solving] abilities and a passion for continuous learning. I am particularly drawn to environments that value innovation and collaboration, and I thrive in settings where I can both contribute my expertise and learn from talented colleagues. I am confident that my combination of technical expertise, proven results, and enthusiasm for [company's industry/mission] makes me an excellent fit for your team.
    I would welcome the opportunity to discuss how my experience and skills can contribute to the continued success of [Company Name]. I am available for an interview at your convenience and can be reached at [+353 8X XXX XXXX] or [sheraz@synctech.ie]. Thank you for considering my application. I look forward to the possibility of contributing to your team and am excited about the opportunity to bring my skills and passion to [Company Name].
    Sincerely,
    \\vspace{30pt}
    SHERAZ HUSSAIN
    \\vspace{10pt}
    \\small{Enclosure: Resume}
    \\end{document}

    Now, generate the full application package.
    `,
        output: {
          schema: AnalyzeResumeAndProvideFeedbackOutputSchema,
        }
      });
      
      if (!output) {
        return {
            latexResume: '',
            latexCoverLetter: '',
            reachOutEmail: { subject: '', body: '' },
            error: "The AI model failed to return a valid response. Please try again."
        }
      }
      return output;
    } catch (e: any) {
        console.error(e);
        return {
            latexResume: '',
            latexCoverLetter: '',
            reachOutEmail: { subject: '', body: '' },
            error: "The AI model could not be reached. Please verify your configuration."
        }
    }
  }
);
