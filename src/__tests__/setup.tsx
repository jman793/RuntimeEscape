import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock next/font/google — returns an object with a className string
vi.mock('next/font/google', () => ({
  Roboto: () => ({ className: 'mocked-roboto-font' }),
}));

// Mock next/router
vi.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn().mockResolvedValue(undefined),
    beforePopState: vi.fn(),
    events: { on: vi.fn(), off: vi.fn(), emit: vi.fn() },
    isFallback: false,
    isReady: true,
    isPreview: false,
  }),
}));

// Mock next/head — render children into document body for testability
vi.mock('next/head', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
