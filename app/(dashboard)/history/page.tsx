import HistoryCharts from "@/components/HistoryChart"
import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getData = async () => {
      const user = await getUserByClerkID()
      const analyses = await prisma.analysis.findMany({
            where: {
                  userId: user.id,

            },
            orderBy: {
                  createdAt: "asc"
            }
      })

      const sum = analyses.reduce((all, current) => { return all + current.sentimentScore }, 0)
      const avg = sum / analyses.length
      return { analyses, avg }
}

const History = async () => {
      const { avg, analyses } = await getData()
      return (
            <div className="h-full px-6 py-8">
                  <div>
                        <h1 className="text-2xl mb-4">{`Avg. Sentiment: ${avg}`}</h1>
                  </div>
                  <div className="h-full w-full">
                        <HistoryCharts data={analyses} />
                  </div>
            </div>
      )
}

export default History