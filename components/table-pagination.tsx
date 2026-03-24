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
import { rowsPerPage } from "@/lib/table-categories";


export function TablePagination({
    currentPage,
    coursesLength,
    handlePageNumberChange
}: {
    currentPage: string | null,
    coursesLength: number,
    handlePageNumberChange: (pageNumber: string) => void
}) {
    const numberOfAllPages = Math.ceil(coursesLength / rowsPerPage);
    const numberOfPagesToShow = 3;
    console.log("Current page:", currentPage);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={`/?page=${Number(currentPage) - 1}`} isDisabled={Number(currentPage) === 1}
                        onClick={Number(currentPage) > 1 ? () => handlePageNumberChange((Number(currentPage) - 1).toString()) : undefined}
                    />
                </PaginationItem>
                {Array.from({ length: numberOfPagesToShow }, (_, i) => (
                    <PaginationItem key={i}
                        onClick={() => handlePageNumberChange((i + 1).toString())}
                    >
                        <PaginationLink isActive={Number(currentPage) === (i + 1)} href={`/?page=${(i + 1).toString()}`}>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        isDisabled={Number(currentPage) === numberOfAllPages}
                        onClick={Number(currentPage) < numberOfAllPages ? () => handlePageNumberChange((Number(currentPage) + 1).toString()) : undefined}
                        href={`/?page=${Number(currentPage) + 1}`} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
