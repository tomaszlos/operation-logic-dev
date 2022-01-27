import React from 'react';
import { Box } from '@chakra-ui/react';
// @ts-ignore
import OperationBuilder from './components/operation-builder.tsx';
// @ts-ignore
import ArgumentEditor from './components/argument-editor.tsx';
// @ts-ignore
import useLogicalOperations from './hooks/useLogicalOperations.ts';
import styles from './components/argument-editor.module.css';

export default function App() {
  const logicalOperations = useLogicalOperations();

  return (
    <div>
      <ArgumentEditor logicalOperations={logicalOperations} />
      <OperationBuilder logicalOperations={logicalOperations} />
      <Box m={3} borderWidth="1px" borderRadius="lg">
        <Box
          isTruncated
          p={4}
          className={styles.header}
        >
          <Box
            fontWeight="bold"
            as="h2"
          >
            Result
          </Box>
          <Box
            fontWeight="bold"
          >
            {typeof logicalOperations.result !== 'undefined' ? logicalOperations.result.toString() : '-'}
          </Box>
        </Box>
      </Box>
    </div>
  );
}
