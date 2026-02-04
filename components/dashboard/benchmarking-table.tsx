"use client"

const benchmarkData = [
    { nbrMarque: "10.000", secteur: "Tech", famille: "Smartphones" },
    { nbrMarque: "20.000", secteur: "Tech", famille: "Pc portable" },
    { nbrMarque: "30.000", secteur: "Tech", famille: "Imprimantes" },
    { nbrMarque: "30.000", secteur: "Tech", famille: "Tv" },
    { nbrMarque: "30.000", secteur: "Tech", famille: "Gaming" },
    { nbrMarque: "25.000", secteur: "Alimentaire", famille: "Huile" },
    { nbrMarque: "25.000", secteur: "Alimentaire", famille: "Tomates" },
    { nbrMarque: "25.000", secteur: "Alimentaire", famille: "Tomates" },
    { nbrMarque: "30.000", secteur: "Imprimantes", famille: "Imprimantes" },
    { nbrMarque: "30.000", secteur: "Tech", famille: "Tv" },
    { nbrMarque: "30.000", secteur: "Tech", famille: "Gaming" },
]

export function BenchmarkingTable() {
    return (
        <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Benchmarking avancé</h3>

            <div className="overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="pb-3 text-left text-xs font-medium text-purple">Nbr marque</th>
                            <th className="pb-3 text-left text-xs font-medium text-purple">Secteur</th>
                            <th className="pb-3 text-left text-xs font-medium text-purple">Famille</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {benchmarkData.map((row, index) => (
                            <tr key={index} className="text-sm">
                                <td className="py-2.5 text-foreground">{row.nbrMarque}</td>
                                <td className="py-2.5 text-muted-foreground">{row.secteur}</td>
                                <td className="py-2.5 text-muted-foreground">{row.famille}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
