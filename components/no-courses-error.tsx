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
                    <IconError404 color="oklch(0.577 0.245 27.325)" />
                </EmptyMedia>
                <EmptyTitle className="text-destructive">Oops...</EmptyTitle>
                <EmptyDescription className="max-w-xs text-pretty text-destructive">
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
