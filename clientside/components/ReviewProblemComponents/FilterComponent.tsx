import {StyleSheet, Text, TextInput, View} from "react-native";
import {Colors} from "../../constants/Colors";
import {FC, useState} from "react";
import SeeDetailsButton from "./SeeDetailsButton";
import {useAuth} from "../../shared/contexts/auth-context";
import RNPickerSelect from "react-native-picker-select";
import {ProblemType} from "../../shared/enums/problemType.enum";
import FilterCloseButton from "./FilterCloseButton";

type props = {
    value: string,
    onChangeText: (text: string) => void
    onPress: () => void;
    selectedItem: ProblemType | undefined;
    onSelectItem: (s: ProblemType | undefined) => void;
}

const FilterComponent: FC<props> = ({value, onChangeText, onPress, selectedItem, onSelectItem}) => {
    const {auth} = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [showSearch, setShowSearchBar] = useState(false);
    const [closeFilter, setCloseFilter] = useState(false);

    function showOptions() {
        setShowModal(true);
    }

    function showSearchBar() {
        setShowSearchBar(true);
    }

    const problemTypeOptions = Object.values(ProblemType).map((value, label) => ({
        label: value,
        value: Object.keys(ProblemType).find(key => ProblemType[key as keyof typeof ProblemType] === value)
    }))

    function onSearch() {
        onPress();
        if (showModal)
            setShowModal(false);
        if (showSearch)
            setShowSearchBar(false);
    }

    function closeFilterHandler() {
        setShowSearchBar(false);
        setShowModal(false);
    }

    let filterComponent;
    if (auth) {
        if (showSearch) {
            filterComponent = <View style={styles.mainRoot}>
                <View style={styles.buttonXContainer}>
                    <FilterCloseButton onPress={closeFilterHandler}/>
                </View>
                <View style={styles.root}>
                    <TextInput style={styles.inputText}
                               cursorColor={Colors.primary700}
                               placeholder={"Unesite kod prijave za pretragu..."}
                               value={value}
                               onChangeText={onChangeText}
                    />
                    <View style={styles.buttonContainer}>
                        <SeeDetailsButton onPress={onPress} label={"Pretraži"}/>
                    </View>
                </View>
            </View>
        } else if (showModal) {
            filterComponent = <View style={styles.mainRoot}>
                <View style={styles.buttonXContainer}>
                    <FilterCloseButton onPress={closeFilterHandler}/>
                </View>
                <View style={styles.rootRNP}>
                    <RNPickerSelect onValueChange={(value) => onSelectItem(value)} items={problemTypeOptions}
                                    style={pickerStyle} value={selectedItem}
                                    placeholder={{label: "Odaberi opciju", value: null}}
                    />
                    <View style={styles.buttonContainer}>
                        <SeeDetailsButton onPress={onSearch} label={"Pretraži"}/>
                    </View>
                </View>
            </View>
        } else {
            filterComponent = <View style={styles.mainRoot}>
                <Text style={styles.text}>Pretraga</Text>
                <View style={styles.root}>
                    <SeeDetailsButton onPress={showOptions} label={"Tip problema"}/>
                    <SeeDetailsButton onPress={showSearchBar} label={"Kod"}/>
                </View>
            </View>
        }

    } else {
        filterComponent = <View style={styles.root}>
            <TextInput style={styles.inputText}
                       cursorColor={Colors.primary700}
                       placeholder={"Unesite kod prijave za pretragu..."}
                       value={value}
                       onChangeText={onChangeText}
            />
            <View style={styles.buttonContainer}>
                <SeeDetailsButton onPress={onPress} label={"Pretraži"}/>
            </View>

        </View>
    }
    return <>
        {filterComponent}
    </>
}

export default FilterComponent;

const styles = StyleSheet.create({
    mainRoot: {
        flexDirection: "column",
        justifyContent: "center",
        width: '100%',
        borderColor: Colors.primary400,
        borderWidth: 1,
        borderRadius: 12
    },
    text:{
        color: Colors.primary700,
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "left",
        marginHorizontal: 15
    },
    buttonXContainer: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        marginTop: 7
    },
    root: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 5,
        padding: 8,
    },
    rootRNP: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 5,
        padding: 8,
    },
    inputText: {
        backgroundColor: Colors.primary100,
        borderColor: Colors.primary700,
        borderWidth:1,
        flex: 4,
        height: '100%',
        marginRight: 5,
        color: Colors.primary700,
        padding: 5,
        borderRadius: 12,
        fontWeight: "bold",
        fontSize: 14
    },
    buttonContainer: {
        flex: 2,
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: Colors.primary700,
        padding: 5,
        borderRadius: 12,
        width: '50%',
        justifyContent: "center",
        alignItems: "center",
        flex: 2,
        height: '100%'
    }
})

const pickerStyle = StyleSheet.create({
    inputIOS: {},
    inputAndroid: {
        fontWeight: "bold",
        backgroundColor: Colors.primary700,
        color: 'white',
        paddingVertical: 16,
        fontSize: 26,
        borderRadius: 12,
        width: 250,
        marginHorizontal: 2
    }
})