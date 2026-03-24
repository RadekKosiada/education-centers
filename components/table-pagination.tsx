"use client";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink
} from "@/components/ui/pagination";
import { rowsPerPage } from "@/lib/table-categories";

export function TablePagination({
    currentPage,
    coursesLength,
    handlePageNumberChange
}: {
    currentPage: string,
    coursesLength: number,
    handlePageNumberChange: (pageNumber: string) => void
}) {
    const numberOfPages = Math.ceil(coursesLength / rowsPerPage);
    console.log(currentPage);
    return (
        <Pagination>
            <PaginationContent className="flex-wrap">
                {/* <PaginationItem>
                    <PaginationPrevious href='#' />
                </PaginationItem> */}
                {Array.from({ length: numberOfPages }, (_, i) => (
                    <PaginationItem key={i} onClick={() => handlePageNumberChange((i + 1).toString())}>
                        <PaginationLink href='#' isActive={currentPage === (i + 1).toString()}>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                {/* <PaginationItem>
                    <PaginationNext href={`/?page=${Number(currentPage) + 1}`} />
                </PaginationItem> */}
            </PaginationContent>
        </Pagination>
    )
}
