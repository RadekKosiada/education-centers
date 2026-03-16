"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export function SearchInput() {
    const pathname = usePathname();
    const router = useRouter();
    const [inputValue, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSearch = () => {
        if (inputValue) return router.push(`${pathname}?search=${inputValue}`);
        if (!inputValue) return router.push('/');
    };

    useEffect(() => {
        handleSearch();
    }, [inputValue]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        console.log("Key pressed:", e.key, inputValue);
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Field orientation="horizontal">
            <Input type="search" placeholder="Search for courses..." onChange={handleChange} value={inputValue} />
            <Button onKeyDown={handleKeyDown}>Search</Button>
        </Field>
    )
}
