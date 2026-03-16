'use client';

import { CompactTable } from "@/components/compact-table";

export function TableWrapper({ courses }: { courses: Array<any> }) {
    return (
        <div className="">
            <CompactTable courses={courses} />

        </div>
    )
};