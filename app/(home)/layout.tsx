export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-default flex min-h-full w-full flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto w-full max-w-5xl md:max-w-3xl xl:max-w-full">
        {children}
      </div>
    </section>
  );
}
