import { Colors } from "@/constants/Colors"
import MaskedView from "@react-native-masked-view/masked-view"
import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icons from "@expo/vector-icons/MaterialIcons";
import { MainStyles } from "@/constants/MainStyles";

export const Checkbox = ({title, isChecked, setIsChecked, primary} : 
    {title: string, isChecked: boolean, setIsChecked: (value: boolean) => void, primary?: boolean}) => {
    
    return(
        <TouchableOpacity style={{gap: 8, flexDirection: 'row', alignItems: 'center'}} onPress={() => setIsChecked(!isChecked)} activeOpacity={0.6}>
            <View 
                style={{
                    width: 24,
                    aspectRatio: 1,
                    borderRadius: 4,
                    borderColor: isChecked  ? 'transparent' : 'black',
                    borderWidth: 1,
                }}>
                {isChecked &&
                    <MaskedView style={StyleSheet.absoluteFill} 
                        maskElement={
                            <View style={[StyleSheet.absoluteFill, {borderWidth: 2, borderRadius: 4}]}>
                                <Icons style={[StyleSheet.absoluteFill, {left: 1}]} size={16} name="check"/>
                            </View>
                        }>
                        <LinearGradient style={StyleSheet.absoluteFill} colors={[Colors.pink, Colors.orange]} end={{x: 1, y: 0}}/>
                    </MaskedView>}
            </View>
            <Text style={primary ? MainStyles.h4 : MainStyles.p}>{title}</Text>
        </TouchableOpacity>
    )
}