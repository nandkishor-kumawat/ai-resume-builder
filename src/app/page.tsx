import logo from "@/assets/logo.png";
import resumePreview from "@/assets/r.jpeg";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-dvh flex flex-col md:overflow-hidden overflow-auto">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-gray-100 dark:bg-gray-800 dark:text-gray-100 px-5 py-12 text-center text-gray-900 md:flex-row md:text-start lg:gap-12">
        <div className="max-w-prose space-y-3">
          <Image
            src={logo}
            alt="Logo"
            width={150}
            height={150}
            className="mx-auto md:ms-0"
          />
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Create the{" "}
            <span className="inline-block bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Perfect Resume
            </span>{" "}
            in Minutes
          </h1>
          <p className="text-lg text-gray-500">
            Our <span className="font-bold">AI resume builder</span> helps you
            design a professional resume, even if you&apos;re not very smart.
          </p>
          <Button asChild size="lg" variant="premium">
            <Link href="/resumes">Get started</Link>
          </Button>
        </div>
        <div>
          <Image
            src={resumePreview}
            alt="Resume preview"
            width={600}
            className="shadow-md lg:rotate-[1.5deg]"
          />
        </div>
      </main>
    </div>
  );
}
