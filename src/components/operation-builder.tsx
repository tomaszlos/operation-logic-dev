import React from 'react';
import { Box, Divider } from '@chakra-ui/react';
import styles from './argument-editor.module.css';
// @ts-ignore
import { ILogicalOperations } from '../hooks/useLogicalOperations.ts';
// @ts-ignore
import { OperationItem } from './operation-item.tsx';

export interface OperationBuilderInterface {
  logicalOperations: ILogicalOperations;
}

function OperationBuilder({ logicalOperations }: OperationBuilderInterface): React.ReactElement {
  return (
    <Box m={3} borderWidth="1px" borderRadius="lg">
      <Box
        isTruncated
        p={4}
        className={styles.header}
      >
        <Box
          fontWeight="bold"
          as="h2"
          lineHeight="tight"
        >
          Operation
        </Box>
      </Box>
      <Divider />
      <OperationItem
        item={logicalOperations.operation}
        updateOperation={logicalOperations.updateOperation}
        args={logicalOperations.args}
      />
    </Box>
  );
}

export default OperationBuilder;
