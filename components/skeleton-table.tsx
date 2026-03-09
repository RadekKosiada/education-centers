import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTable({ courses }: { courses: Array<any> }) {
    return (
        <div className="flex w-full max-w-sm flex-col gap-2">
            {courses.map((course, index) => (
                <div className="flex gap-4" key={course.guid}>
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                </div>
            ))}
        </div>
    )
}
