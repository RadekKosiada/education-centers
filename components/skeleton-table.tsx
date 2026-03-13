import { Skeleton } from "@/components/ui/skeleton";
import { rowsPerPage, tableHeadsLabels } from "@/lib/table-categories";

export function SkeletonTable() {
    return (
        <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-8 flex-1 py-2 mt-4" />
            {Array.from({ length: rowsPerPage }).map((_, index) => (
                <div className="flex flex-wrap md:flex-nowrap gap-4 my-2" key={index}>
                    {tableHeadsLabels.map(label => (
                        <div key={label.column} className="flex flex-wrap gap-4 w-full">
                            <Skeleton className="h-8 flex-1 py-2 md:hidden" />
                            <Skeleton className="h-8 flex-1 py-2" />
                        </div>

                    ))}
                </div>
            ))}
        </div>
    )
}

