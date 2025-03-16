import LoginButton from "@/components/LoginButton";
import { getServerSession } from "next-auth";
import MainImage from '../../public/undraw_online-resume_z4sp.svg';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function Home() {

  const session = await getServerSession();

  return (
    <div className=" bg-white  dark:bg-black">
      <section className="max-w-6xl mx-auto px-3 flex gap-8 py-4 min-h-[calc(100vh-3rem)]">
        <div className="flex-1 flex gap-8 flex-col justify-center">
            <h1 className="text-5xl font-bold">Unlock Your Coding Potential: Learn, Grow, Succeed</h1>
            <p className="text-neutral-600">Online learning platform that provides concise and easy to learn tutorials and documentation on programming languages , general knowledge, career guidence etc.</p>
            <div className="flex  gap-4">
              <Input className="h-12" placeholder="eg: example@email.com" />
              <Button className="h-12">Get Started</Button>
            </div>
        </div>
        <div className="flex-1 flex items-center">
          <Image src={MainImage} alt="Main Image" />
        </div>
      </section>

      {/* Home.. {JSON.stringify(session?.user)} */}
      {/* <LoginButton /> */}

    </div>
  );
}
