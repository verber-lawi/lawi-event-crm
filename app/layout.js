import "./globals.css";

export const metadata = {
  title: "Lawi Event CRM",
  description: "CRM mobile para eventos — Lawi LawTech",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#003366" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='28' font-size='28'>⚖️</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
