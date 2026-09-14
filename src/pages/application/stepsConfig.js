// 16 Application Form Steps Configuration (Exact Original Metadata for Progress, Validation & Review)
export const STEPS_CONFIG = [
  {
    "id": "instructions",
    "title": "Please Read the Instructions Below",
    "subtitle": "",
    "fields": [
      {
        "id": "instrDeadline",
        "label": "The last date for the receipt of hard copy of application will be the same as the closing date of the portal mentioned in the advertisment. Applications found incomplete and/or received after the due date will not be considered.",
        "type": "heading",
        "required": false
      },
      {
        "id": "instrFill",
        "label": "This application form should be properly filled. Photocopies of all certificates/testimonials must be attached. Originals will have to be shown at the time of Interview.",
        "type": "heading",
        "required": false
      },
      {
        "id": "instrForward",
        "label": "The applicants should send their applications after getting forwarded by their current employer. Printout of the completely filled application form must also be sent to the Dean of Colleges, M.D. University, Rohtak and also to the Director General Higher Education, Shiksha Sadan, Sector 5, Panchkula by the last date given in the advertisement.",
        "type": "heading",
        "required": false
      },
      {
        "id": "instrIncomplete",
        "label": "Applications received after the due date or found incomplete will not be considered.",
        "type": "heading",
        "required": false
      }
    ]
  },
  {
    "id": "personal",
    "title": "Personal Information",
    "subtitle": "Please enter your details exactly as per your ID proofs",
    "fields": [
      {
        "id": "postAppliedFor",
        "label": "Applying for the Post of (Give full name of post along with Advt. No. and date)",
        "type": "text",
        "required": true
      },
      {
        "id": "name",
        "label": "Name in Full (in Block Letters)",
        "type": "text",
        "required": true
      },
      {
        "id": "photo",
        "label": "Upload Candidate Passport Size Photo (50 KB, JPEG)",
        "type": "file",
        "required": true
      },
      {
        "id": "presentStreet",
        "label": "Present Address — Street",
        "type": "textarea",
        "required": true
      },
      {
        "id": "presentCity",
        "label": "City",
        "type": "text",
        "required": true
      },
      {
        "id": "presentState",
        "label": "State / Region / Province",
        "type": "text",
        "required": true
      },
      {
        "id": "presentPostalCode",
        "label": "Postal / Zip Code",
        "type": "text",
        "required": false
      },
      {
        "id": "presentCountry",
        "label": "Country",
        "type": "text",
        "required": true
      },
      {
        "id": "contactNo1",
        "label": "Telephone / Mobile No.",
        "type": "tel",
        "required": true,
        "pattern": "^[6-9][0-9]{9}$",
        "patternError": "Enter a valid 10-digit Indian mobile number (must start with 6, 7, 8, or 9)"
      },
      {
        "id": "whatsappNo",
        "label": "WhatsApp No.",
        "type": "tel",
        "required": false,
        "pattern": "^[6-9][0-9]{9}$",
        "patternError": "Enter a valid 10-digit Indian mobile number (must start with 6, 7, 8, or 9)"
      },
      {
        "id": "email",
        "label": "E-mail ID (in Block Letters)",
        "type": "email",
        "required": true
      },
      {
        "id": "confirmEmail",
        "label": "Re-enter E-mail ID",
        "type": "email",
        "required": true
      },
      {
        "id": "fatherName",
        "label": "Father's Name",
        "type": "text",
        "required": true
      },
      {
        "id": "motherName",
        "label": "Mother's Name",
        "type": "text",
        "required": true
      },
      {
        "id": "nationality",
        "label": "Nationality of the Candidate",
        "type": "text",
        "required": true
      },
      {
        "id": "maritalStatus",
        "label": "Marital Status",
        "type": "select",
        "required": true,
        "options": [
          "Unmarried",
          "Married",
          "Widow/Widower",
          "Divorced"
        ]
      },
      {
        "id": "dob",
        "label": "Date of Birth",
        "type": "date",
        "required": true
      },
      {
        "id": "socialCategory",
        "label": "Social Category",
        "type": "select",
        "required": false,
        "options": [
          "General",
          "SC",
          "BC-A",
          "BC-B",
          "EWS",
          "Other"
        ]
      },
      {
        "id": "categoryCertificate",
        "label": "Category Certificate",
        "type": "file",
        "required": false
      },
      {
        "id": "aadhaarNo",
        "label": "Aadhaar Card Number",
        "type": "text",
        "required": false,
        "pattern": "^[0-9]{12}$",
        "patternError": "Aadhaar must be exactly 12 digits"
      },
      {
        "id": "familyId",
        "label": "Family ID (PPP)",
        "type": "text",
        "required": false
      }
    ]
  },
  {
    "id": "references",
    "title": "References",
    "subtitle": "Two referees who are well acquainted with the applicant",
    "fields": [
      {
        "id": "refNote",
        "label": "These should be professionally competent persons who are well acquainted with some aspects of the applicant's training, accomplishments, capabilities and character but must not be relations. At least one referee should be citizen of India. For applicants having done doctoral or post-doctoral research, the research supervisors must be listed.",
        "type": "heading",
        "required": false
      },
      {
        "id": "ref1Heading",
        "label": "Referee 1",
        "type": "heading",
        "required": false
      },
      {
        "id": "ref1FirstName",
        "label": "First Name",
        "type": "text",
        "required": true
      },
      {
        "id": "ref1LastName",
        "label": "Last Name",
        "type": "text",
        "required": true
      },
      {
        "id": "ref1Occupation",
        "label": "Occupation or Position",
        "type": "text",
        "required": true
      },
      {
        "id": "ref1Address",
        "label": "Address",
        "type": "textarea",
        "required": true
      },
      {
        "id": "ref1Phone",
        "label": "Contact Phone",
        "type": "tel",
        "required": true,
        "pattern": "^[6-9][0-9]{9}$",
        "patternError": "Enter a valid 10-digit Indian mobile number"
      },
      {
        "id": "ref1Email",
        "label": "Contact Email",
        "type": "email",
        "required": true
      },
      {
        "id": "ref2Heading",
        "label": "Referee 2",
        "type": "heading",
        "required": false
      },
      {
        "id": "ref2FirstName",
        "label": "First Name",
        "type": "text",
        "required": true
      },
      {
        "id": "ref2LastName",
        "label": "Last Name",
        "type": "text",
        "required": true
      },
      {
        "id": "ref2Occupation",
        "label": "Occupation or Position",
        "type": "text",
        "required": true
      },
      {
        "id": "ref2Address",
        "label": "Address",
        "type": "textarea",
        "required": true
      },
      {
        "id": "ref2Phone",
        "label": "Contact Phone",
        "type": "tel",
        "required": true,
        "pattern": "^[6-9][0-9]{9}$",
        "patternError": "Enter a valid 10-digit Indian mobile number"
      },
      {
        "id": "ref2Email",
        "label": "Contact Email",
        "type": "email",
        "required": true
      }
    ]
  },
  {
    "id": "court_declarations",
    "title": "Declarations Regarding Court Cases / Disqualification",
    "subtitle": "",
    "fields": [
      {
        "id": "courtCase1",
        "label": "Have you ever been prosecuted, kept under detention, bound down, fined, convicted by a Court of Law or debarred/disqualified by any University or Public Service Commission from appearing at its examinations/selection?",
        "type": "select",
        "required": true,
        "options": [
          "No",
          "Yes"
        ]
      },
      {
        "id": "courtCase1Details",
        "label": "If Yes, give full particulars of the case, detention, fine, conviction, sentence, etc.",
        "type": "textarea",
        "required": false,
        "showIf": {
          "fieldId": "courtCase1",
          "equals": "Yes"
        }
      },
      {
        "id": "courtCase2",
        "label": "Is any case pending against you in any court of law at the time of filling up of this form?",
        "type": "select",
        "required": true,
        "options": [
          "No",
          "Yes"
        ]
      },
      {
        "id": "courtCase2Details",
        "label": "If Yes, give full particulars of the case",
        "type": "textarea",
        "required": false,
        "showIf": {
          "fieldId": "courtCase2",
          "equals": "Yes"
        }
      }
    ]
  },
  {
    "id": "education_table",
    "title": "Educational Qualifications",
    "subtitle": "Scroll right to fill all columns. Enter details exactly as per certificates.",
    "fields": [
      {
        "id": "educationDetails",
        "label": "Complete Educational Record",
        "type": "table",
        "required": true
      },
      {
        "id": "mphilTopic",
        "label": "Topic of M.Phil Dissertation",
        "type": "textarea",
        "required": false
      },
      {
        "id": "phdTopic",
        "label": "Topic of Research for Ph.D.",
        "type": "textarea",
        "required": true
      },
      {
        "id": "fieldOfSpecialization",
        "label": "Field of Specialization",
        "type": "text",
        "required": true
      }
    ]
  },
  {
    "id": "employment",
    "title": "Details of Present/Previous Employment",
    "subtitle": "",
    "fields": [
      {
        "id": "employmentTable",
        "label": "Employment Record",
        "type": "table",
        "required": true
      },
      {
        "id": "fileExperienceCerts",
        "label": "Attach All Experience Certificates in a Single PDF",
        "type": "file",
        "required": true
      }
    ]
  },
  {
    "id": "education_documents",
    "title": "Upload Educational Documents",
    "subtitle": "Combine Certificate and Marksheet for each class into one PDF. Max size: 500 KB each (Any Other: 2 MB).",
    "fields": [
      {
        "id": "docMatric",
        "label": "Certificate and/or Marksheet for Matriculation",
        "type": "file",
        "required": true
      },
      {
        "id": "docInter",
        "label": "Certificate and/or Marksheet for Prep/Pre/10+2",
        "type": "file",
        "required": true
      },
      {
        "id": "docGrad",
        "label": "Certificate and/or Marksheet for Graduation (BA/B.Sc./B.Com/Other)",
        "type": "file",
        "required": true
      },
      {
        "id": "docPG",
        "label": "Certificate and/or Marksheet for Post-Graduation (MA/M.Sc./M.Com/Other)",
        "type": "file",
        "required": false
      },
      {
        "id": "docBEd",
        "label": "Certificate and/or Marksheet for B.Ed.",
        "type": "file",
        "required": false
      },
      {
        "id": "docMEd",
        "label": "Certificate and/or Marksheet for M.Ed.",
        "type": "file",
        "required": false
      },
      {
        "id": "docMPhil",
        "label": "M.Phil Certificate / Degree",
        "type": "file",
        "required": false
      },
      {
        "id": "docPhd",
        "label": "Ph.D. Certificate / Degree",
        "type": "file",
        "required": false
      },
      {
        "id": "docNetSlet",
        "label": "NET/SLET Certificate",
        "type": "file",
        "required": false
      },
      {
        "id": "anyOtherQualName",
        "label": "Name of Any Other Qualification (specify)",
        "type": "text",
        "required": false
      },
      {
        "id": "docAnyOther",
        "label": "Certificate and/or Marksheet for Any Other Qualification",
        "type": "file",
        "required": false
      }
    ]
  },
  {
    "id": "employment_noc",
    "title": "Employment Status & No Objection Certificate",
    "subtitle": "",
    "fields": [
      {
        "id": "isPresEmployed",
        "label": "Are you presently employed?",
        "type": "select",
        "required": true,
        "options": [
          "No",
          "Yes"
        ]
      },
      {
        "id": "nocInstructions",
        "label": "If Yes: Submit No Objection Certificate from the employer as per the Standard Format. Download the Standard Format from the link provided by the college in Settings, fill it, get it signed and stamped by your current employer on official letterhead, then upload the signed copy below.",
        "type": "heading",
        "required": false,
        "showIf": {
          "fieldId": "isPresEmployed",
          "equals": "Yes"
        }
      },
      {
        "id": "nocCurrentCollege",
        "label": "Name of Current Employer / College / Institution",
        "type": "text",
        "required": true,
        "showIf": {
          "fieldId": "isPresEmployed",
          "equals": "Yes"
        }
      },
      {
        "id": "nocDepartment",
        "label": "Department / Subject",
        "type": "text",
        "required": true,
        "showIf": {
          "fieldId": "isPresEmployed",
          "equals": "Yes"
        }
      },
      {
        "id": "nocDesignation",
        "label": "Current Designation",
        "type": "text",
        "required": true,
        "showIf": {
          "fieldId": "isPresEmployed",
          "equals": "Yes"
        }
      },
      {
        "id": "nocNote",
        "label": "👉 Click \"Generate NOC\" button below to download your pre-filled NOC certificate draft. Print it on your employer's official letterhead, get it signed and stamped, then upload the signed copy below.",
        "type": "heading",
        "required": false,
        "showIf": {
          "fieldId": "isPresEmployed",
          "equals": "Yes"
        }
      },
      {
        "id": "fileNOC",
        "label": "Upload NOC Certificate from Employer (PDF, as per Standard Format)",
        "type": "file",
        "required": true,
        "showIf": {
          "fieldId": "isPresEmployed",
          "equals": "Yes"
        }
      },
      {
        "id": "basicPayAcceptable",
        "label": "Basic Pay Acceptable",
        "type": "text",
        "required": false
      },
      {
        "id": "joiningPeriod",
        "label": "Period required for joining the post, if selected",
        "type": "text",
        "required": false
      }
    ]
  },
  {
    "id": "criteria_info",
    "title": "Criteria for Selection of Principal",
    "subtitle": "Applicant must carefully study this criteria and then fill the fields given below after the criteria.",
    "fields": [
      {
        "id": "criteriaRef",
        "label": "Memo No. KW8/36-2009 C-IV(3) Dated 18-04-2023, Higher Education Department, Haryana",
        "type": "heading",
        "required": false
      },
      {
        "id": "criteriaI",
        "label": "I. Academic Record — Maximum 20 Marks: (a) Above 55% marks in Master's degree — 0.5 marks for each percentage above 55% (Max 5 marks); (b) Above 55% marks in Graduation — 0.4 marks for each percentage above 55% (Max 5 marks); (c) Above 55% marks in 10+2/Prep. — 0.3 marks for each percentage above 55% (Max 5 marks); (d) Above 55% marks in Matriculation — 0.2 marks for each percentage above 55% (Max 5 marks)",
        "type": "heading",
        "required": false
      },
      {
        "id": "criteriaII",
        "label": "II. Teaching Experience and Assessment of Administrative Skills — Maximum 35 Marks: A. Teaching Experience — Maximum 10 marks (1 mark for each year of teaching experience, above 15 years). B(i) Assessment of Administrative Skill — Max 25 marks: (1) Experience as Joint/Deputy/Assistant Director in Directorate of Higher Education — 1 mark/year; (2) Experience as Registrar or any other Administrative post in any University — 1 mark/year; (3) Experience as Head of the Higher Education Institution i.e. Principal, Officiating Principal/DDO — 1 mark/year (total of B(i) cannot exceed 25 marks combined).",
        "type": "heading",
        "required": false
      },
      {
        "id": "criteriaIIB",
        "label": "B(ii) Experience of Key Responsibilities in Colleges — Max 3 marks each: Staff Representative or V.C. Nominee in Managing Committee; Co-ordinator or Organizing Secretary of International/National/State Conference/Event; Bursar; NSS Programme Officer; YRC Counsellor; Hostel Warden; Member of Statutory Body of University (Max 2); Associate NCC Officer in HEI(s). B(iii) Experience of Committees in College — Max 2 marks each: Co-ordinator IQAC; Editor in Chief, College Magazine; Member, College Advisory Council; Convener University Work/Cultural/Purchase/Building/Sports/Discipline/Internal Complaint Committee; Convener Road Safety/Red Ribbon/Eco Club; In-charge Placement Cell/Women Cell/Time-table Committee/SC-BC Committee. NOTE: Marks of only one experience under Category II B shall be allowed in one academic year.",
        "type": "heading",
        "required": false
      },
      {
        "id": "criteriaIII",
        "label": "III. Academic/Research Score — Maximum 32.5 marks as per Table 2, Appendix II (MDU AC Passed).",
        "type": "heading",
        "required": false
      },
      {
        "id": "criteriaIV",
        "label": "IV. Performance in Interview — Assessed by Selection Committee. Each member shall assign marks individually in all sub-categories mentioned above. For selection, marks obtained in Categories I to III will be added to the average marks assigned by all members of the Selection Committee.",
        "type": "heading",
        "required": false
      },
      {
        "id": "criteriaNote",
        "label": "Note: Teaching experience of candidates shall be considered only in case of teaching the concerned subject after acquiring eligibility qualifications determined by the government.",
        "type": "heading",
        "required": false
      },
      {
        "id": "criteriaAccepted",
        "label": "I have read and understood the above criteria for selection of Principal",
        "type": "checkbox",
        "required": true
      }
    ]
  },
  {
    "id": "academic",
    "title": "Part I: Academic Record",
    "subtitle": "(Maximum 20 Marks)",
    "fields": [
      {
        "id": "marksCriteriaHeading",
        "label": "Marks claimed by the applicant according to criteria of selection given above",
        "type": "heading",
        "required": false
      },
      {
        "id": "academicMasters",
        "label": "Above 55% marks in Master's degree",
        "type": "score",
        "required": true
      },
      {
        "id": "academicGrad",
        "label": "Above 55% marks in Graduation",
        "type": "score",
        "required": true
      },
      {
        "id": "academic12th",
        "label": "Above 55% marks in 10+2/Prep.",
        "type": "score",
        "required": false
      },
      {
        "id": "academicMatric",
        "label": "Above 55% marks in Matriculation",
        "type": "score",
        "required": false
      }
    ]
  },
  {
    "id": "teaching_admin",
    "title": "Part II: Teaching Experience and Assessment of Administrative Skills",
    "subtitle": "(Maximum 35 Marks)",
    "fields": [
      {
        "id": "teachingHeading",
        "label": "A. Teaching Experience — Maximum 10 Marks",
        "type": "heading",
        "required": false
      },
      {
        "id": "teachingExpAbove15",
        "label": "Above 15 years teaching experience",
        "type": "score",
        "required": true
      },
      {
        "id": "adminHeading",
        "label": "B(i). Assessment of Administrative Skill — Maximum 25 Marks (Note: sum of the 3 rows below cannot exceed 25 marks combined)",
        "type": "heading",
        "required": false
      },
      {
        "id": "adminJointDirector",
        "label": "Experience as Joint/Deputy/Assistant Director in Directorate of Higher Education",
        "type": "score",
        "required": false
      },
      {
        "id": "adminRegistrar",
        "label": "Experience as Registrar or any other Administrative post in any University",
        "type": "score",
        "required": false
      },
      {
        "id": "adminHead",
        "label": "Experience as Head of Higher Education Institution (Principal / Officiating Principal / DDO)",
        "type": "score",
        "required": false
      }
    ]
  },
  {
    "id": "responsibilities_committees",
    "title": "B(ii) Experience of Key Responsibilities in Colleges & B(iii) Experience of Committees in Colleges",
    "subtitle": "Part II continues. Marks of only one experience under Category II B shall be allowed in one academic year.",
    "fields": [
      {
        "id": "respBiiHeading",
        "label": "B(ii) Experience of Key Responsibilities in Colleges",
        "type": "heading",
        "required": false
      },
      {
        "id": "respBiiTable",
        "label": "B(ii) Key Responsibilities — Marks Claimed (Max 3 marks each per year)",
        "type": "table",
        "required": false
      },
      {
        "id": "respBiiiHeading",
        "label": "B(iii) Experience of Committees in Colleges",
        "type": "heading",
        "required": false
      },
      {
        "id": "respBiiiTable",
        "label": "B(iii) Committees — Marks Claimed (Max 2 marks each per year)",
        "type": "table",
        "required": false
      },
      {
        "id": "part2UploadHeading",
        "label": "Upload filled standard format merging along with documents or proofs for Part II [A, B(i), B(ii), and B(iii)]",
        "type": "heading",
        "required": false
      },
      {
        "id": "filePart2",
        "label": "Upload Document (Part II Supporting Documents)",
        "type": "file",
        "required": true
      }
    ]
  },
  {
    "id": "research",
    "title": "Part III: Academic/Research Score",
    "subtitle": "Maximum 32.5 marks — As per Table 2, Appendix II (MDU AC Passed)",
    "fields": [
      {
        "id": "resPapers",
        "label": "For Direct Recruitment:\nResearch Papers in Peer-reviewed / UGC Journals upto 13.06.2019 and UGC CARE Listed Journals w.e.f. 14.06.2019\n\nFor Career Advancement Scheme:\nResearch Papers in Peer-reviewed / UGC Journals upto 02.07.2023 and UGC CARE Listed Journals w.e.f. 03.07.2023",
        "type": "score",
        "required": false
      },
      {
        "id": "resPubHeader",
        "label": "Publications (other than Research papers)",
        "type": "heading",
        "required": false
      },
      {
        "id": "resBooksSubheader",
        "label": "Books authored which are published by:",
        "type": "heading",
        "required": false
      },
      {
        "id": "resBooksInt",
        "label": "International publishers",
        "type": "score",
        "required": false
      },
      {
        "id": "resBooksNat",
        "label": "National Publishers",
        "type": "score",
        "required": false
      },
      {
        "id": "resChapter",
        "label": "Chapter in Edited Book",
        "type": "score",
        "required": false
      },
      {
        "id": "resEditorInt",
        "label": "Editor of Book by International Publisher",
        "type": "score",
        "required": false
      },
      {
        "id": "resEditorNat",
        "label": "Editor of Book by National Publisher",
        "type": "score",
        "required": false
      },
      {
        "id": "resTransSubheader",
        "label": "Translation works in Indian and Foreign Languages by qualified faculties",
        "type": "heading",
        "required": false
      },
      {
        "id": "resTransChapter",
        "label": "Chapter or Research paper",
        "type": "score",
        "required": false
      },
      {
        "id": "resTransBook",
        "label": "Book",
        "type": "score",
        "required": false
      },
      {
        "id": "resIctHeader",
        "label": "Creation of ICT mediated Teaching Learning pedagogy and content and development of new and innovative courses and curricula",
        "type": "heading",
        "required": false
      },
      {
        "id": "resIctPedagogy",
        "label": "Development of Innovative pedagogy",
        "type": "score",
        "required": false
      },
      {
        "id": "resIctCurricula",
        "label": "Design of new curricula and courses",
        "type": "score",
        "required": false
      },
      {
        "id": "resMoocsSubheader",
        "label": "MOOCs",
        "type": "heading",
        "required": false
      },
      {
        "id": "resMoocs4Quad",
        "label": "Development of complete MOOCs in 4 quadrants (4 credit course) — In case of MOOCs of lesser credits, 05 marks/credit",
        "type": "score",
        "required": false
      },
      {
        "id": "resMoocsModule",
        "label": "MOOCs (developed in 4 quadrant) per module/lecture",
        "type": "score",
        "required": false
      },
      {
        "id": "resMoocsContent",
        "label": "Content writer/subject matter expert for each module of MOOCs (at least one quadrant)",
        "type": "score",
        "required": false
      },
      {
        "id": "resMoocsCoord",
        "label": "Course Coordinator for MOOCs (4 credit course) — In case of MOOCs of lesser credits, 02 marks/credit",
        "type": "score",
        "required": false
      },
      {
        "id": "resEcontentSubheader",
        "label": "E-Content",
        "type": "heading",
        "required": false
      },
      {
        "id": "resEcontentComplete",
        "label": "Development of e-Content in 4 quadrants for a complete course/e-book",
        "type": "score",
        "required": false
      },
      {
        "id": "resEcontentModule",
        "label": "e-Content (developed in 4 quadrants) per module",
        "type": "score",
        "required": false
      },
      {
        "id": "resEcontentContrib",
        "label": "Contribution to development of e-content module in complete course/paper/e-book (at least one quadrant)",
        "type": "score",
        "required": false
      },
      {
        "id": "resEcontentEditor",
        "label": "Editor of e-content for complete course/paper/e-book",
        "type": "score",
        "required": false
      },
      {
        "id": "resGuidanceHeader",
        "label": "(a) Research Guidance",
        "type": "heading",
        "required": false
      },
      {
        "id": "resPhd",
        "label": "Ph.D.\n(10 per degree awarded, 05 per thesis submitted)",
        "type": "score",
        "required": false
      },
      {
        "id": "resMphil",
        "label": "M.Phil. / P.G. dissertation",
        "type": "score",
        "required": false
      },
      {
        "id": "resProjCompletedSubheader",
        "label": "Research Projects Completed",
        "type": "heading",
        "required": false
      },
      {
        "id": "resProjMore10",
        "label": "More than 10 lakhs",
        "type": "score",
        "required": false
      },
      {
        "id": "resProjLess10",
        "label": "Less than 10 lakhs",
        "type": "score",
        "required": false
      },
      {
        "id": "resProjOngoingSubheader",
        "label": "Research Projects Ongoing:",
        "type": "heading",
        "required": false
      },
      {
        "id": "resProjOngoingMore10",
        "label": "More than 10 lakhs",
        "type": "score",
        "required": false
      },
      {
        "id": "resProjOngoingLess10",
        "label": "Less than 10 lakhs",
        "type": "score",
        "required": false
      },
      {
        "id": "resConsultancy",
        "label": "Consultancy",
        "type": "score",
        "required": false
      },
      {
        "id": "resPatentHeader",
        "label": "(a) Patents",
        "type": "heading",
        "required": false
      },
      {
        "id": "resPatentInt",
        "label": "International",
        "type": "score",
        "required": false
      },
      {
        "id": "resPatentNat",
        "label": "National",
        "type": "score",
        "required": false
      },
      {
        "id": "resPolicySubheader",
        "label": "*Policy Document (Submitted to an International body/organisation like UNO/UNESCO/World Bank/International Monetary Fund etc. or Central Government or State Government)",
        "type": "heading",
        "required": false
      },
      {
        "id": "resPolicyInt",
        "label": "International",
        "type": "score",
        "required": false
      },
      {
        "id": "resPolicyNat",
        "label": "National",
        "type": "score",
        "required": false
      },
      {
        "id": "resPolicyState",
        "label": "State",
        "type": "score",
        "required": false
      },
      {
        "id": "resAwardSubheader",
        "label": "Awards / Fellowship",
        "type": "heading",
        "required": false
      },
      {
        "id": "resAwardInt",
        "label": "International",
        "type": "score",
        "required": false
      },
      {
        "id": "resAwardNat",
        "label": "National",
        "type": "score",
        "required": false
      },
      {
        "id": "resInvitedHeader",
        "label": "*Invited lectures / Resource Person / paper presentation in Seminars / Conferences / full paper in Conference Proceedings (Paper presented in Seminars/Conferences and also published as full paper in Conference Proceedings will be counted only once)",
        "type": "heading",
        "required": false
      },
      {
        "id": "resInvitedIntAbroad",
        "label": "International (Abroad)",
        "type": "score",
        "required": false
      },
      {
        "id": "resInvitedIntWithin",
        "label": "International (within country)",
        "type": "score",
        "required": false
      },
      {
        "id": "resInvitedNat",
        "label": "National",
        "type": "score",
        "required": false
      },
      {
        "id": "resInvitedState",
        "label": "State/University",
        "type": "score",
        "required": false
      },
      {
        "id": "resTotal",
        "label": "Total Academic Research Score as per Table 2",
        "type": "score",
        "required": false
      }
    ]
  },
  {
    "id": "annexures",
    "title": "Annexures I–VI: Research Supporting Documents",
    "subtitle": "Attach full copies of research papers and other documents for your claimed API score as mentioned under Annexures I-VI of Appendix II, Table-2 (specified by DGHE for Part III ). In case of nil information, write 'Nil' on plain paper and upload its scanned image",
    "fields": [
      {
        "id": "annexure1List",
        "label": "Annexure I: Attach a List of Research Papers in Peer-Reviewed or UGC Listed Journals (consolidated list)",
        "type": "file",
        "required": true
      },
      {
        "id": "annexure1_1to5",
        "label": "Annexure I: Full papers 1–5",
        "type": "file",
        "required": false
      },
      {
        "id": "annexure1_6to10",
        "label": "Annexure I: Full papers 6–10",
        "type": "file",
        "required": false
      },
      {
        "id": "annexure1_11to15",
        "label": "Annexure I: Full papers 11–15",
        "type": "file",
        "required": false
      },
      {
        "id": "annexure1_16to20",
        "label": "Annexure I: Full papers 16–20",
        "type": "file",
        "required": false
      },
      {
        "id": "annexure1_21to25",
        "label": "Annexure I: Full papers 21–25",
        "type": "file",
        "required": false
      },
      {
        "id": "annexure1_26to30",
        "label": "Annexure I: Full papers 26-30 or above",
        "type": "file",
        "required": false
      },
      {
        "id": "annexure2List",
        "label": "Annexure II: Publications (other than research papers) — Attach above a list of publications (other than research papers) with reference to Part III of selection criteria",
        "type": "file",
        "required": true
      },
      {
        "id": "annexure2Full",
        "label": "Annexure II: Full texts of publications (other than research papers) — single PDF",
        "type": "file",
        "required": false
      },
      {
        "id": "annexure3",
        "label": "Annexure III: Creation of ICT Mediated Teaching Learning Pedagogy and Content and Development of New and Innovative Courses and Curricula — consolidated list with full supporting documents",
        "type": "file",
        "required": true
      },
      {
        "id": "annexure4",
        "label": "Annexure IV: Research Guidance / Research Projects Completed / Research Projects Ongoing / Consultancy — consolidated list with reference to Part III, and supporting documents",
        "type": "file",
        "required": true
      },
      {
        "id": "annexure5List",
        "label": "Annexure V: Patents / Policy Documents / Awards Fellowship — attach above a consolidated list with reference to Part III of selection criteria",
        "type": "file",
        "required": true
      },
      {
        "id": "annexure5Full",
        "label": "Annexure V: Arrange and attach supporting documents in a single PDF",
        "type": "file",
        "required": false
      },
      {
        "id": "annexure6List",
        "label": "Annexure VI: Invited Lectures / Resource Person / Paper Presentation in Seminars / Conferences / Full Paper in Conference Proceedings — (Paper presented in Seminars/Conferences and also published as full paper in Conference Proceedings will be counted only once) — attach a complete list with reference to Part III",
        "type": "file",
        "required": true
      },
      {
        "id": "annexure6Full",
        "label": "Annexure VI: Arrange and attach supporting documents in a single PDF",
        "type": "file",
        "required": false
      },
      {
        "id": "googleDriveLink",
        "label": "Google Drive Link (sharing: \"Anyone with the link can view\")",
        "type": "text",
        "required": false,
        "pattern": "drive\\.google\\.com",
        "patternError": "Please paste a valid drive.google.com link"
      }
    ]
  },
  {
    "id": "payment",
    "title": "Payment",
    "subtitle": "Application fee payment via UPI",
    "fields": [
      {
        "id": "paymentAmount",
        "label": "Amount Paid (₹)",
        "type": "number",
        "required": true
      },
      {
        "id": "upiProvider",
        "label": "UPI Provider (e.g. GPay, PhonePe)",
        "type": "text",
        "required": true
      },
      {
        "id": "accountHolderName",
        "label": "Account Holder Name",
        "type": "text",
        "required": true
      },
      {
        "id": "utrNo",
        "label": "UTR Number / Transaction ID",
        "type": "text",
        "required": true
      },
      {
        "id": "filePaymentScreenshot",
        "label": "Upload Payment Screenshot (UTR Visible)",
        "type": "file",
        "required": true
      }
    ]
  },
  {
    "id": "declaration",
    "title": "Declaration",
    "subtitle": "",
    "fields": [
      {
        "id": "place",
        "label": "Place",
        "type": "text",
        "required": true
      },
      {
        "id": "date",
        "label": "Date",
        "type": "date",
        "required": false
      },
      {
        "id": "signature",
        "label": "Upload Candidate Signature",
        "type": "file",
        "required": true
      },
      {
        "id": "declarationNote",
        "label": "I hereby declare and undertake that all the information provided by me in this application form is true, correct and complete to the best of my knowledge and belief and nothing has been concealed therein. In case any information is found to be false, incorrect or misleading, my candidature/appointment is liable to be cancelled.",
        "type": "heading",
        "required": false
      },
      {
        "id": "finalVerification",
        "label": "I have checked and re-verified all the information provided in this application form as per the Criteria for selection of Principal.",
        "type": "checkbox",
        "required": true
      }
    ]
  }
];

export default STEPS_CONFIG;
