import { Eye, EyeClosed} from "lucide-react"

interface IconProps {
    className?: string,
    onClic?: () => void
}

export function EyeIcon  ({className, onClic}: IconProps) {
    return <Eye className={className} onClick={onClic} />
}
export function EyeClosedIcon  ({className, onClic}: IconProps) {
    return <EyeClosed className={className} onClick={onClic} />
}