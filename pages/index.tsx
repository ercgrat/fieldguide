import { useCallback, useState } from 'react';
import { NextPage } from 'next';
import { DatePicker } from '@mantine/dates';
import {
  Button,
  Card,
  Center,
  Container,
  createStyles,
  Group,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';

import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://gybxqjtroqkyzeudyjhh.supabase.co';

const useStyles = createStyles(theme => ({
  purple: {
    color: theme.colors.purple[5],
    display: 'inline'
  },
  orange: {
    color: theme.colors.orange[5],
    fontStyle: 'italic',
    display: 'inline'
  }
}));

const Home: NextPage = () => {
  const intl = useIntl();
  const [date, setDate] = useState<Date>(new Date());

  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const { classes } = useStyles();

  const handleDateChange = useCallback((newDate: Date | null) => {
    if (newDate) {
      setDate(newDate);
    }
  }, []);

  const handleClick = useCallback(async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email: 'eric.gratta@gmail.com',
        password: 'password'
      });

      if (error) {
        alert(error);
      } else {
        alert(`Success: ${user?.email} (${user?.id})`);
      }
    } catch (e: any) {
      if (e.message) {
        alert(e.message);
      }
    }
  }, [supabase.auth]);

  return (
    <Container>
      <Center>
        <Title className={classes.purple} order={1}>
          Relay
        </Title>
        <Title className={classes.orange} order={1}>
          !
        </Title>
      </Center>
      <Card shadow="sm">
        <Stack>
          <Group>
            <Text>
              <FormattedMessage defaultMessage="Due date" description="No, I'd rather not" />
            </Text>
            <DatePicker
              clearable={false}
              onChange={handleDateChange}
              placeholder={intl.formatMessage(
                defineMessage({
                  defaultMessage: 'Pick date range',
                  description: 'Placeholder message when selecting a date range'
                })
              )}
              value={date}
            />
          </Group>
          <Button onClick={handleClick}>
            <FormattedMessage
              defaultMessage="Save"
              description="Button used to save a selected date range"
            />
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default Home;
