"use client"

import { Link } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function ClicksChart({ links }: { links: Link[] }) {
  const data = links.map(link => ({
    shortId: link.shortId,
    clicks: link.clicks
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Click Statistics</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            clicks: {
              label: "Clicks",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="shortId" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="clicks" fill="var(--color-clicks)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

