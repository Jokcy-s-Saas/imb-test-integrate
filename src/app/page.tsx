import dynamic from "next/dynamic";

const UploadImage = dynamic(() => import("./UploadImage"), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <UploadImage></UploadImage>
    </main>
  );
}
