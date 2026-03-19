"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { ChangeEventHandler, KeyboardEventHandler } from "react";

export function SearchInput({ inputValue, handleKeyDown, handleChange }:
    {
        inputValue: string;
        handleKeyDown: KeyboardEventHandler<HTMLButtonElement>;
        handleChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;

    }) {

    return (
        <Field orientation="horizontal">
            <Input type="search" placeholder="Search for courses..." onChange={handleChange} value={inputValue} />
            <Button onKeyDown={handleKeyDown} variant="outline" size="icon" aria-label="search">
                <SearchIcon />
            </Button>

        </Field>
    )
}


