import RootLayout from "@/layout/main";
import { isLocale } from "@/lib/locale";

export { metadata } from "@/layout/main";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <RootLayout lang={isLocale(locale) ? locale : "pt-BR"}>
      {children}
    </RootLayout>
  );
}
