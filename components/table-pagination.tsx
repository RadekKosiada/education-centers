"use client";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

export function TablePagination({
    currentPage,
    coursesLength,
    handlePageNumberChange
}: {
    currentPage: string,
    coursesLength: number,
    handlePageNumberChange: (pageNumber: string) => void
}) {
    // const numberOfPages = Math.ceil(coursesLength / rowsPerPage);
    const numberOfPages = 3;
    console.log("Current page:", currentPage);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href='#' />
                </PaginationItem>
                {Array.from({ length: numberOfPages }, (_, i) => (
                    <PaginationItem key={i} onClick={() => handlePageNumberChange((i + 1).toString())}>
                        <PaginationLink isActive={Number(currentPage) === (i + 1)} href='#'>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href={`/?page=${Number(currentPage) + 1}`} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
