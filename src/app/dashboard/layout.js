'use client'

import {
  DynamicContextProvider,
  DynamicWidget,
} from '@dynamic-labs/sdk-react-core'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import {
  createConfig,
  WagmiProvider,
} from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http } from 'viem'
import { mainnet } from 'viem/chains'

import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import Link from 'next/link'

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
})

const queryClient = new QueryClient()

export default function DashboardLayout({ children }) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID,
        walletConnectors: [EthereumWalletConnectors],
        cssOverrides: `
.button--padding-large {
  padding: .5rem 1rem;
  border-radius: .5rem;
}
`
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <div className="px-2">
              <header className="border-b border-neutral-300 shadow">
                <nav className="flex items-center justify-between max-w-7xl mx-auto h-12">
                  <Link href="/" className="font-bold text-[#254EFB] font-display">Waptcha</Link>
                  <DynamicWidget
                    innerButtonComponent="Log in"
                  />
                </nav>
              </header>
              <main className="max-w-7xl mx-auto py-8">
                {children}
              </main>
            </div>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  )
}
