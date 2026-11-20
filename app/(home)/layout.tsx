export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-default flex min-h-full w-full flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto w-full max-w-5xl">
        {children}
      </div>
    </section>
  );
}