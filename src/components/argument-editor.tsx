import React, { useState } from 'react';
import { Button, Box, Divider } from '@chakra-ui/react';
// @ts-ignore
import { ILogicalOperations } from '../hooks/useLogicalOperations.ts';
// @ts-ignore
import { AddArgumentModal } from './modals/add-argument.tsx';
// @ts-ignore
import { ArgumentItem } from './argument-item.tsx';

import styles from './argument-editor.module.css';

export interface ArgumentAdderProps {
  logicalOperations: ILogicalOperations;
}

function ArgumentEditor({ logicalOperations }: ArgumentAdderProps): React.ReactElement {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { args } = logicalOperations;
  const argNames = Object.keys(args);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const valueChange = (name: string, value: boolean) => {
    logicalOperations.updateArg({
      name,
      value,
    });
  };

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
          Arguments
        </Box>
        <Box display="flex">
          <Button
            style={{
              float: 'right',
            }}
            onClick={logicalOperations.clearArgs}
            disabled={!argNames.length}
          >
            Clear
          </Button>
          <Button
            style={{
              float: 'right',
            }}
            colorScheme="blue"
            onClick={openModal}
            ml={2}
          >
            Add argument
          </Button>
        </Box>
      </Box>
      <Divider />
      {!argNames.length
        && (<div className={styles.info_msg}>No arguments added</div>)}
      {argNames.map((v) => (
        <ArgumentItem
          name={v}
          value={args[v]}
          valueChange={valueChange}
          key={v}
        />
      ))}
      <AddArgumentModal
        isOpen={modalOpen}
        onClose={closeModal}
        logicalOperations={logicalOperations}
      />
    </Box>
  );
}

export default ArgumentEditor;
