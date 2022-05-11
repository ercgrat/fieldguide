import React, { useCallback, useState } from 'react';
import { NextPage } from 'next';
import { DatePicker } from '@mantine/dates';
import { Button, Card, Container, Group, Stack, Text } from '@mantine/core';

const Home: NextPage = () => {
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
            <Text>Due Date</Text>
            <DatePicker
              clearable={false}
              onChange={handleDateChange}
              placeholder="Pick dates range"
              value={date}
            />
          </Group>
          <Button
            onClick={handleClick}
          >
            Submit
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default Home;
