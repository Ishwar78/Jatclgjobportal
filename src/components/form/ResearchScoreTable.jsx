import React from 'react';

export default function ResearchScoreTable({ values = {}, errors = {}, onValueChange }) {
  const handleChange = (id, val) => {
    onValueChange(id, val);
  };

  const total = [
    'resPapers', 'resBooksInt', 'resBooksNat', 'resChapter', 'resEditorInt', 'resEditorNat',
    'resTransChapter', 'resTransBook', 'resIctPedagogy', 'resIctCurricula', 'resMoocs4Quad',
    'resMoocsModule', 'resMoocsContent', 'resMoocsCoord', 'resEcontentComplete', 'resEcontentModule',
    'resEcontentContrib', 'resEcontentEditor', 'resPhd', 'resMphil', 'resProjMore10', 'resProjLess10',
    'resProjOngoingMore10', 'resProjOngoingLess10', 'resConsultancy', 'resPatentInt', 'resPatentNat',
    'resPolicyInt', 'resPolicyNat', 'resPolicyState', 'resAwardInt', 'resAwardNat', 'resInvitedIntAbroad',
    'resInvitedIntWithin', 'resInvitedNat', 'resInvitedState'
  ].reduce((sum, key) => sum + (parseFloat(values[key]) || 0), 0);

  // Update total if changed
  React.useEffect(() => {
    if (parseFloat(values['resTotal']) !== total) {
      onValueChange('resTotal', total);
    }
  }, [total, values, onValueChange]);

  const renderRow = (sno, activity, capSc, capArts, id) => (
    <tr key={id} className="border-b border-slate-200 hover:bg-slate-50 transition">
      <td className="p-3 text-sm font-semibold text-slate-700 whitespace-nowrap text-center align-top">{sno}</td>
      <td className="p-3 text-sm text-slate-800 leading-snug align-top">{activity}</td>
      <td className="p-3 text-sm text-slate-600 text-center align-middle whitespace-pre-line">{capSc}</td>
      <td className="p-3 text-sm text-slate-600 text-center align-middle whitespace-pre-line">{capArts}</td>
      <td className="p-3 align-middle w-32">
        <input
          type="number"
          step="any"
          value={values[id] || ''}
          onChange={(e) => handleChange(id, e.target.value)}
          className={`w-full px-2 py-1.5 text-center text-sm font-bold bg-white border rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
            errors[id] ? 'border-red-500' : 'border-slate-300'
          }`}
        />
      </td>
    </tr>
  );

  const renderHeaderRow = (sno, title) => (
    <tr key={title} className="bg-slate-50 border-y border-slate-200">
      <td className="p-3 text-sm font-bold text-slate-900 text-center whitespace-nowrap">{sno}</td>
      <td colSpan={4} className="p-3 text-sm font-bold text-slate-900">{title}</td>
    </tr>
  );

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-300 shadow-sm bg-white font-sans mt-4">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="bg-slate-100/80 border-b border-slate-300 text-slate-700">
            <th className="p-4 font-bold text-sm w-16 text-center align-bottom border-r border-slate-200">S.No.</th>
            <th className="p-4 font-bold text-sm align-bottom border-r border-slate-200">Academic/Research Activity</th>
            <th className="p-4 font-bold text-sm text-center align-bottom border-r border-slate-200 w-40">
              Faculty of Sciences / Engineering / Agriculture / Medical / Veterinary Sciences
            </th>
            <th className="p-4 font-bold text-sm text-center align-bottom border-r border-slate-200 w-48">
              Faculty of Languages / Humanities / Arts / Social Sciences / Library / Education / Physical Education / Commerce / Management & other related disciplines
            </th>
            <th className="p-4 font-bold text-sm text-center align-bottom w-32">Self Appraisal Marks</th>
          </tr>
        </thead>
        <tbody>
          {renderRow('1.', 
            <>For Direct Recruitment:<br/>Research Papers in Peer-reviewed / UGC Journals upto 13.06.2019 and UGC CARE Listed Journals w.e.f. 14.06.2019<br/><br/>For Career Advancement Scheme:<br/>Research Papers in Peer-reviewed / UGC Journals upto 02.07.2023 and UGC CARE Listed Journals w.e.f. 03.07.2023</>,
            '8', '10', 'resPapers')}
          
          {renderHeaderRow('2.', 'Publications (other than Research papers)')}
          {renderHeaderRow('(a)', 'Books authored which are published by:')}
          {renderRow('', 'International publishers', '12', '12', 'resBooksInt')}
          {renderRow('', 'National Publishers', '10', '10', 'resBooksNat')}
          {renderRow('', 'Chapter in Edited Book', '05', '05', 'resChapter')}
          {renderRow('', 'Editor of Book by International Publisher', '10', '10', 'resEditorInt')}
          {renderRow('', 'Editor of Book by National Publisher', '08', '08', 'resEditorNat')}

          {renderHeaderRow('(b)', 'Translation works in Indian and Foreign Languages by qualified faculties')}
          {renderRow('', 'Chapter or Research paper', '03', '03', 'resTransChapter')}
          {renderRow('', 'Book', '08', '08', 'resTransBook')}

          {renderHeaderRow('3.', 'Creation of ICT mediated Teaching Learning pedagogy and content and development of new and innovative courses and curricula')}
          {renderRow('(a)', 'Development of Innovative pedagogy', '05', '05', 'resIctPedagogy')}
          {renderRow('(b)', 'Design of new curricula and courses', '02 per curricula/course', '02 per curricula/course', 'resIctCurricula')}
          
          {renderHeaderRow('(c)', 'MOOCs')}
          {renderRow('', 'Development of complete MOOCs in 4 quadrants (4 credit course) — In case of MOOCs of lesser credits, 05 marks/credit', '20', '20', 'resMoocs4Quad')}
          {renderRow('', 'MOOCs (developed in 4 quadrant) per module/lecture', '05', '05', 'resMoocsModule')}
          {renderRow('', 'Content writer/subject matter expert for each module of MOOCs (at least one quadrant)', '02', '02', 'resMoocsContent')}
          {renderRow('', 'Course Coordinator for MOOCs (4 credit course) — In case of MOOCs of lesser credits, 02 marks/credit', '08', '08', 'resMoocsCoord')}

          {renderHeaderRow('(d)', 'E-Content')}
          {renderRow('', 'Development of e-Content in 4 quadrants for a complete course/e-book', '12', '12', 'resEcontentComplete')}
          {renderRow('', 'e-Content (developed in 4 quadrants) per module', '05', '05', 'resEcontentModule')}
          {renderRow('', 'Contribution to development of e-content module in complete course/paper/e-book (at least one quadrant)', '02', '02', 'resEcontentContrib')}
          {renderRow('', 'Editor of e-content for complete course/paper/e-book', '10', '10', 'resEcontentEditor')}

          {renderHeaderRow('4.', '(a) Research Guidance')}
          {renderRow('', 'Ph.D.\n(10 per degree awarded, 05 per thesis submitted)', '10 / 05', '10 / 05', 'resPhd')}
          {renderRow('', 'M.Phil. / P.G. dissertation', '02 per degree\nawarded', '02 per degree\nawarded', 'resMphil')}

          {renderHeaderRow('(b)', 'Research Projects Completed')}
          {renderRow('', 'More than 10 lakhs', '10', '10', 'resProjMore10')}
          {renderRow('', 'Less than 10 lakhs', '05', '05', 'resProjLess10')}

          {renderHeaderRow('(c)', 'Research Projects Ongoing:')}
          {renderRow('', 'More than 10 lakhs', '05', '05', 'resProjOngoingMore10')}
          {renderRow('', 'Less than 10 lakhs', '02', '02', 'resProjOngoingLess10')}

          {renderRow('(d)', 'Consultancy', '03', '03', 'resConsultancy')}

          {renderHeaderRow('5.', '(a) Patents')}
          {renderRow('', 'International', '10', '10', 'resPatentInt')}
          {renderRow('', 'National', '07', '07', 'resPatentNat')}

          {renderHeaderRow('(b)', '*Policy Document (Submitted to an International body/organisation like UNO/UNESCO/World Bank/International Monetary Fund etc. or Central Government or State Government)')}
          {renderRow('', 'International', '10', '10', 'resPolicyInt')}
          {renderRow('', 'National', '07', '07', 'resPolicyNat')}
          {renderRow('', 'State', '04', '04', 'resPolicyState')}

          {renderHeaderRow('(c)', 'Awards / Fellowship')}
          {renderRow('', 'International', '07', '07', 'resAwardInt')}
          {renderRow('', 'National', '05', '05', 'resAwardNat')}

          {renderHeaderRow('6.', '*Invited lectures / Resource Person / paper presentation in Seminars / Conferences / full paper in Conference Proceedings (Paper presented in Seminars/Conferences and also published as full paper in Conference Proceedings will be counted only once)')}
          {renderRow('', 'International (Abroad)', '07', '07', 'resInvitedIntAbroad')}
          {renderRow('', 'International (within country)', '05', '05', 'resInvitedIntWithin')}
          {renderRow('', 'National', '03', '03', 'resInvitedNat')}
          {renderRow('', 'State/University', '02', '02', 'resInvitedState')}

          <tr className="bg-blue-50/50 border-t-2 border-slate-300">
            <td className="p-4 font-bold text-slate-800 text-center">7.</td>
            <td colSpan={3} className="p-4 font-bold text-slate-800">Total Academic Research Score as per Table 2</td>
            <td className="p-4 align-middle">
              <div className="w-full px-2 py-1.5 text-center text-sm font-bold bg-slate-100 border border-slate-300 rounded-md text-blue-800">
                {total || 0}
              </div>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}
