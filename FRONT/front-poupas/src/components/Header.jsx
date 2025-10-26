export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-[#111418]/95 backdrop-blur-sm w-full border-b border-[#2e3237]">

            <div className="w-full flex h-16 items-center justify-between">
                <div className="w-[33%] bg-amber-500">
                    <p>1</p>
                </div>
                <div className="w-[33%] bg-blue-500">
                    <p>2</p>
                </div>
                <div className="w-[33%] bg-green-600">
                    <p>3</p>
                </div>
            </div>
        </header>
    )
}