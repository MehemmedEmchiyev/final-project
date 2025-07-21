import { ExternalLink } from "lucide-react"

function Info({property}) {
    return (
        <div className={` items-center gap-6 text-white ${property}`}>
            <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[16px] hover:underline">
                    Epic Rewards
                    <ExternalLink className="w-3.5 h-3.5" />
                </span>
                <div className="px-4 py-[2px] border border-white/30 rounded-full text-[16px] font-semibold bg-transparent">
                    $0.00
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[16px] hover:underline">
                    Account Balance
                    <ExternalLink className="w-3.5 h-3.5" />
                </span>
                <div className="px-4 py-[2px] border border-white/30 rounded-full text-[16px] font-semibold bg-transparent">
                    $0.00
                </div>
            </div>
        </div>
    )
}

export default Info