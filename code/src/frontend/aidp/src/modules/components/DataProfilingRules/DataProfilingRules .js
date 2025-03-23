import React from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const Field = styled.strong`
  color: #333;
  font-size: 1.1rem;
  font-weight: bold;
`;

const DataProfilingRules = ({ rules }) => {
  return (
    <Container>
      <Heading>Data Profiling Rules</Heading>
      <List>
        {rules.map((rule, index) => (
          <ListItem key={index}>
            <Field>{rule.field}</Field>: {rule.description}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DataProfilingRules;