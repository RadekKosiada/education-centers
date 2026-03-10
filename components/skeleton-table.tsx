import { Skeleton } from "@/components/ui/skeleton"
import { tableHeadsLabels } from "@/lib/table-categories"

export function SkeletonTable() {
    return (
        <div className="flex w-full flex-col gap-2">
            {Array.from({ length: 15 }).map((_, index) => (
                <div className="flex gap-4" key={index}>
                    {tableHeadsLabels.map(label => (
                        <Skeleton className="h-8 flex-1 py-2" key={label.column} />
                    ))}
                </div>
            ))}
        </div>
    )
}
