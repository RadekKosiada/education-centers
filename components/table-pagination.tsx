"use client";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { rowsPerPage } from "@/lib/table-categories";

export function TablePagination({ coursesLength }: { coursesLength: number }) {
    console.log("Courses length in TablePagination:", coursesLength);
    const numberOfPages = Math.ceil(coursesLength / rowsPerPage);
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                {Array.from({ length: numberOfPages }, (_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink href="#" isActive={i === 0}>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
