import * as MailComposer from 'expo-mail-composer';
import {Button, Modal, View} from "react-native";
import {FC, useEffect, useState} from "react";

type props = {
    answer: string | undefined;
    email: string[] | undefined;
}

const Email: FC<props> = ({answer, email}) => {
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        async function checkAvailability() {
            const isEmailAvalaible = await MailComposer.isAvailableAsync();
            setIsAvailable(isEmailAvalaible);
        }

        console.log('Usla sam u ovaj dio koda');

        checkAvailability();
    }, [])

    const SendMail = () => {
        MailComposer.composeAsync({
            subject: 'Odgovor',
            body: answer,
            recipients: email,

        })
    }

    return (
        isAvailable && (<Modal visible={true}>
            <Button title={"OK"} onPress={SendMail}/>
        </Modal>)
    )

}

export default Email;