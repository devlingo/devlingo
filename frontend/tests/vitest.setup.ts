import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

declare module 'vitest' {
	type Assertion<T = any> = TestingLibraryMatchers<T, void>;
}

expect.extend(matchers);
