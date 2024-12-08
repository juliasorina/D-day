import { Modal, View, Text, StyleSheet } from "react-native";
import { MainStyles } from "@/constants/MainStyles";
import { Button } from "./button";

export function ModalWindow({ isVisible, title, onClose, onAgree } : 
    {isVisible: boolean, title: string, onClose: () => void, onAgree: () => void}) {
    return (
        <Modal animationType="fade" visible={isVisible} transparent>
            <View style={styles.background}>
                <View style={[styles.window, {backgroundColor: 'white'}]}>
                    <Text style={MainStyles.h2}>{title}</Text>
                    <View style={styles.buttonsView}>
                        <Button onPress={() => {onClose(); onAgree()}}>
                            <Text style={MainStyles.p}>
                                Да
                            </Text>
                        </Button>
                        <Button primary onPress={() => onClose()}>
                            <Text style={[MainStyles.h4, {color: 'white'}]}>
                                Нет
                            </Text>
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    background: {
        justifyContent: 'center',
        height: '100%',
        padding: 24,
        backgroundColor: 'hsla(0, 0%, 0%, 0.6)',
    },

    window: {
        alignItems: 'center',
        padding: 24,
        gap: 16,
        borderRadius: 4,
    },

    buttonsView: {
        width: '100%',
        flexDirection: 'row',
        gap: 8,
    }
});