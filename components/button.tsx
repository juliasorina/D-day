import { Colors } from "@/constants/Colors"
import MaskedView from "@react-native-masked-view/masked-view"
import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, TouchableOpacity, View } from "react-native"

export const Button = ({primary, secondary, children, onPress} : {primary?: boolean, secondary?: boolean, children: React.ReactNode, onPress?: () => void}) => {
    return(
        <TouchableOpacity 
            style={{
                width: '100%',
                flexShrink: 1,
                pointerEvents: onPress ? 'auto' : 'none',
                padding: 12, 
                borderRadius: 4,
                borderColor: primary || secondary  ? 'transparent' : 'black',
                borderWidth: 1, 
                backgroundColor: 'white', 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 8}} 
            onPress={onPress} 
            activeOpacity={0.6}>
            {(primary || secondary) && 
            <MaskedView style={StyleSheet.absoluteFill} 
                maskElement={
                    <View style={[StyleSheet.absoluteFill, {backgroundColor: primary ? '#000' : 'transparent', borderWidth: 2, borderRadius: 4}]}/>
                }>
                <LinearGradient style={StyleSheet.absoluteFill} colors={[Colors.pink, Colors.orange]} end={{x: 1, y: 0}}/>
            </MaskedView>}
            {children}
        </TouchableOpacity>
    )
}