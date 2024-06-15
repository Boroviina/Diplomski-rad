import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FC} from "react";
import {ResizeMode} from "expo-av";
import VideoPlayer from 'expo-video-player';

type props = {
    uri: string;
    visible: boolean
    onClose: () => void;
}
const PictureModal: FC<props> = ({uri, visible, onClose}) => {
    const fileExtension = uri.split('.').pop();

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension!)) {
        return <Modal visible={visible} transparent={true}>
            <TouchableOpacity style={styles.modalContainer} onPress={onClose}>
                <Image source={{uri: uri}} style={styles.modalImage}/>
            </TouchableOpacity>
        </Modal>
    } else if (['mp4', 'mov', 'avi'].includes(fileExtension!)) {
        return <Modal visible={visible} transparent={true}>
            <TouchableOpacity style={styles.modalContainer} onPress={onClose}>
                <View style={styles.modalVideo}>
                    <VideoPlayer
                        videoProps={{
                            source: {uri},
                            resizeMode: ResizeMode.CONTAIN,
                            shouldPlay: true,
                            useNativeControls: true,
                            isMuted: true,
                            videoStyle: {
                                backfaceVisibility: "hidden",
                                backgroundColor: 'rgba(255,255,255,0.9)'
                            }
                        }}
                    />
                </View>

            </TouchableOpacity>
        </Modal>
    } else {
        return (
            <View>
                <Text>Ne podrzan tip medija</Text>
            </View>
        )
    }
}

export default PictureModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
    modalVideo:{
        width: '80%',
        height: '50%',
        justifyContent: "center",
        alignItems: "center",
        marginVertical:20
    },
    modalImage: {
        width: '80%',
        height: '60%',
    },
})