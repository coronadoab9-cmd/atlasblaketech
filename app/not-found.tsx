import Link from "next/link";
import Footer from "./components/Footer";
import { Icon } from "./components/Icons";
import Navbar from "./components/Navbar";

export default function NotFound() {
  return <main><Navbar/><section className="grid min-h-[68vh] place-items-center bg-[#f6f9fd] px-6 py-24 text-center"><div><p className="text-sm font-extrabold uppercase tracking-[.22em] text-[#1265df]">404</p><h1 className="mt-5 text-5xl font-extrabold tracking-[-.05em] text-[#071a33] md:text-7xl">This page moved or does not exist.</h1><p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#607991]">Use the updated AtlasBlake navigation or return to the homepage.</p><Link href="/" className="button-primary mt-9">Return Home<Icon name="arrow" className="h-5 w-5"/></Link></div></section><Footer/></main>;
}
