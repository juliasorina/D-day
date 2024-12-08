import { Colors } from "@/constants/Colors"
import { MainStyles } from "@/constants/MainStyles"
import MaskedView from "@react-native-masked-view/masked-view"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

export const Field = ({title, isMultiLine, value, setValue} : {title: string, isMultiLine?: boolean, value: string, setValue: (value: string) => void}) => {
    const [isFocused, setIsFocused] = useState(false);

    return(
        <View style={{gap: 8}}>
            <Text style={MainStyles.h4}>{title}</Text>
            <View>
                <TextInput
                    multiline
                    style={[MainStyles.p, {
                        padding: 12,
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: isFocused ? 'transparent' : 'black',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center', gap: 8}]}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={value}
                    onChangeText={(value) => setValue(value)}
                    numberOfLines={isMultiLine ? 4 : 1}/>
                {isFocused && 
                    <MaskedView style={StyleSheet.absoluteFill} 
                        maskElement={
                            <View style={[StyleSheet.absoluteFill, {borderWidth: 2, borderRadius: 4}]}/>
                        }>
                        <LinearGradient style={StyleSheet.absoluteFill} colors={[Colors.pink, Colors.orange]} end={{x: 1, y: 0}}/>
                    </MaskedView>}
            </View>
        </View>
    )
}