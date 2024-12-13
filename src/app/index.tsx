import {View, Text} from "react-native"
import { Welcome } from "@/components/welcome"
import { Steps } from "@/components/steps/index"
import { Button } from "@/components/button"
import { IconPlayerPlay } from "@tabler/icons-react-native"

export default function Index(){
  return(
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Welcome/>
      <Steps/>

      <Button>
        <Button.Title> Começar </Button.Title>
      </Button>
    </View>
  )
}