import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FC} from "react";
import {ResizeMode, Video} from "expo-av";
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
                            isMuted: true,
                        }}
                        defaultControlsVisible={true}
                        timeVisible={true}
                        slider={{visible: true}}
                        style={{controlsBackgroundColor: 'rgba(255,255,255,0.5)',
                            videoBackgroundColor: 'rgba(255,255,255,0.8)',
                            width: 300,
                            height: 500
                    }}
                        autoHidePlayer={true}
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
    modalVideo: {
        width: '90%',
        height: '50%',
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20
    },
    modalImage: {
        width: '80%',
        height: '60%',
    },
})