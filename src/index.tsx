import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

// @ts-ignore
import App from './App.tsx';

const rootElement = document.getElementById('root');
render(<ChakraProvider><App /></ChakraProvider>, rootElement);
