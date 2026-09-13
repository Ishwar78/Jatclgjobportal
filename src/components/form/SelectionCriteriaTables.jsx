import React from 'react';

export default function SelectionCriteriaTables() {
  const thStyle = "p-2.5 border border-slate-300 bg-slate-100 text-slate-800 font-bold text-xs text-center";
  const tdStyle = "p-2.5 border border-slate-300 text-xs text-slate-700";
  const tdCenter = "p-2.5 border border-slate-300 text-xs text-slate-700 text-center";
  const headerBanner = "bg-slate-200 text-slate-800 font-bold text-xs md:text-sm p-2.5 text-center border border-slate-300";

  return (
    <div className="space-y-6 my-4 font-sans">
      <div className="text-center italic text-xs md:text-sm text-slate-600">
        Memo No. KW8/36-2009 C-IV(3) Dated 18-04-2023, Higher Education Department, Haryana
      </div>

      {/* TABLE 1: OVERALL CRITERIA SUMMARY */}
      <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-sm">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th colSpan={3} className={headerBanner}>
                Criteria for Selection of Principal in the Govt. Aided Private Colleges in Haryana<br />
                <span className="font-normal text-[11px]">(As per DGHE Memo No. KW 8/36-2009 C-IV(3) Dated 12-12-2022)</span>
              </th>
            </tr>
            <tr>
              <th className={`${thStyle} w-16`}>Part</th>
              <th className={`${thStyle} text-left`}>Category</th>
              <th className={`${thStyle} w-24`}>Max Marks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdCenter}>I</td>
              <td className={tdStyle}>Academic Record</td>
              <td className={tdCenter}>20</td>
            </tr>
            <tr>
              <td className={tdCenter}>II</td>
              <td className={tdStyle}>Teaching Experience and Assessment of Administrative Skills</td>
              <td className={tdCenter}>35</td>
            </tr>
            <tr>
              <td className={tdCenter}>III</td>
              <td className={tdStyle}>Academic / Research Score</td>
              <td className={tdCenter}>32.5</td>
            </tr>
            <tr className="font-bold bg-slate-50">
              <td colSpan={2} className="p-2.5 border border-slate-300 text-xs text-slate-900">
                Total (A+B+C)
              </td>
              <td className={`${tdCenter} font-bold text-slate-900`}>87.5</td>
            </tr>
            <tr>
              <td className={tdCenter}>IV</td>
              <td className={tdStyle}>Interview</td>
              <td className={tdCenter}>12.5</td>
            </tr>
            <tr className="font-bold bg-slate-100">
              <td colSpan={2} className="p-2.5 border border-slate-300 text-xs text-slate-900">
                Total (A+B+C+D)
              </td>
              <td className={`${tdCenter} font-bold text-slate-900`}>100</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TABLE 2: PART I ACADEMIC RECORD */}
      <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-sm">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th colSpan={3} className={headerBanner}>
                PART I<br />
                Academic Record ( Maximum 20 Marks)
              </th>
            </tr>
            <tr>
              <th colSpan={3} className="bg-slate-50 p-2 text-center text-xs font-semibold text-slate-700 border border-slate-300">
                Academic Record : Maximum 20 Marks
              </th>
            </tr>
            <tr>
              <th className={`${thStyle} w-16`}>SR.</th>
              <th className={`${thStyle} text-left`}>Particulars</th>
              <th className={`${thStyle} min-w-[200px]`}>Marks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdCenter}>1</td>
              <td className={tdStyle}>Above 55% Marks in Master Degree</td>
              <td className={tdStyle}>(0.5 marks for each percentage) (Maximum 5 Marks)</td>
            </tr>
            <tr>
              <td className={tdCenter}>2</td>
              <td className={tdStyle}>Above 55% Marks in Graduation Degree</td>
              <td className={tdStyle}>(0.4 marks for each percentage) (Maximum 5 Marks)</td>
            </tr>
            <tr>
              <td className={tdCenter}>3</td>
              <td className={tdStyle}>Above 55% Marks in 10+2 / Prep.</td>
              <td className={tdStyle}>(0.3 marks for each percentage) (Maximum 5 Marks)</td>
            </tr>
            <tr>
              <td className={tdCenter}>4</td>
              <td className={tdStyle}>Above 55% Marks in Matriculation</td>
              <td className={tdStyle}>(0.2 marks for each percentage) (Maximum 5 Marks)</td>
            </tr>
            <tr className="font-bold bg-slate-50">
              <td colSpan={3} className="p-2.5 border border-slate-300 text-xs text-slate-900">
                Total (I)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TABLE 3: PART II (A) TEACHING EXP & ADMIN SKILLS */}
      <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-sm">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th colSpan={3} className={headerBanner}>
                PART II (A)<br />
                Teaching Experience and Assessment of Administrative Skills (Maximum 35 Mark)
              </th>
            </tr>
            <tr>
              <th colSpan={3} className="bg-slate-50 p-2 text-left font-bold text-xs text-slate-800 border border-slate-300">
                Teaching Experience: Maximum 10 marks
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={`${tdCenter} w-16`}> (ii) </td>
              <td className={tdStyle}>Above 15 years teaching experience</td>
              <td className={`${tdStyle} w-48`}>01 Marks for each year</td>
            </tr>
            <tr>
              <td colSpan={3} className="bg-slate-50 p-2 text-left font-bold text-xs text-slate-800 border border-slate-300">
                B. Assessment of Administrative Skill: Maximum 25 marks
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="p-2 font-bold text-xs text-slate-700 border border-slate-300 bg-white">
                (i) Experience of Administrative Responsibilities
              </td>
            </tr>
            <tr>
              <td className={tdCenter}>(1)</td>
              <td className={tdStyle}>Experience as Joint/Deputy/Assistant Director in Directorate of Higher Education, Haryana</td>
              <td className={tdStyle}>01 Marks for each year</td>
            </tr>
            <tr>
              <td className={tdCenter}>(2)</td>
              <td className={tdStyle}>Experience as Registrar or any other administrative post in any University</td>
              <td className={tdStyle}>01 Marks for each year</td>
            </tr>
            <tr>
              <td className={tdCenter}>(3)</td>
              <td className={tdStyle}>Experience as Head of the Higher Education Institution i.e. Principal, Officiating Principal / DDO</td>
              <td className={tdStyle}>01 Marks for each year</td>
            </tr>

            {/* (ii) Experience of Key Responsibilities */}
            <tr>
              <td colSpan={3} className="p-2 font-bold text-xs text-slate-700 border border-slate-300 bg-white">
                (ii) Experience of Key Responsibilities in Colleges
              </td>
            </tr>
            {[
              ["(1)", "Staff Representative or V.C. Nominee in Managing Committee of any College", "01 Marks for each year Maximum upto 3 marks"],
              ["(2)", "Co-ordinator or Organizing Secretary of International/National/State Conference/Event", "01 Marks for each year Maximum upto 3 marks"],
              ["(3)", "Bursar", "01 Marks for each year Maximum upto 3 marks"],
              ["(4)", "NSS Programme Officer", "01 Marks for each year Maximum upto 3 marks"],
              ["(5)", "YRC Counsellor", "01 Marks for each year Maximum upto 3 marks"],
              ["(6)", "Hostel Warden", "01 Marks for each year Maximum upto 3 marks"],
              ["(7)", "Member of any Statutory Body of University", "01 Marks for each year Maximum upto 2 marks"],
              ["(8)", "Experience as Associate NCC Officer in HEI (s)", "01 Marks for each year Maximum upto 3 marks"]
            ].map(([num, name, marks], i) => (
              <tr key={i}>
                <td className={tdCenter}>{num}</td>
                <td className={tdStyle}>{name}</td>
                <td className={tdStyle}>{marks}</td>
              </tr>
            ))}

            {/* (iii) Experience of Committees */}
            <tr>
              <td colSpan={3} className="p-2 font-bold text-xs text-slate-700 border border-slate-300 bg-white">
                (iii) Experience of Committees in Colleges
              </td>
            </tr>
            {[
              ["(1)", "Co-ordinator IQAC"],
              ["(2)", "Editor in Chief, College Magazine"],
              ["(3)", "Member, College Advisory Council"],
              ["(4)", "Convenor, University Work Committee"],
              ["(5)", "Convenor, Cultural Affairs Committee"],
              ["(6)", "Convenor, Purchase/Procurement Committee"],
              ["(7)", "Convenor, Building/Works Committee"],
              ["(8)", "Convenor, Sports Committee"],
              ["(9)", "Convenor, Discipline Committee"],
              ["(10)", "Convenor, Internal (Complaint) Committee"],
              ["(11)", "Convenor, Road Safety Club"],
              ["(12)", "Convenor, Red Ribbon Club"],
              ["(13)", "Convenor- Eco Club"],
              ["(14)", "In-charge, Placement Cell"],
              ["(15)", "In-charge, Women Cell"],
              ["(16)", "In-charge, Time-table Committee"],
              ["(17)", "In-charge, SC/BC Committee"]
            ].map(([num, name], i) => (
              <tr key={i}>
                <td className={tdCenter}>{num}</td>
                <td className={tdStyle}>{name}</td>
                <td className={tdStyle}>01 Marks for each year<br />Maximum upto 2 marks</td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="p-3 bg-amber-50/60 border border-slate-300 italic text-[11px] text-slate-700 leading-relaxed">
                Marks of only one experience under Category II B shall be allowed in one academic year. The convener/ In-charge shall be entitled mark(s) allotted to each category of experience. Similarly, the member (s) of Committee shall also be entitled for 0.25 mark for each Committee up to maximum marks allotted above. In case of repetition of any assignment/Committee under Category II (B) (ii & (iii), the maximum marks allotted above, shall be allowed.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TABLE 4: PART III ACADEMIC / RESEARCH SCORE */}
      <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-sm">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th colSpan={4} className={headerBanner}>
                III. ACADEMIC / RESEARCH SCORE — Maximum 32.5 Marks
              </th>
            </tr>
            <tr>
              <th className={`${thStyle} w-16`}>SR.</th>
              <th className={`${thStyle} text-left`} colSpan={2}>Particulars</th>
              <th className={`${thStyle} w-56`}>Marks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdCenter}>1</td>
              <td className={tdStyle} colSpan={2}>Research Score above 110 as per the criteria given in Appendix II, Table 2.</td>
              <td className={tdStyle}>0.3 mark for each 1 Research Score above 110</td>
            </tr>
            <tr>
              <th colSpan={4} className="bg-slate-100 p-2 text-center text-xs font-bold text-slate-800 border border-slate-300">
                (Methodology for Calculating Academic/Research Score)<br />
                <span className="font-normal italic text-[11px]">Memo No. 7/79-2017 C-IV(3) Dated 11-11-2022, Higher Education Department, Haryana</span><br />
                <span className="font-bold text-xs">Appendix II, Table 2</span><br />
                <span className="font-normal text-[11px] text-slate-600">(Assessment must be based on evidence produced by the teacher such as copy of publications, project sanction letter, utilization and completion certificates issued by the University and acknowledgments for patent filing and approval letters, students' Ph.D. award letter, etc.)</span>
              </th>
            </tr>
            <tr>
              <th className={`${thStyle} w-14`}>S.No.</th>
              <th className={`${thStyle} text-left`}>Academic / Research Activity</th>
              <th className={`${thStyle} w-44`}>Faculty of Sciences / Engg. / Agriculture / Medical / Veterinary Sciences</th>
              <th className={`${thStyle} w-52`}>Faculty of Languages / Humanities / Arts / Social Sciences / Library / Education / Physical Education / Commerce / Management</th>
            </tr>
            <tr>
              <td className={tdCenter}>1</td>
              <td className={tdStyle}>Research Papers Published in Peer-Reviewed or UGC listed Journals</td>
              <td className={tdCenter}>08 per paper</td>
              <td className={tdCenter}>10 per paper</td>
            </tr>
            <tr>
              <td colSpan={4} className="p-2 font-bold text-xs text-slate-800 bg-slate-50 border border-slate-300">
                2. Publications (other than Research papers)
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="p-2 font-semibold text-xs text-slate-700 bg-white border border-slate-300">
                (a) Books authored which are published by:
              </td>
            </tr>
            {[
              ["International publishers", "12", "12"],
              ["National Publishers", "10", "10"],
              ["Chapter in Edited Book", "05", "05"],
              ["Editor of Book by International Publisher", "10", "10"],
              ["Editor of Book by National Publisher", "08", "08"]
            ].map(([label, s1, s2], i) => (
              <tr key={i}>
                <td className={tdCenter}></td>
                <td className={`${tdStyle} pl-6`}>{label}</td>
                <td className={tdCenter}>{s1}</td>
                <td className={tdCenter}>{s2}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={4} className="p-2 font-semibold text-xs text-slate-700 bg-white border border-slate-300">
                (b) Translation works in Indian and Foreign Languages by qualified faculties:
              </td>
            </tr>
            {[
              ["Chapter or Research paper", "03", "03"],
              ["Book", "08", "08"]
            ].map(([label, s1, s2], i) => (
              <tr key={i}>
                <td className={tdCenter}></td>
                <td className={`${tdStyle} pl-6`}>{label}</td>
                <td className={tdCenter}>{s1}</td>
                <td className={tdCenter}>{s2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
