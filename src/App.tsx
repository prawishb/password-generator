import { useState } from "react"

import { Toaster } from "./components/ui/toaster"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Checkbox } from "./components/ui/checkbox"
import { Slider } from "./components/ui/slider"
import Divider from "./components/divider"
import PasswordStrength from "./components/password-strength"
import { Copy } from "lucide-react"

import { StrengthInfo, generatePassword, getPasswordStrength } from "./lib/password"
import { useToast } from "./hooks/use-toast"
import { useCopyToClipboard } from "./hooks/use-copy-to-clipboard"

const App = () => {
  const { toast } = useToast()
  
  const [password, setPassword] = useState<string>("")
  const passwordStrength: StrengthInfo = getPasswordStrength(password)

  
  const [passwordLength, setpasswordLength] = useState<number>(8);
  const [includeUppercase, setincludeUppercase] = useState<boolean>(false);
  const [includeNumbers, setincludeNumbers] = useState<boolean>(false);
  const [includeSpecial, setincludeSpecial] = useState<boolean>(false);



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const generated = generatePassword(passwordLength, includeUppercase, includeNumbers, includeSpecial)    
    setPassword(generated);
  }

  const [copiedText, copy] = useCopyToClipboard()
  const handleCopy = () => {
    if (password === "") return

    copy(password)
      .then(() => {
        toast({
          title: `Password: ${password}`,
          description: "Copied to clipboard succesfully."
        })
      })
      .catch((error) => {
        console.log("Error while copying: " + error);
      })
  }

  return (
    <div className="bg-white text-stone-800 min-h-screen w-screen overflow-x-hidden antialiased">
      <Toaster />

      <div className="w-96 mx-auto mt-20">
        <Card>
          <CardHeader>
            <CardTitle>Password Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
              <Divider mode="horizontal" />
    

              {/* Select password length */}
              <div className="flex items-center justify-start gap-x-2">
                <Label htmlFor="password-length-slider" className='min-w-36'>Length of password</Label>
                <Slider id="password-length-slider" name="password-length-slider" defaultValue={[8]} min={6} max={30} step={1} onValueChange={(value: number[]) => setpasswordLength(value[0])} />
                <span className="text-sm font-medium leading-none ml-2">{passwordLength}</span>
              </div>


              {/* Include uppercase */}
              <div className='flex items-center justify-start gap-x-2'>
                <Label htmlFor='include-uppercase-checkbox' className='min-w-36'>Include uppercase</Label>
                <Checkbox id='include-uppercase-checkbox' name="include-uppercase-checkbox" defaultChecked={includeUppercase} onCheckedChange={() => setincludeUppercase(!includeUppercase)} />
              </div>
              
              {/* Include numbers */}
              <div className='flex items-center justify-start gap-x-2'>
                <Label htmlFor='include-numbers-checkbox' className='min-w-36'>Include numbers</Label>
                <Checkbox id='include-numbers-checkbox' name="include-numbers-checkbox" defaultChecked={includeNumbers} onCheckedChange={() => setincludeNumbers(!includeNumbers)} />
              </div>

              {/* Include special characters */}
              <div className='flex items-center justify-start gap-x-2'>
                <Label htmlFor='include-special-checkbox' className='min-w-36'>Include special</Label>
                <Checkbox id='include-special-checkbox' name="include-special-checkbox" defaultChecked={includeSpecial} onCheckedChange={() => setincludeSpecial(!includeSpecial)} />
              </div>
              
              <Button>Generate</Button>
              <Divider mode="horizontal"/>
            </form>
          </CardContent>
          <CardFooter className="grid gap-y-2">
              <div className="flex flex-1 gap-x-4">
                <Input disabled value={password} placeholder="Generate a new password..." className="border-stone-400 text-stone-800 disabled:opacity-100" style={{ cursor: "auto" }} />
                <Button onClick={handleCopy}><Copy className="w-4 h-4"/></Button>
              </div>

              <PasswordStrength strength={passwordStrength}  />
          </CardFooter>
        </Card>

        <div className="text-center mt-2">
          <p className="text-sm font-medium">Made by Prawish Biharie</p>
        </div>

      </div>

    </div>
  )
}

export default App