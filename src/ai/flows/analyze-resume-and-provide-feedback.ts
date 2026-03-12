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
    2.  **Role Consistency**: Always identify the candidate as a "Freelancer working with SYNC TECH Solutions" in professional titles.
    3.  **Target**: The provided job description is the target. Analyze it for key skills, keywords, and qualifications.
    4.  **Output Requirements**:
        - **LaTeX Resume**: Generate full, compile-ready LaTeX code based EXACTLY on the RESUME TEMPLATE provided below. Ensure it is ATS-optimized with a score-potential of 100+. Use the keywords found in the Job Description naturally.
        - **LaTeX Cover Letter**: Generate full, compile-ready LaTeX code based EXACTLY on the COVER LETTER TEMPLATE provided below. Replace placeholders with tailored content.
        - **Reach-out Email**: Write a professional reach-out message for LinkedIn or Email.
    5.  **Honesty**: Do not lie. Every skill in the output must have a basis in the source content.

    Candidate Information (Source of Truth):
    ${resumeContent}

    Job Description (Target):
    ${input.jobDescription}

    == RESUME TEMPLATE ==
    \\documentclass[10pt, a4paper]{article}
    \\usepackage[T1]{fontenc}
    \\usepackage{mathptmx}
    \\usepackage[a4paper, top=0.5in, bottom=0.5in, left=0.5in, right=0.5in]{geometry}
    \\usepackage{titlesec}
    \\usepackage{enumitem}
    \\usepackage{hyperref}
    \\pagestyle{empty}
    \\setlength{\\parindent}{0pt}
    \\hypersetup{colorlinks=true, linkcolor=black, filecolor=black, urlcolor=black}
    \\titleformat{\\section}{\\vspace{-5pt}\\raggedright\\large\\bfseries\\uppercase}{}{0em}{}[\\titlerule]
    \\titlespacing*{\\section}{0pt}{10pt}{5pt}
    \\setlist[itemize]{noitemsep, leftmargin=1.5em, topsep=2pt, parsep=2pt}
    \\newcommand{\\experienceItem}[4]{\\vspace{4pt}\\textbf{#1} \\hfill #2 \\\\ \\textit{#3} \\hfill \\textit{#4} \\\\}
    \\begin{document}
    \\begin{center}
        {\\Huge \\textbf{SHERAZ HUSSAIN}} \\\\
        \\vspace{4pt}
        Dublin, Ireland $|$ +353 8X XXX XXXX $|$ \\href{mailto:sheraz@synctech.ie}{sheraz@synctech.ie} \\\\
        \\href{https://linkedin.com/in/sherazhussain546}{linkedin.com/in/sherazhussain546} $|$ \\href{https://github.com/SherazHussain546}{github.com/SherazHussain546}
    \\end{center}
    \\section{Professional Summary}
    [Generate a 3-4 line summary focusing on SYNC TECH Solutions and relevant JD keywords]
    \\section{Technical Skills}
    \\begin{itemize}
        \\item \\textbf{Languages:} [List relevant from source]
        \\item \\textbf{Frameworks/Tools:} [List relevant from source]
        \\item \\textbf{Cloud \\& DevOps:} [List relevant from source]
        \\item \\textbf{Databases:} [List relevant from source]
    \\end{itemize}
    \\section{Professional Experience}
    \\experienceItem{SYNC TECH Solutions}{Remote/Dublin}{Freelancer working with SYNC TECH Solutions}{Aug 2025 -- Present}
    \\begin{itemize}
        \\item [Point 1 based on source + JD keywords]
        \\item [Point 2 based on source + JD keywords]
    \\end{itemize}
    [Include other experiences from source using \\experienceItem]
    \\section{Technical Projects}
    \\textbf{[Project Name]} $|$ \\textit{Tech Stack: [Techs]} \\hfill \\href{[Link]}{Project Link}
    \\begin{itemize}
        \\item [Key accomplishment based on source]
    \\end{itemize}
    \\section{Education}
    \\textbf{Dublin Business School} \\hfill Dublin, Ireland \\\\
    Bachelor of Science in Computing (First Class Honors) $|$ GPA: 4.0/4.0 \\hfill Sept 2021 -- April 2025
    \\section{Certifications}
    \\begin{itemize}
        \\item [List certifications from source]
    \\end{itemize}
    \\end{document}

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
