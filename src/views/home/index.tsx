import { useState } from 'react';

import ButtonStatusCall from '@/components/core/table/btn-status-call';
import {
  ActionIcon,
  Box,
  Button,
  createStyles,
  Group,
  rem,
  ScrollArea,
  Select,
  Table,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { usePagination } from '@mantine/hooks';
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconDots,
  IconPencil,
  IconPhoneCall,
  IconPhoneIncoming,
  IconPlayerPlay,
} from '@tabler/icons-react';

const useStyles = createStyles(() => ({
  table: {
    borderCollapse: 'separate',
    padding: '0px 24px',
    marginBottom: '30px',
    borderSpacing: 0,
    '& th, & td': { border: '0 !important', whiteSpace: 'pre' },
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

const HomePage = () => {
  const { classes } = useStyles();
  const [record, setRecord] = useState<string | null>('10');
  const { active, next, previous, range, setPage } = usePagination({ total: record ? Math.ceil(100 / +record) : 10 });

  return (
    <>
      <ScrollArea>
        <Table className={classes.table} horizontalSpacing="md" verticalSpacing="xs" highlightOnHover>
          <thead>
            <tr>
              <th>Thoi gian</th>
              <th>Ten khach hang</th>
              <th>Dau so goi</th>
              <th>Dau so tiep nhan</th>
              <th>
                <Text className="text-center">Tong thoi gian</Text>
              </th>
              <th>Loai cuoc goi</th>
              <th>Trang thai</th>
              <th>Ghi am</th>
              <th>Ghi chu</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {/* <tr>
              <td colSpan={10}>
                <Box className="grid place-content-center h-[300px]">
                  <Text>No data</Text>
                  <IconTrack />
                </Box>
              </td>
            </tr> */}
            {Array.from({ length: record ? +record : 10 }, (_, idx) => (
              <tr key={idx}>
                <td>12/12/2022 12:23</td>
                <td>Nguyen Văn A</td>
                <td>0929 828 882</td>
                <td>17</td>
                <td>
                  <Text className="text-center">02:23</Text>
                </td>
                <td>
                  <Box className="flex items-center gap-2">
                    <IconPhoneIncoming size={16} color="blue" />
                    <Text>Cuộc gọi đến</Text>
                  </Box>
                </td>
                <td>
                  <ButtonStatusCall status="success" />
                </td>
                <td>
                  <Box className="flex items-center gap-2">
                    <ThemeIcon variant="light" className="rounded-full">
                      <IconPlayerPlay size={14} />
                    </ThemeIcon>
                    <Text>02:23</Text>
                  </Box>
                </td>
                <td>Ghi chú</td>
                <td>
                  <Box className="flex items-center">
                    <ActionIcon variant="subtle">
                      <IconPhoneCall size={16} />
                    </ActionIcon>

                    <ActionIcon variant="subtle">
                      <IconPencil size={16} />
                    </ActionIcon>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>

      <Box className="px-6 flex justify-between items-center">
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
              typeof item === 'number' ? <Text color={active === item ? 'gray.0' : 'blue'}>{item}</Text> : <IconDots />;
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
    </>
  );
};
export default HomePage;
