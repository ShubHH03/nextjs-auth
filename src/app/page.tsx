import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background to-muted/20">
      <div className="w-full max-w-4xl">
        <div className="bg-card border border-border rounded-lg shadow-lg p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Welcome to Next.js Auth
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A modern authentication system built with Next.js, React, and
              Tailwind CSS. Secure, scalable, and easy to use.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-muted/30 border border-border rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🔐</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Secure Authentication
              </h3>
              <p className="text-sm text-muted-foreground">
                JWT-based authentication with encrypted tokens
              </p>
            </div>

            <div className="bg-muted/30 border border-border rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Fast & Modern
              </h3>
              <p className="text-sm text-muted-foreground">
                Built with Next.js 15 and React for optimal performance
              </p>
            </div>

            <div className="bg-muted/30 border border-border rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Beautiful UI
              </h3>
              <p className="text-sm text-muted-foreground">
                Styled with Tailwind CSS and custom components
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup">
              <Button size="lg" className="cursor-pointer">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="cursor-pointer">
                Log In
              </Button>
            </Link>
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Built with ❤️ using Next.js, TypeScript, MongoDB, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
