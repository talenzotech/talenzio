import React, { forwardRef } from 'react'
import { ResumeData } from './types'

interface Props {
  data: ResumeData;
}

const ResumePreview = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const { layout } = data;

  if (layout === 'modern') {
    return <ModernLayout data={data} ref={ref} />
  }
  if (layout === 'minimalist') {
    return <MinimalistLayout data={data} ref={ref} />
  }
  
  return <ClassicLayout data={data} ref={ref} />
})

ResumePreview.displayName = 'ResumePreview'

// --- CLASSIC LAYOUT ---
const ClassicLayout = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;
  return (
    <div ref={ref} className="bg-white text-gray-900 mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '20mm', fontFamily: "'Times New Roman', Times, serif", boxSizing: 'border-box' }}>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-sm space-x-2 text-gray-700 flex flex-wrap justify-center gap-y-1">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <><span className="mx-1">•</span><span>{personalInfo.phone}</span></>}
          {personalInfo.location && <><span className="mx-1">•</span><span>{personalInfo.location}</span></>}
        </div>
        <div className="text-sm space-x-2 text-gray-700 flex flex-wrap justify-center mt-1 gap-y-1">
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.portfolio && <><span className="mx-1">•</span><span>{personalInfo.portfolio}</span></>}
        </div>
      </div>

      {summary && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-2 pb-1">Professional Summary</h2>
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-2 pb-1">Experience</h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold">{exp.title}</h3>
                  <span className="text-sm italic">{exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm">{exp.company}</span>
                  <span className="text-sm italic">{exp.location}</span>
                </div>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-2 pb-1">Education</h2>
          <div className="space-y-3">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold">{edu.institution}</h3>
                  <span className="text-sm italic">{edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ''}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm">{edu.degree}</span>
                  <span className="text-sm italic">{edu.location}</span>
                </div>
                {edu.gpa && <p className="text-sm mt-1">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-2 pb-1">Projects</h2>
          <div className="space-y-3">
            {projects.map(proj => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-sm font-bold">{proj.title}</h3>
                  {proj.link && <span className="text-sm text-gray-600">| {proj.link}</span>}
                </div>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-2 pb-1">Skills</h2>
          <p className="text-sm leading-relaxed">{skills}</p>
        </div>
      )}
    </div>
  )
})
ClassicLayout.displayName = 'ClassicLayout'

// --- MODERN LAYOUT ---
const ModernLayout = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;
  return (
    <div ref={ref} className="bg-white text-gray-900 mx-auto flex flex-col" style={{ width: '210mm', minHeight: '297mm', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box' }}>
      
      {/* Modern Header */}
      <div className="bg-blue-800 text-white p-8" style={{ padding: '30px 40px' }}>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-blue-100 mt-4">
          {personalInfo.email && <div className="flex items-center gap-1">✉ {personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-1">☎ {personalInfo.phone}</div>}
          {personalInfo.location && <div className="flex items-center gap-1">📍 {personalInfo.location}</div>}
          {personalInfo.linkedin && <div className="flex items-center gap-1">in {personalInfo.linkedin}</div>}
          {personalInfo.portfolio && <div className="flex items-center gap-1">🔗 {personalInfo.portfolio}</div>}
        </div>
      </div>

      <div className="flex-1" style={{ padding: '40px' }}>
        {summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-800 uppercase tracking-wider mb-2">Professional Summary</h2>
            <div className="w-12 h-1 bg-blue-800 mb-3"></div>
            <p className="text-sm whitespace-pre-wrap leading-relaxed text-gray-700">{summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            {experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-blue-800 uppercase tracking-wider mb-2">Experience</h2>
                <div className="w-12 h-1 bg-blue-800 mb-3"></div>
                <div className="space-y-5">
                  {experience.map(exp => (
                    <div key={exp.id}>
                      <h3 className="text-md font-bold text-gray-900">{exp.title}</h3>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">{exp.company} • {exp.location}</span>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">{exp.startDate} - {exp.endDate || 'Present'}</span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-blue-800 uppercase tracking-wider mb-2">Projects</h2>
                <div className="w-12 h-1 bg-blue-800 mb-3"></div>
                <div className="space-y-4">
                  {projects.map(proj => (
                    <div key={proj.id}>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-md font-bold text-gray-900">{proj.title}</h3>
                        {proj.link && <span className="text-xs text-blue-600">{proj.link}</span>}
                      </div>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed text-gray-700">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-span-1">
            {education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-blue-800 uppercase tracking-wider mb-2">Education</h2>
                <div className="w-12 h-1 bg-blue-800 mb-3"></div>
                <div className="space-y-4">
                  {education.map(edu => (
                    <div key={edu.id}>
                      <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                      <p className="text-xs text-gray-500 mt-1">{edu.startDate} - {edu.endDate}</p>
                      {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {skills && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-blue-800 uppercase tracking-wider mb-2">Skills</h2>
                <div className="w-12 h-1 bg-blue-800 mb-3"></div>
                <p className="text-sm leading-relaxed text-gray-700">{skills}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})
ModernLayout.displayName = 'ModernLayout'


// --- MINIMALIST LAYOUT ---
const MinimalistLayout = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;
  return (
    <div ref={ref} className="bg-white text-gray-900 mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '20mm', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", boxSizing: 'border-box' }}>
      <div className="mb-10">
        <h1 className="text-4xl font-light tracking-tight mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-xs text-gray-500 flex flex-wrap gap-3">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-8 grid grid-cols-4 gap-4">
          <div className="col-span-1 text-sm font-semibold text-gray-400 uppercase tracking-widest">Profile</div>
          <div className="col-span-3 text-sm leading-relaxed">{summary}</div>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-8 grid grid-cols-4 gap-4">
          <div className="col-span-1 text-sm font-semibold text-gray-400 uppercase tracking-widest">Experience</div>
          <div className="col-span-3 space-y-6">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-medium">{exp.title}, {exp.company}</h3>
                  <span className="text-xs text-gray-500">{exp.startDate} — {exp.endDate || 'Present'}</span>
                </div>
                <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-8 grid grid-cols-4 gap-4">
          <div className="col-span-1 text-sm font-semibold text-gray-400 uppercase tracking-widest">Projects</div>
          <div className="col-span-3 space-y-4">
            {projects.map(proj => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-sm font-medium">{proj.title}</h3>
                  {proj.link && <span className="text-xs text-gray-500">{proj.link}</span>}
                </div>
                <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-8 grid grid-cols-4 gap-4">
          <div className="col-span-1 text-sm font-semibold text-gray-400 uppercase tracking-widest">Education</div>
          <div className="col-span-3 space-y-4">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-medium">{edu.degree}</h3>
                  <span className="text-xs text-gray-500">{edu.startDate} — {edu.endDate}</span>
                </div>
                <p className="text-sm text-gray-600">{edu.institution}, {edu.location}</p>
                {edu.gpa && <p className="text-xs text-gray-500 mt-1">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {skills && (
        <div className="mb-8 grid grid-cols-4 gap-4">
          <div className="col-span-1 text-sm font-semibold text-gray-400 uppercase tracking-widest">Skills</div>
          <div className="col-span-3 text-sm leading-relaxed text-gray-600">{skills}</div>
        </div>
      )}
    </div>
  )
})
MinimalistLayout.displayName = 'MinimalistLayout'

export default ResumePreview
