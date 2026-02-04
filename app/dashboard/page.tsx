import { DashboardHeader } from "@/components/dashboard/header"
import { StatCards } from "@/components/dashboard/stat-cards"
import { PerformanceChart, PredictionChart } from "@/components/dashboard/dashboard-charts"
import { BenchmarkingTable } from "@/components/dashboard/benchmarking-table"

export default function DashboardPage() {
    return (
        <div className="min-h-screen">
            <DashboardHeader title="Overview" />

            <main className="p-6">
                {/* Stat Cards */}
                <StatCards />

                {/* Charts Section */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                    {/* Performance Chart & Prediction - 2 columns */}
                    <div className="col-span-2 flex flex-col gap-4">
                        <PerformanceChart />
                        <PredictionChart />
                    </div>

                    {/* Benchmarking Table - 1 column */}
                    <div>
                        <BenchmarkingTable />
                    </div>
                </div>

            </main>
        </div>
    )
}
