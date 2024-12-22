"use client";

import { Button } from "@/components/ui/button";
import { usePremiumModal } from "@/hooks";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

interface CreateResumeButtonProps {
    canCreate: boolean;
}

export default function CreateResumeButton({
    canCreate,
}: CreateResumeButtonProps) {
    const premiumModal = usePremiumModal();

    if (canCreate) {
        return (
            <Button asChild className="ml-auto flex w-fit gap-2">
                <Link href="/editor">
                    <PlusSquare className="size-5" />
                    New resume
                </Link>
            </Button>
        );
    }

    return (
        <Button
            onClick={() => premiumModal.setOpen(true)}
            className="ml-auto flex w-fit gap-2"
        >
            <PlusSquare className="size-5" />
            New resume
        </Button>
    );
}
