import { IResourceComponentsProps } from '@refinedev/core';

import React from 'react';
import { useTable } from '@refinedev/react-table';
import { Group, Pagination, ScrollArea, Table } from '@mantine/core';
import { DeleteButton, EditButton, List, ShowButton } from '@refinedev/mantine';

export const UsersList: React.FC<IResourceComponentsProps> = (props, context) => {
    console.log(props, context);

    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: 'actions',
                accessorKey: 'id',
                header: 'Actions',
                cell: function render({ getValue }) {
                    return (
                        <Group spacing="xs" noWrap>
                            <ShowButton hideText recordItemId={getValue() as string} />
                            <EditButton hideText recordItemId={getValue() as string} />
                            <DeleteButton hideText recordItemId={getValue() as string} />
                        </Group>
                    );
                },
            },
        ],
        []
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
        },
    }));

    return (
        <List>
            <ScrollArea>
                <Table highlightOnHover>
                    <thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return <th key={header.id}>XXX</th>;
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {getRowModel().rows.map((row) => {
                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return <td key={cell.id}>YYY</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </ScrollArea>
            <br />
            <Pagination position="right" total={pageCount} page={current} onChange={setCurrent} />
        </List>
    );
};
