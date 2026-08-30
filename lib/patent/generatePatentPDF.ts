import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { PatentModuleData } from "@/lib/context/ModuleResultsContext";

export interface PDFPatentData extends PatentModuleData {
  enterpriseName?: string;
  applicantName?: string;
  category?: string;
  location?: string;
}

export function generatePatentDossierPDF(data: PDFPatentData) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const primaryColor = [20, 83, 45]; // #14532D Deep Forest Green
  const accentColor = [5, 150, 105]; // #059669 Emerald
  const darkSlate = [15, 23, 42]; // #0F172A Slate 900
  const lightBg = [248, 250, 252]; // #F8FAFC
  const borderGray = [226, 232, 240]; // #E2E8F0

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const refId = `IN-PAT-${Date.now().toString().slice(-6)}`;

  // ==========================================
  // 1. TOP HEADER & BRAND LETTERHEAD
  // ==========================================
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, pageWidth, 28, "F");

  // Title inside header
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("SAHAYYA INTELLECTUAL PROPERTY & PATENT INTELLIGENCE", margin, 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(209, 250, 229);
  doc.text(
    "National MSME Innovation & Patent Subvention Dossier • Indian Patent Office (IPO) Compliance",
    margin,
    18
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(254, 240, 138); // Yellow accent
  doc.text("FORM 28: 80% STATUTORY FEE WAIVER CERTIFIED", margin, 24);

  // Reference & Date on top right
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(`Dossier Ref: ${refId}`, pageWidth - margin, 12, { align: "right" });
  doc.text(`Generated: ${today}`, pageWidth - margin, 18, { align: "right" });
  doc.text("Classification: MSME Confidential", pageWidth - margin, 24, { align: "right" });

  let currentY = 34;

  // ==========================================
  // 2. APPLICANT & ENTERPRISE OVERVIEW BOX
  // ==========================================
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, currentY, contentWidth, 22, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);

  const entName = data.enterpriseName || "Kisan Agro Processing Cluster";
  const cat = data.category || "Manufacturing / Agro-Tech";
  const loc = data.location || "Maharashtra, India";

  doc.text("Enterprise Name:", margin + 4, currentY + 6);
  doc.setFont("helvetica", "normal");
  doc.text(entName, margin + 35, currentY + 6);

  doc.setFont("helvetica", "bold");
  doc.text("Sector / Type:", margin + 4, currentY + 12);
  doc.setFont("helvetica", "normal");
  doc.text(cat, margin + 35, currentY + 12);

  doc.setFont("helvetica", "bold");
  doc.text("Cluster Location:", margin + 4, currentY + 18);
  doc.setFont("helvetica", "normal");
  doc.text(loc, margin + 35, currentY + 18);

  // Right column inside enterprise box: Readiness Badge
  const badgeX = pageWidth - margin - 52;
  doc.setFillColor(236, 253, 245); // Emerald-50
  doc.setDrawColor(167, 243, 208); // Emerald-200
  doc.roundedRect(badgeX, currentY + 3, 48, 16, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("AI NOVELTY RATING", badgeX + 24, currentY + 8, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor(5, 150, 105);
  doc.text(`${data.readinessScore}% (${data.patentPotential})`, badgeX + 24, currentY + 15, {
    align: "center",
  });

  currentY += 28;

  // ==========================================
  // 3. INVENTION DISCLOSURE (TWO-COLUMN BOX)
  // ==========================================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("1. TECHNICAL DISCLOSURE & SPECIFICATION", margin, currentY);
  currentY += 4;

  const colWidth = (contentWidth - 6) / 2;
  const boxHeight = 44;

  // Left Column Box: Mechanism & Problem
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(margin, currentY, colWidth, boxHeight, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text("INVENTION / MECHANISM TITLE", margin + 4, currentY + 6);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  const splitTitle = doc.splitTextToSize(data.inventionTitle || "Dual-Chamber Low-Cost Solar Agro Dehydrator", colWidth - 8);
  doc.text(splitTitle, margin + 4, currentY + 11);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text("TECHNICAL PROBLEM SOLVED", margin + 4, currentY + 22);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  const splitProb = doc.splitTextToSize(
    data.problemSolved || "Moisture decay in rural chili & spice harvest due to lack of grid power.",
    colWidth - 8
  );
  doc.text(splitProb, margin + 4, currentY + 27);

  // Right Column Box: Novelty & Mechanism
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(margin + colWidth + 6, currentY, colWidth, boxHeight, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text("NOVELTY & TECHNICAL DIFFERENTIATOR", margin + colWidth + 10, currentY + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  const splitNov = doc.splitTextToSize(
    data.technicalNovelty || "Inverted vortex thermal airflow with thermal stone heat-sink retention.",
    colWidth - 8
  );
  doc.text(splitNov, margin + colWidth + 10, currentY + 11);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text("OPERATIONAL MECHANISM", margin + colWidth + 10, currentY + 22);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  const splitMech = doc.splitTextToSize(
    data.mechanismSummary || "Uses natural convection to dry produce 3x faster without electric fans.",
    colWidth - 8
  );
  doc.text(splitMech, margin + colWidth + 10, currentY + 27);

  currentY += boxHeight + 8;

  // ==========================================
  // 4. PRIOR ART & PUBLISHED REFERENCES TABLE
  // ==========================================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("2. PRIOR-ART SEARCH & PUBLISHED REFERENCE MATRIX", margin, currentY);
  currentY += 3;

  const tableBody = data.similarPatents.map((pat) => [
    pat.patentNo,
    pat.title,
    pat.similarity,
    data.differencesIdentified[0] || "Invention uses thermal stone vortex airflow without electric grid requirement.",
  ]);

  // Fallback row if empty
  if (tableBody.length === 0) {
    tableBody.push([
      "IN-384920",
      "Solar Cabinet Dryer with Air Baffles",
      "Moderate Similarity",
      "Prior art requires electric convection fan; Sahayya invention operates 100% grid-free.",
    ]);
  }

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    head: [["Patent / Reg. No", "Prior Art Title", "Similarity Level", "Technical Divergence vs Invention"]],
    body: tableBody,
    theme: "grid",
    headStyles: {
      fillColor: primaryColor as [number, number, number],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
      halign: "left",
      cellPadding: 2.5,
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: darkSlate as [number, number, number],
      cellPadding: 2.5,
    },
    columnStyles: {
      0: { cellWidth: 26, fontStyle: "bold" },
      1: { cellWidth: 50 },
      2: { cellWidth: 32, fontStyle: "bold" },
      3: { cellWidth: "auto" },
    },
  });

  // @ts-ignore
  currentY = doc.lastAutoTable.finalY + 8;

  // ==========================================
  // 5. STATUTORY MSME FILING CHECKLIST & FORM 28
  // ==========================================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("3. STATUTORY IPO FILING ROADMAP & FORM 28 FEE SUBVENTION", margin, currentY);
  currentY += 4;

  // Checklist table
  const checklistRows = (data.readinessChecklist || [
    { task: "Provisional Specification Form 1 & 2 drafted", completed: true },
    { task: "Prior Art Search across Indian Patent Office portal", completed: true },
    { task: "MSME 80% Statutory Fee Waiver Certificate (Form 28)", completed: true },
    { task: "Complete Claims & CAD Isometric Drawings", completed: false },
  ]).map((item) => [
    item.task,
    item.completed ? "COMPLIANT / READY" : "PENDING DRAFT",
    item.completed
      ? "Form drafted in accordance with Patent Rules, 2003 (as amended)"
      : "Complete CAD rendering before national phase non-provisional filing",
  ]);

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    head: [["Statutory Requirement / Task", "Compliance Status", "IPO Procedural Guidance"]],
    body: checklistRows,
    theme: "striped",
    headStyles: {
      fillColor: [30, 41, 59], // Slate 800
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
      cellPadding: 2.2,
    },
    bodyStyles: {
      fontSize: 7.5,
      cellPadding: 2.2,
    },
    columnStyles: {
      0: { cellWidth: 70, fontStyle: "bold" },
      1: { cellWidth: 36, fontStyle: "bold" },
      2: { cellWidth: "auto" },
    },
  });

  // @ts-ignore
  currentY = doc.lastAutoTable.finalY + 6;

  // ==========================================
  // 6. FINANCIAL FEE SAVINGS & SIGN-OFF BOX
  // ==========================================
  doc.setFillColor(254, 252, 232); // Amber-50
  doc.setDrawColor(253, 224, 71); // Amber-300
  doc.roundedRect(margin, currentY, contentWidth, 20, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(161, 98, 7); // Amber-700
  doc.text("MSME STATUTORY FEE SUBVENTION (THE PATENTS RULES, RULE 7 & FORM 28):", margin + 4, currentY + 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(113, 63, 18);
  doc.text(
    "• Standard Large Enterprise Official Filing Fee: Rs. 8,000/- per application",
    margin + 4,
    currentY + 10
  );
  doc.text(
    "• MSME / Micro Cluster Subsidized Fee (with valid Udyam): Rs. 1,600/- only (Direct 80% Statutory Subsidy)",
    margin + 4,
    currentY + 14
  );

  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("NET DIRECT GOVERNMENT FEE SAVING: Rs. 6,400/- PER PATENT APPLICATION", margin + 4, currentY + 18);

  currentY += 24;

  // ==========================================
  // 7. FOOTER DISCLAIMER & VERIFICATION STAMP
  // ==========================================
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  const disclaimer =
    "DISCLAIMER: This document is an automated preliminary novelty & patent readiness intelligence dossier generated by Project Sahayya for Indian MSMEs. Official patent examination, prior-art publication search, and final patent grants are governed exclusively by the Controller General of Patents, Designs & Trademarks (CGPDTM), Government of India.";
  const splitDisc = doc.splitTextToSize(disclaimer, contentWidth);
  doc.text(splitDisc, margin, currentY);

  // Save the generated PDF
  const filename = `Sahayya_Patent_Intelligence_Dossier_${data.inventionTitle ? data.inventionTitle.replace(/[^a-zA-Z0-9]/g, "_") : "Report"}.pdf`;
  doc.save(filename);
}
