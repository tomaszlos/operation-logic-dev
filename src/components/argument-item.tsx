import React from 'react';

import { Select, Tag } from '@chakra-ui/react';
import styles from './argument-item.module.css';

type ValueChangeFn = (name: string, value: boolean) => void

export interface ArgumentItemProps {
  name: string;
  value: boolean;
  valueChange: ValueChangeFn;
}

export function ArgumentItem({
  name,
  value,
  valueChange,
}: ArgumentItemProps): React.ReactElement {
  return (
    <Tag className={styles.argument_item} pr={4} pl={6} m={3}>
      <div style={{ fontWeight: 'bolder' }}>
        {name}
      </div>
      <div className={styles.select_wrapper}>
        <Select
          bg="#fff"
          value={value.toString()}
          onChange={
            (evt) => valueChange(name, evt.target.value === 'true')
          }
          ml={4}
          mr={4}
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </Select>
      </div>
    </Tag>
  );
}
