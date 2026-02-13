import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MCPFlow - No-code MCP workflow builder for AI agent orchestration',
  description: 'Value Proposition: Visual workflow builder for Model Context Protocol orchestration, enabling non-technical teams to create AI agent workflows without coding, reducing implementation time from weeks to hours.

Target Customer: Enterprise AI teams, digital agencies, and SaaS companies building AI features who need to orchestrate multiple AI models and tools without deep technical expertise.

---
Category: B2B SaaS
Target Market: Enterprise AI teams, digital agencies, and SaaS companies building AI features who need to orchestrate multiple AI models and tools without deep technical expertise.
Source Hypothesis ID: ab20a358-d1e9-4767-849e-caedd68b3eae
Promotion Type: automatic',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <nav className="border-b">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
              <a href="/" className="font-bold text-lg">MCPFlow - No-code MCP workflow builder for AI agent orchestration</a>
              <div className="flex items-center gap-4">
                <a href="/dashboard" className="text-sm hover:text-blue-600">Dashboard</a>
                <a href="/pricing" className="text-sm hover:text-blue-600">Pricing</a>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
