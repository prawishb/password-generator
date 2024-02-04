import { StrengthInfo } from "@/lib/password"
import { Progress } from "./ui/progress"

interface PasswordStrengthProps {
  strength: StrengthInfo
}

const PasswordStrength = ({ strength }: PasswordStrengthProps) => {
  return (
    <div className="">
      <Progress max={4} value={(strength.score * 100) / 4} customColor={strength.color.bg} />
      {strength.score != 0 && <span className={`text-sm flex justify-end mt-1 font-semibold ${strength.color.text}`}>{strength.label}</span>}
    </div>
  )
}

export default PasswordStrength