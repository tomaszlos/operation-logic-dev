import React, { useEffect, useState } from 'react';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  Button,
  ModalFooter,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import styles from './add-argument.module.css';

// @ts-ignore
import { ILogicalOperations } from '../../hooks/useLogicalOperations.ts';

export interface IAddArgumentModal {
  isOpen: boolean
  onClose: () => void;
  logicalOperations: ILogicalOperations
}

export function AddArgumentModal({
  isOpen,
  onClose,
  logicalOperations,
}: IAddArgumentModal): React.ReactElement {
  const [argName, setArgName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    setArgName('');
  }, [isOpen]);

  const addArgument = () => {
    const result = logicalOperations.addArg({ name: argName, value: true });

    if (!result) setError('Argument already exists!');
    else onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add argument</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} className={styles.modal_body}>
          <FormControl mt={4}>
            <FormLabel>Argument name</FormLabel>
            <Input
              placeholder="Name"
              value={argName}
              onChange={(evt) => {
                setArgName(evt.target.value);
                setError(null);
              }}
              errorBorderColor="red.500"
              isInvalid={!!error}
            />
          </FormControl>
          {error
            && (
            <Alert status="error" mt={6} mb={0}>
              <AlertIcon />
              <AlertTitle mr={2}>{error}</AlertTitle>
            </Alert>
            )}

        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={addArgument} disabled={!!error || !argName.length}>
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
