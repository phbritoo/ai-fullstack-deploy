'use client'

import { updatedEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from "react-autosave"

const Editor = ({ entry }) => {
      const [value, setValue] = useState(entry.content)
      const [isLoading, setIdLoading] = useState(false)
      const [analysis, setAnalysis] = useState(entry.analysis || {})

      const { mood, summary, color, subject, negative, sentimentScore } = analysis
      const analysisData = [
            { name: 'Summary', value: summary },
            { name: 'Subject', value: subject },
            { name: 'Mood', value: mood },
            { name: 'SentimentScore', value: sentimentScore },
            { name: 'Negative', value: negative ? 'True' : 'False' },
      ]

      useAutosave({
            data: value,
            onSave: async (_value) => {
                  setIdLoading(true)
                  const data = await updatedEntry(entry.id, _value)
                  setAnalysis(data.analysis)
                  setIdLoading(false)
            }
      })

      return (
            <div className="w-full h-full grid grid-cols-3 gap-0">
                  <div className="col-span-2">
                        {isLoading && (<div> ...loading</div>)}
                        <textarea
                              className="w-full h-full p-8 text-xl outline-none"
                              value={value}
                              onChange={e => setValue(e.target.value)}
                        />
                  </div>
                  <div className="border-l border-black/10">
                        <div className=" px-6 py-10" style={{ backgroundColor: color }}>
                              <h2 className="text-2xl">Analysis</h2>
                        </div>
                        <div>
                              <ul>
                                    {analysisData.map((item) => (
                                          <li
                                                key={item.name}
                                                className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
                                                <span className="text-lg font-semibold">{item.name}</span>
                                                <span>{item.value}</span>
                                          </li>
                                    ))}
                              </ul>
                        </div>
                  </div>
            </div>
      )
}

export default Editor