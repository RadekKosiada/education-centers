import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { IconError404 } from "@tabler/icons-react";
import { RefreshCcwIcon } from "lucide-react";

export function NoCoursesError() {
    return (
        <Empty className="bg-muted/30 h-full">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconError404 />
                </EmptyMedia>
                <EmptyTitle>Oops...</EmptyTitle>
                <EmptyDescription className="max-w-xs text-pretty">
                    Sorry, we couldn't load the courses right now. Please try again later.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button variant="outline">
                    <RefreshCcwIcon />
                    Refresh
                </Button>
            </EmptyContent>
        </Empty>
    )
}
