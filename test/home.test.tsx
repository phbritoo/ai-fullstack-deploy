import Home from '../app/page'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

vi.mock('@clerck/next.js', () => {
      return {
            auth: () => new Promise((resolve) => resolve({ userId: "user_2aiukbx0d7fcUvVdmqm8kSGK3Og" })),
            ClerkProvider: ({ children }) => <div>{children}</div>,
            useUser: () => ({
                  isSignedIn: true,
                  user: {
                        id: 'user_2aiukbx0d7fcUvVdmqm8kSGK3Og',
                        fullName: 'Paulo Brito',
                  },
            }),
      }
})

test('Home', async () => {
      render(await Home())
      expect(screen.getByText('get started')).toBeTruthy()
})