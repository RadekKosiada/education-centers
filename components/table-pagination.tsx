"use client";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink
} from "@/components/ui/pagination";
import { rowsPerPage } from "@/lib/table-categories";
import { useSearchParams } from "next/navigation";


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

    const searchParams = useSearchParams();
    const searchQueryParam = searchParams.get('search') ?? null;
    // const searchParams.get('page') ?? '1';

    return (
        <Pagination>
            <PaginationContent className="flex-wrap">
                {/* <PaginationItem>
                    <PaginationPrevious href='#' />
                </PaginationItem> */}
                {Array.from({ length: numberOfPages }, (_, i) => (
                    <PaginationItem key={i} onClick={() => handlePageNumberChange((i + 1).toString())}>
                        <PaginationLink
                            href={searchQueryParam ? `/?search=${searchQueryParam}&page=${i + 1}` : `page=${i + 1}`}
                            isActive={currentPage === (i + 1).toString()}>
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
