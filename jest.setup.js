import '@testing-library/jest-native/extend-expect';
import { beforeEach, jest } from '@jest/globals';
import 'react-native-gesture-handler/jestSetup';
import { render } from '@testing-library/react-native';

beforeEach(() => jest.useFakeTimers());


// @ts-ignore

global.__reanimatedWorkletInit = jest.fn();


/* jest.mock('react-native/Libraries/Utilities/BackHandler', () => {
  return jest.requireActual(
    'react-native/Libraries/Utilities/__mocks__/BackHandler.js',
  );
}); */

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
