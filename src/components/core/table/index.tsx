import { useState } from 'react';

import { ActionIcon, Box, Button, createStyles, Group, rem, ScrollArea, Select, Table, Text } from '@mantine/core';
import { usePagination } from '@mantine/hooks';
import { IconChevronDown, IconChevronLeft, IconChevronRight, IconDots } from '@tabler/icons-react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { IProColumn, IProPaginationProps } from './type';

interface IProps<T> {
  loading: boolean;
  data: T[];
  columns: IProColumn<T>;
  pagination?: IProPaginationProps;
}

const ProTable = <T extends object>(props: IProps<T>) => {
  const { classes } = useStyles();
  const { loading, data, columns, pagination } = props;
  const { getHeaderGroups, getRowModel } = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [record, setRecord] = useState<string | null>('10');
  const { active, next, previous, range, setPage } = usePagination({ total: record ? Math.ceil(100 / +record) : 10 });

  return (
    <>
      <ScrollArea>
        <Table className={classes.table} horizontalSpacing="md" verticalSpacing="xs" highlightOnHover>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const { align } = header.column.columnDef.meta || {};
                  const width = header.getSize();
                  const maxWidth = header.column.columnDef.maxSize;
                  const minWidth = header.column.columnDef.minSize;
                  return (
                    <th key={header.id} style={{ textAlign: align, width, maxWidth, minWidth }}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {getRowModel().rows.map((row) => (
              <tr key={row.id} tabIndex={-1}>
                {row.getVisibleCells().map((cell) => {
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>

      {pagination && (
        <Box className="flex justify-between items-center">
          <Group>
            <Text c="gray.6">Hiển thị</Text>
            <Select
              className={classes.select}
              variant="unstyled"
              value={record}
              onChange={(e) => {
                setRecord(e);
              }}
              data={['10', '25', '50', '100']}
              radius="md"
              rightSection={<IconChevronDown color="blue" size={16} />}
              styles={{ rightSection: { pointerEvents: 'none' } }}
            />
            <Text c="gray.6">trên trang</Text>
          </Group>

          <Group spacing={5} position="left">
            <Button
              variant="subtle"
              color="gray"
              compact
              // disabled={active === 1}
              rightIcon={<IconChevronLeft size={16} color="blue" />}
              onClick={() => previous()}
            >
              <Text c="gray.6">Trước</Text>
            </Button>

            {range.map((item, idx) => {
              const res =
                typeof item === 'number' ? (
                  <Text color={active === item ? 'gray.0' : 'blue'}>{item}</Text>
                ) : (
                  <IconDots />
                );
              return (
                <ActionIcon
                  key={idx}
                  variant={active === item ? 'filled' : 'transparent'}
                  className="rounded-full"
                  color={active === item ? 'blue' : 'transparent'}
                  onClick={() => setPage(+item)}
                >
                  {res}
                </ActionIcon>
              );
            })}

            <Button
              variant="subtle"
              compact
              color="gray"
              leftIcon={<IconChevronRight size={16} color="blue" />}
              onClick={() => next()}
              // disabled={active === 10}
            >
              <Text c="gray.6">Tiếp</Text>
            </Button>
          </Group>
        </Box>
      )}
    </>
  );
};

const useStyles = createStyles(() => ({
  table: {
    borderCollapse: 'separate',
    padding: '0px 24px',
    marginBottom: '30px',
    borderSpacing: 0,
    '& th, & td': { border: '0 !important' },
    // '&[data-hover] tbody tr:hover': {},

    '& thead': {
      height: rem(40),
      backgroundColor: '#F4F7FF',
      'th:first-of-type': {
        borderTopLeftRadius: rem(10),
        borderEndStartRadius: rem(10),
      },
      'th:last-of-type': {
        borderTopRightRadius: rem(10),
        borderEndEndRadius: rem(10),
      },
    },

    '& tbody': {
      borderRadius: rem(10),
      backgroundColor: '#ffffff',
      boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.05)',

      tr: { height: rem(42) },

      'tr:first-of-type': {
        borderTopRadius: rem(10),
        backgroundColor: 'transparent',

        'td:first-of-type': { borderTopLeftRadius: rem(10) },
        'td:last-child': { borderTopRightRadius: rem(10) },
      },
      'tr:last-child': {
        '& td:first-of-type': { borderEndStartRadius: rem(10) },
        '& td:last-child': { borderEndEndRadius: rem(10) },
      },
    },
  },

  select: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
    borderRadius: '5px',
    width: rem(70),

    '& input[type=search]': {
      padding: '0px 10px',
      color: 'blue',
      fontWeight: 600,
    },
  },
}));
