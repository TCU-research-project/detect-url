import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavbarFakeNews() {
  const router = useRouter();
  return (
    <>
      <nav className="bg-[#ffffff] rounded-b-xl border-gray-200 px-2 sm:px-4 py-2.5 mb-4">
        <div
          onClick={() => {
            router.push('/');
          }}
          className="container flex flex-wrap items-center justify-between ml-4 mr-2"
        >
          <a href="#" className="flex items-center">
            <Image
              src="/icons/Logo.jpg"
              className="h-6 mr-3 sm:h-[3.25rem]"
              alt="Flowbite Logo"
              width={50}
              height={100}
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap">Nhận diện tin giả</span>
          </a>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 bg-[#b3b3ff] border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-[#b3b3ff]">
              <li>
                <Link
                  href="/"
                  className="block bg-[#b3b3ff] py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/app"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  Tài liệu
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
