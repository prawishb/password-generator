import zxcvbn from "zxcvbn"

// This is only for tailwind to pre-generate colors.
const colors = {
  red: {
    bg: "bg-red-600",
    text: "text-red-600"
  },
  orange: {
    bg: "bg-orange-600",
    text: "text-orange-600"
  },
  yellow: {
    bg: "bg-yellow-600",
    text: "text-yellow-600"
  },
  green: {
    bg: "bg-green-600",
    text: "text-green-600"
  }
}

export const generatePassword = (
  characterAmount: number,
  includeUpper: boolean,
  includeNumbers: boolean,
  includeSymbols:boolean
): string => {
  const LOWERCASE_CHAR = "abcdefghijklmnopqrstuvwxyz"
  const UPPERCASE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const NUMBER_CHAR = "1234567890"
  const SYMBOL_CHAR = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"

  let combinedCharacters = LOWERCASE_CHAR

  if (includeUpper) combinedCharacters += UPPERCASE_CHAR
  if (includeNumbers) combinedCharacters += NUMBER_CHAR
  if (includeSymbols) combinedCharacters += SYMBOL_CHAR

  let password = ""
  for (let i = 0; i < characterAmount; i++) {
      password += combinedCharacters.charAt(Math.floor(Math.random() * combinedCharacters.length))
  }

  return password
}


export type StrengthInfo = {
  score: number,
  label: string,
  color: {
    bg: string;
    text: string;
  }
}
export const getPasswordStrength = (password: string): StrengthInfo => {
  const result = zxcvbn(password); 

  var passwordStrength: StrengthInfo = {
    score: result.score,
    label: "",
    color: {
      bg: "",
      text: ""
    },
  }

  switch (result.score) {
    case 0:
      passwordStrength = {...passwordStrength, label: "Weak", color: colors.red}
      break
    case 1:
      passwordStrength = {...passwordStrength, label: "Weak", color: colors.red}
      break
    case 2:
      passwordStrength = {...passwordStrength, label: "Fair", color: colors.orange}
      break
    case 3:
      passwordStrength = {...passwordStrength, label: "Good", color: colors.yellow}
      break
    case 4:
      passwordStrength = {...passwordStrength, label: "Strong", color: colors.green}
      break
    default:
      passwordStrength = {...passwordStrength, label: "Weak", color: colors.red}
      break
  }

  return passwordStrength
}