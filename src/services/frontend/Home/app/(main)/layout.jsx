import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-muted/50 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
