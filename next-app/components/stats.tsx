"use client"

import { score } from '@/types/score'
import { CartesianGrid, Cell, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'



export default function Stats({ scores, myscores }: { scores: score[], myscores: score[] }) {

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];


  return (
    <div className="mt-6 max-w-6xl w-full space-y-8 p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div className="space-y-4">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="wpm" name="wpm" />
            <YAxis yAxisId="left" type="number" dataKey="accuracy" name="accuracy" unit="%" />

            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter yAxisId="left" name="scores" data={scores} fill="#8884d8" />
            <Scatter yAxisId="left" name="A school" data={myscores} fill="#8884d8">
              {myscores.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
