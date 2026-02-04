import React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-background">
            <DashboardSidebar />
            <div className="pl-56">
                {children}
            </div>
        </div>
    )
}
