import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type Status = {
    value: string;
    label: string;
};

export function StatusList({
    statusList,
    value,
    onSelect,
}: {
    statusList: Status[] | undefined;
    value?: Status;
    onSelect?: (pram: string | null) => void;
}) {
    const [open, setOpen] = React.useState(false);
    const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(value ?? null);

    React.useEffect(() => {
        onSelect?.(selectedStatus?.value || null);
    }, [selectedStatus, open, onSelect]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-start text-[#637587] bg-[#F0F2F5] border-0 rounded-xl placeholder:font-normal"
                >
                    {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <StatusItemList setOpen={setOpen} setSelectedStatus={setSelectedStatus} statusList={statusList} />
            </PopoverContent>
        </Popover>
    );
}

function StatusItemList({
    statusList,
    setOpen,
    setSelectedStatus,
}: {
    statusList: { value: string; label: string }[] | undefined;
    setOpen: (open: boolean) => void;
    setSelectedStatus: (status: Status | null) => void;
}) {
    return (
        <Command
            filter={(value, search) => {
                const returnedObj = statusList?.find((status) => status.label.toLowerCase().includes(search));
                if (returnedObj?.value === value) return 1;
                return 0;
            }}
        >
            <CommandInput placeholder="Filter status..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {statusList?.map((status) => (
                        <CommandItem
                            key={status.label}
                            value={status.value}
                            onSelect={(value) => {
                                setSelectedStatus(statusList?.find((status) => status.value === value) || null);
                                setOpen(false);
                            }}
                        >
                            {status.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
