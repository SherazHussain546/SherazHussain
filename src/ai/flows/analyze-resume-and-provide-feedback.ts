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
  jobDescription: z.string().min(100, 'Job description must be at least 100 characters.'),
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

/**
 * Analyzes a resume against a job description and provides feedback.
 * Uses a Genkit flow to generate ATS-optimized application assets.
 */
export async function analyzeResumeAndProvideFeedback(
  input: AnalyzeResumeAndProvideFeedbackInput
): Promise<AnalyzeResumeAndProvideFeedbackOutput> {
  try {
    return await analyzeResumeAndProvideFeedbackFlow(input);
  } catch (e: any) {
    return {
      latexResume: '',
      latexCoverLetter: '',
      reachOutEmail: { subject: '', body: '' },
      error: `Generation Failed: ${e.message || 'The AI model could not be reached. Please verify your configuration and try again.'}`,
    };
  }
}

const analyzeResumeAndProvideFeedbackFlow = ai.defineFlow(
  {
    name: 'analyzeResumeAndProvideFeedbackFlow',
    inputSchema: AnalyzeResumeAndProvideFeedbackInputSchema,
    outputSchema: AnalyzeResumeAndProvideFeedbackOutputSchema,
  },
  async (input) => {
    const resumeContent = getPortfolioContent();
    const {output} = await ai.generate({
      model: 'googleai/gemini-1.5-flash-latest',
      system: `You are an expert resume writer and career coach specializing in high-performance ATS optimization. Your task is to generate a complete application package (Resume, Cover Letter, and Reach-out Email) tailored perfectly for a specific job description for Sheraz Hussain.

    STRICT RULES:
    1. Source of Truth: The provided portfolio content is the ONLY source of facts about Sheraz Hussain. Do not invent, exaggerate, or fabricate information.
    2. Professional Role: Always identify Sheraz Hussain as a "Freelancer working with SYNC TECH Solutions".
    3. ATS Optimization: The LaTeX Resume must be structured for maximum parse-ability by ATS algorithms, aiming for a 100+ score.
    4. LaTeX Compilation: Ensure all LaTeX code is valid, compile-ready, and uses the exact templates provided.`,
      prompt: `
    Candidate Information (Source of Truth):
    ${resumeContent}

    Target Job Description:
    ${input.jobDescription}

    TASK:
    Generate a 100+ score ATS-optimized Resume (LaTeX), a tailored Cover Letter (LaTeX), and a professional Reach-out Email.

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
    [Generate a high-impact summary focusing on SYNC TECH Solutions and JD keywords]
    \\section{Technical Skills}
    \\begin{itemize}
        \\item \\textbf{Languages:} [List relevant]
        \\item \\textbf{Frameworks/Tools:} [List relevant]
        \\item \\textbf{Cloud \& DevOps:} [List relevant]
        \\item \\textbf{Databases:} [List relevant]
    \\end{itemize}
    \\section{Professional Experience}
    \\experienceItem{SYNC TECH Solutions}{Remote/Dublin}{Freelancer working with SYNC TECH Solutions}{Aug 2025 -- Present}
    \\begin{itemize}
        \\item [Quantifiable achievement 1 related to JD]
        \\item [Quantifiable achievement 2 related to JD]
    \\end{itemize}
    [Include other experiences from source]
    \\section{Technical Projects}
    \\textbf{[Project Name]} $|$ \\textit{Tech Stack: [Techs]} \\hfill \\href{[Link]}{Project Link}
    \\begin{itemize}
        \\item [Key accomplishment highlighting technical depth]
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
    I am writing to express my strong interest in the [Job Title] position at [Company Name]. As a Freelancer working with SYNC TECH Solutions, I have specialized in [Core Skill from JD] and delivered [Achievement from Source]...
    [Generate body using the template structure provided]
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
      throw new Error("The AI model returned an invalid or empty response.");
    }
    return output;
  }
);
