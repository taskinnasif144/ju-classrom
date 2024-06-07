import Sidebar from "@/components/sidebar/Sidebar";
import { Inter, Montserrat } from "next/font/google";

const inter = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex pl-[70px]">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
