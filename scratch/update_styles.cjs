const fs = require('fs');
const path = 'd:/Projects/JatCollegeweb/AIJHM-Recruitment-Portal-Frontend/src/components/form/FieldRenderer.jsx';
let content = fs.readFileSync(path, 'utf-8');

// Update standard text inputs
content = content.replace(/className=\{\`w-full px-3\.5 py-2\.5 text-sm rounded-lg outline-none transition bg-white border \$\{([\s\S]*?)\}\`\}/g, (match, p1) => {
    return `className={\`w-full px-3.5 py-2.5 text-base rounded-lg outline-none transition bg-white border \${${p1.replace(/border-slate-300/g, 'border-slate-400')}}\`}`;
});

// Update standard textarea
content = content.replace(/className=\{\`w-full px-3\.5 py-2\.5 text-sm bg-white border rounded-lg outline-none transition \$\{([\s\S]*?)\}\`\}/g, (match, p1) => {
    return `className={\`w-full px-3.5 py-2.5 text-base bg-white border rounded-lg outline-none transition \${${p1.replace(/border-slate-300/g, 'border-slate-400')}}\`}`;
});

// Update heading to span 2 columns and look like image
content = content.replace(/<div key=\{field\.id\} className=\{\`mb-6 \$\{field\.tableRow \? 'mt-8' : ''\}\`\}>([\s\S]*?)<h3 className="text-sm font-bold text-slate-800 bg-blue-50\/50 p-3 rounded-lg border border-blue-100\/50">/, 
    `<div key={field.id} className={\`col-span-1 md:col-span-2 mb-6 \${field.tableRow ? 'mt-8' : ''}\`}>\n          <h3 className="text-base font-bold text-slate-800 bg-slate-50/80 p-3 rounded-lg border border-slate-300 text-center">`);

// Update label sizes
content = content.replace(/text-xs font-bold text-slate-700/g, 'text-sm font-bold text-slate-700');

fs.writeFileSync(path, content);
console.log('Updated FieldRenderer.jsx styles');
