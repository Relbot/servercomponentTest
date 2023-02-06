import { Suspense } from "react";
import ClientChange from "../components/ClientChange"
import ServerChange from "../components/ServerChange";


export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  
 const num = searchParams?.num as string
  
 console.log(num);
 
 if (!num) {
  return <div>
    Kein Param
  </div>
 }

  
  return (
      <section className='md:px-[15rem] sm:px-[3rem] px-[2rem] flex justify-center items-center mt-4 md:mt-12'>
        <Suspense fallback={<div>Loading...</div>}>
          <ServerChange num={num}/>
        </Suspense>
        <ClientChange/>
      </section>
  )
}
