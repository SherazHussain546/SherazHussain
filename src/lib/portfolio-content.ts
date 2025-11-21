import { skills, experiences, projects, education, certifications } from '@/lib/data';

/**
 * Aggregates all portfolio content (excluding posts) from the data files into a single string.
 * This is used by the AI Resume Analyzer as the source "resume" content.
 * @returns A string containing all portfolio content.
 */
export function getPortfolioContent(): string {
  let content = 'Sheraz Hussain - Full-Stack Software Engineer & AI/Cloud Developer\n\n';

  // --- Education ---
  content += '== EDUCATION ==\n';
  content += `${education.degree}\n`;
  content += `${education.university} (${education.graduationDate})\n`;
  if (education.awards.length > 0) {
    content += `Awards: ${education.awards.join(', ')}\n`;
  }
  content += '\n';

  // --- Skills ---
  content += '== SKILLS ==\n';
  for (const category in skills) {
    const skillCategory = skills[category as keyof typeof skills];
    content += `- ${category}: ${skillCategory.items.join(', ')}\n`;
  }
  content += '\n';

  // --- Experience ---
  content += '== WORK EXPERIENCE ==\n';
  experiences.forEach(exp => {
    content += `${exp.role} at ${exp.company} (${exp.period})\n`;
    content += `${exp.description}\n`;
    exp.points.forEach(point => {
      content += `  - ${point}\n`;
    });
    content += '\n';
  });

  // --- Projects ---
  content += '== FEATURED PROJECTS ==\n';
  projects.forEach(proj => {
    content += `${proj.name}\n`;
    content += `${proj.description}\n`;
    content += `  Technologies: ${proj.stack.join(', ')}\n`;
    content += '\n';
  });

  // --- Certifications ---
  content += '== CERTIFICATIONS & PROGRAMS ==\n';
  certifications.forEach(cert => {
    content += `${cert.title} - ${cert.issuer} (${cert.date})\n`;
    if(cert.points && cert.points.length > 0) {
        cert.points.forEach(point => {
            content += `  - ${point}\n`;
        });
    }
  });
  content += '\n';

  return content;
}
