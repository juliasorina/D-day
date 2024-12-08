import { Colors } from '@/constants/Colors';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { JSX } from 'react';
import { Text } from 'react-native';
import { TextProps } from 'react-native/Libraries/Text/Text';

export const GradientText = (props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<Text> & Readonly<TextProps>) => {
    return (
        <MaskedView style={{pointerEvents: 'none'}} maskElement={(<Text {...props}/>)}>
            <LinearGradient colors={[Colors.pink, Colors.orange]}>
                <Text {...props} style={[props.style, {opacity: 0}]}/>
            </LinearGradient>
        </MaskedView>
    )
}