export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen w-full bg-black text-white overflow-hidden flex selection:bg-blue-500/30">
            {children}
        </div>
    );
}
