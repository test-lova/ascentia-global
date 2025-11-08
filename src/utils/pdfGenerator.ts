import { jsPDF } from 'jspdf';

interface EducationEntry {
  year: string;
  month: string;
  description: string;
}

interface WorkEntry {
  year: string;
  month: string;
  description: string;
}

interface ResumeData {
  first_name: string;
  middle_name?: string;
  last_name: string;
  date_of_birth: string;
  gender: 'male' | 'female';
  email: string;
  address: string;
  education_history: EducationEntry[];
  work_history?: WorkEntry[];
  licenses: string;
  skills: string;
  motivation: string;
  strengths?: string;
  weaknesses?: string;
  hobbies?: string;
  future_dream?: string;
  spouse: boolean;
  height: string;
  weight: string;
  blood_type: string;
  imagePreview: string | null;
}

export const generateResumePDF = (data: ResumeData): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = 20;

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('履歴書 (Resume)', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  // Add profile image if available
  if (data.imagePreview) {
    try {
      const imgWidth = 35;
      const imgHeight = 45;
      doc.addImage(data.imagePreview, 'JPEG', pageWidth - margin - imgWidth, yPos, imgWidth, imgHeight);
    } catch (error) {
      console.error('Failed to add image to PDF:', error);
    }
  }

  // Personal Information Section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Personal Information (個人情報)', margin, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const fullName = [data.first_name, data.middle_name, data.last_name]
    .filter(Boolean)
    .join(' ');
  
  doc.text(`Name (氏名): ${fullName}`, margin, yPos);
  yPos += 6;
  doc.text(`Date of Birth (生年月日): ${data.date_of_birth}`, margin, yPos);
  yPos += 6;
  doc.text(`Gender (性別): ${data.gender === 'male' ? 'Male (男性)' : 'Female (女性)'}`, margin, yPos);
  yPos += 6;
  doc.text(`Email: ${data.email}`, margin, yPos);
  yPos += 6;
  
  // Split address into multiple lines if too long
  const addressLines = doc.splitTextToSize(`Address (住所): ${data.address}`, pageWidth - 2 * margin - 40);
  doc.text(addressLines, margin, yPos);
  yPos += addressLines.length * 6;

  doc.text(`Height (身長): ${data.height}cm`, margin, yPos);
  yPos += 6;
  doc.text(`Weight (体重): ${data.weight}kg`, margin, yPos);
  yPos += 6;
  doc.text(`Blood Type (血液型): ${data.blood_type}`, margin, yPos);
  yPos += 6;
  doc.text(`Marital Status (配偶者): ${data.spouse ? 'Married (既婚)' : 'Single (独身)'}`, margin, yPos);
  yPos += 10;

  // Education History Section
  if (yPos > pageHeight - 60) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Education History (学歴)', margin, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  data.education_history.forEach((entry, index) => {
    if (yPos > pageHeight - 30) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.text(`${entry.year}年 ${entry.month}月`, margin, yPos);
    yPos += 6;
    const descLines = doc.splitTextToSize(entry.description, pageWidth - 2 * margin);
    doc.text(descLines, margin + 5, yPos);
    yPos += descLines.length * 6 + 4;
  });

  yPos += 6;

  // Work History Section
  if (data.work_history && data.work_history.length > 0) {
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Work History (職歴)', margin, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    data.work_history.forEach((entry, index) => {
      if (yPos > pageHeight - 30) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.text(`${entry.year}年 ${entry.month}月`, margin, yPos);
      yPos += 6;
      const descLines = doc.splitTextToSize(entry.description, pageWidth - 2 * margin);
      doc.text(descLines, margin + 5, yPos);
      yPos += descLines.length * 6 + 4;
    });

    yPos += 6;
  }

  // Licenses & Qualifications
  if (yPos > pageHeight - 60) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Licenses & Qualifications (免許・資格)', margin, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const licensesLines = doc.splitTextToSize(data.licenses, pageWidth - 2 * margin);
  doc.text(licensesLines, margin, yPos);
  yPos += licensesLines.length * 6 + 6;

  // Skills
  if (yPos > pageHeight - 60) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Special Skills (特技、自己PR)', margin, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const skillsLines = doc.splitTextToSize(data.skills, pageWidth - 2 * margin);
  doc.text(skillsLines, margin, yPos);
  yPos += skillsLines.length * 6 + 6;

  // Motivation
  if (yPos > pageHeight - 60) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Motivation (志望動機)', margin, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const motivationLines = doc.splitTextToSize(data.motivation, pageWidth - 2 * margin);
  doc.text(motivationLines, margin, yPos);
  yPos += motivationLines.length * 6 + 6;

  // Optional sections
  if (data.future_dream) {
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Future Dream (将来の夢)', margin, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const dreamLines = doc.splitTextToSize(data.future_dream, pageWidth - 2 * margin);
    doc.text(dreamLines, margin, yPos);
    yPos += dreamLines.length * 6 + 6;
  }

  if (data.strengths) {
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Strengths (長所)', margin, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const strengthsLines = doc.splitTextToSize(data.strengths, pageWidth - 2 * margin);
    doc.text(strengthsLines, margin, yPos);
    yPos += strengthsLines.length * 6 + 6;
  }

  if (data.weaknesses) {
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Weaknesses (短所)', margin, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const weaknessesLines = doc.splitTextToSize(data.weaknesses, pageWidth - 2 * margin);
    doc.text(weaknessesLines, margin, yPos);
    yPos += weaknessesLines.length * 6 + 6;
  }

  if (data.hobbies) {
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Hobbies (趣味・休みの過ごし方)', margin, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const hobbiesLines = doc.splitTextToSize(data.hobbies, pageWidth - 2 * margin);
    doc.text(hobbiesLines, margin, yPos);
    yPos += hobbiesLines.length * 6 + 6;
  }

  // Generate filename with name and date
  const filename = `Resume_${data.last_name}_${data.first_name}_${new Date().toISOString().split('T')[0]}.pdf`;
  
  // Save the PDF
  doc.save(filename);
};
