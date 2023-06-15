import { ReactNode, useState } from 'react';

import { LinksGroup } from '@/components/@mantine/navbar-link-group';
import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  createStyles,
  Group,
  Navbar,
  rem,
  ScrollArea,
  SegmentedControl,
  Text,
  Title,
} from '@mantine/core';
import { IconBell, IconGauge, IconLayoutCards, IconNotes } from '@tabler/icons-react';

import BoxLink from '../core/box-link';
import { Logo } from './logo';

interface IProps {
  children: ReactNode;
}

const mock_data = [
  { label: 'Dashboard', icon: IconGauge, link: '/dashboard' },
  { label: 'Home', icon: IconLayoutCards, link: '/home' },
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Overview', link: '/overview' },
      { label: 'Forecasts', link: '/forecasts' },
      { label: 'Outlook', link: '/outlook' },
      { label: 'Real time', link: '/real-time' },
    ],
  },
];
const mock_avatar =
  'https://scontent-hkt1-1.xx.fbcdn.net/v/t39.30808-6/340101543_507915518041305_1914778087821673539_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=hccF0q7h2gcAX8suvhP&_nc_ht=scontent-hkt1-1.xx&oh=00_AfB0RtNTpQy7jMxgdLsjikiJSCmTzezsxwvloWbIF8zF9g&oe=6437FCEA';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    borderRight: 0,
    boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.05)',
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    // borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },

  links: {
    marginTop: '10vh',
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
}));

const LayoutMain = ({ children }: IProps) => {
  const { classes } = useStyles();
  const links = mock_data.map((item) => <LinksGroup {...item} key={item.label} />);
  const [lang, setLang] = useState('vn');

  return (
    <Box display={'flex'}>
      <Navbar width={{ sm: 300 }} p="md" pos={'fixed'} pb={0} className={classes.navbar}>
        <Navbar.Section className={classes.header}>
          <Group position="apart">
            <BoxLink to="/">
              <Logo width={rem(120)} />
            </BoxLink>
          </Group>
        </Navbar.Section>

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>
      </Navbar>
      <Box w={300}></Box>

      <Box className="w-[calc(100vw-300px)] py-6">
        <header className="flex justify-between items-center px-6 mb-6">
          <Title order={3}>Hello world</Title>

          <Group>
            <ActionIcon color="blue">
              <IconBell />
            </ActionIcon>
            <Avatar src={mock_avatar} radius={'xl'} />
            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                Admin Deep
              </Text>

              <Text color="blue">1234092</Text>
            </div>
            <SegmentedControl
              value={lang}
              onChange={(value: 'en' | 'vn') => setLang(value)}
              data={[
                {
                  value: 'vn',
                  label: (
                    <Center>
                      <Text>VN</Text>
                    </Center>
                  ),
                },
                {
                  value: 'en',
                  label: (
                    <Center>
                      <Text>EN</Text>
                    </Center>
                  ),
                },
              ]}
            />
          </Group>
        </header>

        <Box className="h-max">{children}</Box>
      </Box>
    </Box>
  );
};

export default LayoutMain;
