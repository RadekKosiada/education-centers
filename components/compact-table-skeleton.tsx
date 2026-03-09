import { formatDate } from "@/lib/utils";
import { CustomLink } from "./ui/custom-link";
import { Skeleton } from "./ui/skeleton";

export function CompactTableSkeleton({ courses }: { courses: Array<any> }) {

    return (
        <div className="">
            {/* <Skeleton /> */}
            <div>
                {courses.map(course => {

                    const cellClasses = "flex justify-between border-b last-of-type:border-b-0 md:last-of-type:border-b-1 md:table-cell md:justify-normal md:border-b-1";
                    return (
                        <div key={course.guid} className={`flex flex-col border-4 border-b-0 last-of-type:border-t-4 last-of-type:border-b-4 md:table-row md:border-none py-1`}>
                            <div className={cellClasses}>
                                <Skeleton className="w-1/3 h-4 self-center md:hidden" />
                            </div>
                            < div className={cellClasses}>
                                <Skeleton className="w-1/3 h-8 self-center md:hidden" />
                                <CustomLink href={'/'} variant="link">
                                    {course.name}
                                </CustomLink>
                            </div>
                            <div className={cellClasses}>
                                <Skeleton className="w-1/3 h-8 self-center md:hidden" />
                                {formatDate(course.beginn_datum)}</div>
                            <div className={cellClasses}>
                                <Skeleton className="w-1/3 h-8 self-center md:hidden" />
                                <span className="text-right md:text-left">
                                    {course.preis.betrag}</span>
                            </div>
                            <div className={cellClasses}>
                                <Skeleton className="w-1/3 h-8 self-center md:hidden" />
                            </div>
                            <div className={cellClasses}>
                                <Skeleton className="w-1/3 h-8 self-center md:hidden" />
                                {course.veranstaltungsart}</div>
                            <div className={cellClasses}>
                                <Skeleton className="w-1/3 h-8 self-center md:hidden" />
                                {course.bezirk}</div>
                        </div>
                    )
                })
                }
            </div>
        </div >
    );
}