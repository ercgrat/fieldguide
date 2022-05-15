import React, { useCallback, useState } from 'react';
import { NextPage } from 'next';
import { DatePicker } from '@mantine/dates';
import { Button, Card, Container, Group, Stack, Text } from '@mantine/core';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';

const Home: NextPage = () => {
  const intl = useIntl();
  const [date, setDate] = useState<Date>(new Date());

  const handleDateChange = useCallback((newDate: Date | null) => {
    if(newDate) {
      setDate(newDate);
    }
  }, []);

  const handleClick = useCallback(() => {
    alert('Save!');
  }, []);

  return (
    <Container>
      <Card shadow="sm">
        <Stack>
          <Group>
            <Text>
              <FormattedMessage
                defaultMessage="Due date"
                description="No, I'd rather not"
              />
            </Text>
            <DatePicker
              clearable={false}
              onChange={handleDateChange}
              placeholder={intl.formatMessage(defineMessage({
                defaultMessage: 'Pick date range',
                description: 'Placeholder message when selecting a date range'
              }))}
              value={date}
            />
          </Group>
          <Button
            onClick={handleClick}
          >
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
