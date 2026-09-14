import React from 'react';

export default function SelectionCriteriaTables() {
  const thStyle = "p-2.5 border border-slate-300 bg-slate-100 text-slate-800 font-bold text-xs md:text-sm text-center";
  const thLeft = "p-2.5 border border-slate-300 bg-slate-100 text-slate-800 font-bold text-xs md:text-sm text-left";
  const tdStyle = "p-2.5 border border-slate-300 text-xs md:text-sm text-slate-800 leading-normal";
  const tdCenter = "p-2.5 border border-slate-300 text-xs md:text-sm text-slate-800 text-center font-semibold";

  return (
    <div className="space-y-6 my-4 font-sans text-slate-800">
      {/* ================= REVISED CRITERIA TITLE (WITHOUT BOX) ================= */}
      <div className="py-2 px-1 text-center">
        <p className="text-xs md:text-sm font-bold text-slate-800 leading-relaxed m-0">
          Revised criteria for the recruitment of Assistant Professor and Principals in Govt. Aided Private Colleges in State of Haryana with reference to: Memo No. KW 8/36-2009 C-IV(3) dated 18/04/2023 and Memo no. KW 8/36-2009 C-IV(3) dated 12.12.2022
        </p>
      </div>

      {/* ================= MAIN TITLE AS PER IMAGE 1 ================= */}
      {/* <div className="text-center py-2 border-b-2 border-slate-300">
        <h2 className="text-sm md:text-base font-extrabold uppercase tracking-wide text-slate-900">
          CRITERIA FOR SELECTION OF PRINCIPALS IN GOVT. AIDED PRIVATE COLLEGES IN THE STATE OF HARYANA
        </h2>
      </div> */}

      {/* ================= OVERALL SUMMARY BREAKDOWN TABLE (IMAGE 1) ================= */}
      <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-sm">
        <table className="w-full border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300">
              <th className="p-2.5 text-left font-bold text-slate-800">Category</th>
              <th className="p-2.5 text-right font-bold text-slate-800 w-36">Marks</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200 hover:bg-slate-50">
              <td className="p-2.5 font-medium text-slate-800">I. Academic Record</td>
              <td className="p-2.5 text-right font-semibold text-slate-800">20 Marks</td>
            </tr>
            <tr className="border-b border-slate-200 hover:bg-slate-50">
              <td className="p-2.5 font-medium text-slate-800">II. Teaching Experience and Assessment of Administrative Skill</td>
              <td className="p-2.5 text-right font-semibold text-slate-800">35 Marks</td>
            </tr>
            <tr className="border-b border-slate-200 hover:bg-slate-50">
              <td className="p-2.5 font-medium text-slate-800">III. Academic/Research Score</td>
              <td className="p-2.5 text-right font-semibold text-slate-800">32.5 Marks</td>
            </tr>
            <tr className="border-b border-slate-200 hover:bg-slate-50">
              <td className="p-2.5 font-medium text-slate-800">IV. Interview</td>
              <td className="p-2.5 text-right font-semibold text-slate-800">12.5 Marks</td>
            </tr>
            <tr className="bg-blue-50/80 font-bold border-t-2 border-slate-300 text-blue-900">
              <td className="p-2.5 uppercase font-bold">TOTAL:</td>
              <td className="p-2.5 text-right font-extrabold text-blue-900">100 Marks</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= CATEGORY I: ACADEMIC RECORD (IMAGE 1) ================= */}
      <div className="space-y-2">
        <h3 className="font-bold text-xs md:text-sm text-slate-900">
          I. Academic Record: Maximum 20 marks
        </h3>
        <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-sm">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr>
                <th className={`${thStyle} w-16`}>Sr. No.</th>
                <th className={thLeft}>Particulars</th>
                <th className={`${thLeft} min-w-[240px]`}>Marks</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50">
                <td className={tdCenter}>1</td>
                <td className={tdStyle}>Above 55 % marks in Master's degree</td>
                <td className={tdStyle}>0.5 mark for each percentage<br />(maximum 5 marks)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className={tdCenter}>2</td>
                <td className={tdStyle}>Above 55 % marks in Graduation</td>
                <td className={tdStyle}>0.4 mark for each percentage<br />(maximum 5 marks)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className={tdCenter}>3</td>
                <td className={tdStyle}>Above 55 % marks in 10+2/Prep.</td>
                <td className={tdStyle}>0.3 mark for each percentage<br />(maximum 5 marks)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className={tdCenter}>4</td>
                <td className={tdStyle}>Above 55 % marks in Matriculation</td>
                <td className={tdStyle}>0.2 mark for each percentage<br />(maximum 5 marks)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= CATEGORY II: TEACHING & ADMINISTRATIVE SKILL (IMAGES 1, 2, 3) ================= */}
      <div className="space-y-3">
        <h3 className="font-bold text-xs md:text-sm text-slate-900">
          II. Teaching Experience and Assessment of Administrative Skill: Maximum 35 marks
        </h3>

        {/* II. A. Teaching Experience */}
        <div className="space-y-1.5 pl-0 md:pl-2">
          <h4 className="font-bold text-xs md:text-sm text-slate-800">
            A. Teaching Experience: Maximum 10 marks
          </h4>
          <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-sm">
            <table className="w-full border-collapse text-xs md:text-sm">
              <thead>
                <tr>
                  <th className={`${thStyle} w-16`}>Sr. No.</th>
                  <th className={thLeft}>Particulars</th>
                  <th className={`${thLeft} min-w-[240px]`}>Marks</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-slate-50">
                  <td className={tdCenter}>1</td>
                  <td className={tdStyle}>Above 15 years teaching experience</td>
                  <td className={tdStyle}>1 mark for each year</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* II. B. Assessment of Administrative Skill */}
        <div className="space-y-3 pl-0 md:pl-2 pt-2">
          <h4 className="font-bold text-xs md:text-sm text-slate-800">
            B. Assessment of Administrative Skill: Maximum 25 marks
          </h4>

          {/* (i) Experience of Administrative Responsibilities */}
          <div className="space-y-1.5">
            <h5 className="font-bold text-xs md:text-sm text-slate-700">
              (i) Experience of Administrative Responsibilities
            </h5>
            <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-sm">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead>
                  <tr>
                    <th className={`${thStyle} w-16`}>Sr. No.</th>
                    <th className={thLeft}>Particulars</th>
                    <th className={`${thLeft} min-w-[240px]`}>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-slate-50">
                    <td className={tdCenter}>1</td>
                    <td className={tdStyle}>Experience as Joint/Deputy/Assistant Director in Directorate of Higher Education, Haryana</td>
                    <td className={tdStyle}>1 mark for each year</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className={tdCenter}>2</td>
                    <td className={tdStyle}>Experience as Registrar or any other administrative post in any University</td>
                    <td className={tdStyle}>1 mark for each year</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className={tdCenter}>3</td>
                    <td className={tdStyle}>Experience as Head of the Higher Education Institution i.e. Principal, Officiating Principal/DDO</td>
                    <td className={tdStyle}>1 mark for each year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* (ii) Experience of Key responsibilities in colleges (IMAGE 2) */}
          <div className="space-y-1.5">
            <h5 className="font-bold text-xs md:text-sm text-slate-700">
              (ii) Experience of Key responsibilities in colleges
            </h5>
            <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-sm">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead>
                  <tr>
                    <th className={`${thStyle} w-16`}>Sr. No.</th>
                    <th className={thLeft}>Particulars</th>
                    <th className={`${thLeft} min-w-[240px]`}>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { no: '1', name: 'Staff Representative or V.C. Nominee in Managing Committee of any College', marks: '1 mark for each year maximum upto 3 marks' },
                    { no: '2', name: 'Co-ordinator or Organizing Secretary of International/National/State Conference/Event', marks: '1 mark for each event maximum upto 3 marks' },
                    { no: '3', name: 'Bursar', marks: '1 mark for each year maximum upto 3 marks' },
                    { no: '4', name: 'NSS Programme Officer', marks: '1 mark for each year maximum upto 3 marks' },
                    { no: '5', name: 'YRC Counsellor', marks: '1 mark for each year maximum upto 3 marks' },
                    { no: '6', name: 'Hostel Warden', marks: '1 mark for each year maximum upto 3 marks' },
                    { no: '7', name: 'Member of any Statutory Body of University', marks: '1 mark for each year maximum upto 2 marks' },
                    { no: '8', name: 'Experience as Associate NCC Officer in HEI (s)', marks: '1 mark for each year maximum upto 3 marks' }
                  ].map((row) => (
                    <tr key={row.no} className="hover:bg-slate-50">
                      <td className={tdCenter}>{row.no}</td>
                      <td className={tdStyle}>{row.name}</td>
                      <td className={tdStyle}>{row.marks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* (iii) Experience of Committees in College (IMAGES 2 & 3) */}
          <div className="space-y-1.5">
            <h5 className="font-bold text-xs md:text-sm text-slate-700">
              (iii) Experience of Committees in College
            </h5>
            <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-sm">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead>
                  <tr>
                    <th className={`${thStyle} w-16`}>Sr. No.</th>
                    <th className={thLeft}>Particulars</th>
                    <th className={`${thLeft} min-w-[240px]`}>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    'Co-ordinator IQAC',
                    'Editor in Chief, College Magazine',
                    'Member, College Advisory Council',
                    'Convenor, University Work Committee',
                    'Convenor, Cultural Affairs Committee',
                    'Convenor, Purchase/Procurement Committee',
                    'Convenor, Building/Works Committee',
                    'Convenor, Sports Committee',
                    'Convenor, Discipline Committee',
                    'Convenor, Internal (Complaint)Committee',
                    'Convenor, Road Safety Club',
                    'Convenor, Red Ribbon Club',
                    'Convenor, Eco Club',
                    'In-charge, Placement Cell',
                    'In-charge, Women Cell',
                    'In-charge, Time-table Committee',
                    'In-charge, SC/BC Committee'
                  ].map((name, idx) => (
                    <tr key={idx + 1} className="hover:bg-slate-50">
                      <td className={tdCenter}>{idx + 1}</td>
                      <td className={tdStyle}>{name}</td>
                      <td className={tdStyle}>1 mark for each academic year maximum upto 2 marks</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CATEGORY III: ACADEMIC/RESEARCH SCORE (IMAGE 3) ================= */}
      <div className="space-y-2">
        <h3 className="font-bold text-xs md:text-sm text-slate-900">
          III. Academic/Research Score: Maximum 32.5 marks
        </h3>
        <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-sm">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr>
                <th className={`${thStyle} w-16`}>Sr. No.</th>
                <th className={thLeft}>Particulars</th>
                <th className={`${thLeft} min-w-[240px]`}>Marks</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50">
                <td className={tdCenter}>1</td>
                <td className={tdStyle}>Research Score above 110as per the criteria given in Appendix II,Table2.</td>
                <td className={tdStyle}>0.3 mark for each 1 Research Score above 110</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= CATEGORY IV: INTERVIEW (IMAGE 4) ================= */}
      <div className="space-y-2">
        <h3 className="font-bold text-xs md:text-sm text-slate-900">
          IV. Interview: 12.5 marks
        </h3>
        <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-sm">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr>
                <th className={`${thStyle} w-16`}>Sr. No.</th>
                <th className={thLeft}>Particulars</th>
                <th className={`${thLeft} min-w-[240px]`}>Marks</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50">
                <td className={tdCenter}>1</td>
                <td className={tdStyle}>Knowledge of Service rules, financial matters & ICT tools</td>
                <td className={tdStyle}>4 Marks</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className={tdCenter}>2</td>
                <td className={tdStyle}>Leadership Qualities and Decision- making power</td>
                <td className={tdStyle}>5.5 Marks</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className={tdCenter}>3</td>
                <td className={tdStyle}>Overall Personality</td>
                <td className={tdStyle}>3 Marks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= OFFICIAL NOTES & CONDITIONS (IMAGE 4) ================= */}
      <div className="space-y-3 pt-2 text-xs md:text-sm text-slate-700 leading-relaxed">
        <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-3 text-amber-900">
          <p className="m-0">
            Marks of only one experience under Category II B shall be allowed in one academic year. The convenor/In-charge shall be entitled mark (s) allotted to each category of experience. Similarly, the member (s) of Committee shall also be entitled for 0.25 mark for each Committee up to maximum marks allotted above. In case of repetition of any assignment/Committee under Category II (B) (ii) & (iii), the maximum marks allotted above, shall be allowed.
          </p>
        </div>

        <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3 text-slate-800">
          <p className="m-0">
            Performance in interview shall be assessed on the basis of above-mentioned criteria. Each member of Selection Committee shall assess candidates and shall assign marks individually in all the three sub-categories mentioned at IV above. For selection, marks obtained by candidates in Categories I to III will be added to the average marks assigned by all members of Selection Committee.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
          <p className="font-bold text-slate-900 m-0 mb-1">Note:</p>
          <ul className="list-disc pl-5 m-0 space-y-1 text-slate-700">
            <li>
              Teaching experience of candidates shall be considered only in case of teaching the concerned subject after acquiring eligibility qualifications determined by the Govt.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/*
========================================================================================
PREVIOUS IMPLEMENTATION (COMMENTED OUT AS PER USER REQUEST - "isko comment krde bhai"):
========================================================================================

function PreviousSelectionCriteriaTables() {
  const thStyle = "p-2.5 border border-slate-300 bg-slate-100 text-slate-800 font-bold text-xs text-center";
  const tdStyle = "p-2.5 border border-slate-300 text-xs text-slate-700";
  const tdCenter = "p-2.5 border border-slate-300 text-xs text-slate-700 text-center";
  const headerBanner = "bg-slate-200 text-slate-800 font-bold text-xs md:text-sm p-2.5 text-center border border-slate-300";

  return (
    <div className="space-y-6 my-4 font-sans">
      <div className="text-center italic text-xs md:text-sm text-slate-600">
        Memo No. KW8/36-2009 C-IV(3) Dated 18-04-2023, Higher Education Department, Haryana
      </div>

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
========================================================================================
*/

