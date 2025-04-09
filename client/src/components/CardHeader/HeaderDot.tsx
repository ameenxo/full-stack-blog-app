"use client"
import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs';

export default function HeaderDot() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isTouch, setIsTouch] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Detect touch devices
    useEffect(() => {
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsTouch(hasTouch);
    }, []);

    // Close on outside click (optional)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = () => {
        if (isTouch) {
            setIsOpen((prev: boolean) => !prev);
        }
    };

    return (
        <div
            className="relative mr-2"
            ref={dropdownRef}
            onMouseEnter={() => !isTouch && setIsOpen(true)}
            onMouseLeave={() => !isTouch && setIsOpen(false)}
            onClick={handleToggle}
        >
            <BsThreeDots className="h-6 w-6 cursor-pointer" />

            {isOpen && (
                <div className="absolute right-0 top-6 w-24 bg-white border rounded shadow z-50">
                    <p className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-sm">Edit</p>
                    <p className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-sm">Delete</p>

                    {isTouch && (
                        <p
                            className="px-2 py-1 text-red-500 hover:bg-gray-100 cursor-pointer text-sm text-center"
                            onClick={() => setIsOpen(false)}
                        >
                            Close
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
