import {
    Modal,
    Text,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions as FrDims,
    Alert,
    Share,
    View as CrvBox,
    TextInput as BlrInput,
    Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation as useMetaRoute } from '@react-navigation/native';
import { storfontsinner } from '../storfontsinner';
import buttons from '../UinnerData/buttons';
import React, {
    useEffect as useStormPulse,
    useState as useStormer,
} from 'react';

export default function StoruitnnerProfile({
}: {
    }) {
    const { width: fw, height: fh } = FrDims.get('window');

    const padX = fw * 0.05;
    const roundZ = fw * 0.06;
    const wrapW = fw * 0.86;

    const shareH = fh * 0.1;
    const shareW = fw * 0.75;

    const navGate = useMetaRoute();

    // -------------------------------
    //   Профільний стан
    // -------------------------------
    const [profMeta, setProfMeta] = useStormer<{
        name: string,
        photo: string,
        regDate: string,
        totalTime: number
    }>({
        name: '',
        photo: '',
        regDate: '',
        totalTime: 0
    });

    const [isDelOpen, setDelOpen] = useStormer(false);
    const [nameEditFlag, callNameEdit] = useStormer(false);
    const [tmpNameField, putName] = useStormer('');

    // -------------------------------
    //   Завантаження профільного блоку
    // -------------------------------
    useStormPulse(() => {
        (async () => {
            const pName = await AsyncStorage.getItem('profileName') || 'NICKOLAY';
            const pImage = await AsyncStorage.getItem('profilePhoto') || '';
            const pDate = await AsyncStorage.getItem('profileRegDate') || '12.03.2025';
            const pTime = parseInt(await AsyncStorage.getItem('profileTotalTime') || '45', 10);

            setProfMeta({
                name: pName,
                photo: pImage,
                regDate: pDate,
                totalTime: pTime
            });
        })();
    }, []);

    // -------------------------------
    //    Шеринг профілю
    // -------------------------------
    const handleShareProfile = () => {
        Share.share({
            message: `My profile in Uinner Fruit Storm: ${profMeta.name}, time in app: ${profMeta.totalTime} min!`
        }).catch(() => {
            Alert.alert('Error', 'Unable to share your stats at the moment.');
        });
    };

    // -------------------------------
    //    Видалення профілю
    // -------------------------------
    const zapDeleteProfile = async () => {
        await AsyncStorage.clear();
        navGate.replace('SotrmRfuitinnerRegistr');
    };

    // -------------------------------
    //  Рівень юзера
    // -------------------------------
    const [lvlStat, setLvlStat] = useStormer(1);

    useStormPulse(() => {
        AsyncStorage.getItem('userLevel').then(v => setLvlStat(v ? parseInt(v, 10) : 1));
    }, []);

    // -------------------------------
    //   Фото-пікер
    // -------------------------------
    const pickNewFace = async () => {
        const { launchImageLibrary } = await import('react-native-image-picker');

        const sel = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
            includeBase64: false
        });

        if (sel.assets && sel.assets.length > 0) {
            const uri = sel.assets[0].uri;
            await AsyncStorage.setItem('profilePhoto', uri);
            setProfMeta(prev => ({ ...prev, photo: uri }));
        }
    };

    // -------------------------------
    //   Збереження нового імені
    // -------------------------------
    const commitNameSave = async () => {
        const nm = tmpNameField.trim();
        if (nm.length > 0) {
            await AsyncStorage.setItem('profileName', nm);
            setProfMeta(prev => ({ ...prev, name: nm }));
        }
        callNameEdit(false);
    };

    // -------------------------------
    //   РЕНДЕР
    // -------------------------------
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <CrvBox
                style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    alignItems: 'center',
                }}
            >

                <CrvBox
                    style={{
                        borderColor: '#FDD721',
                        backgroundColor: '#5D0100',
                        padding: padX,
                        alignItems: 'center',
                        borderRadius: roundZ,
                        marginTop: fh * 0.085,
                        elevation: 6,
                        borderWidth: 2.2,
                        shadowOpacity: 0.2,
                        width: wrapW,
                    }}
                >

                    {/* Фото + імʼя */}
                    <CrvBox
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                            marginBottom: padX * 1.25
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={pickNewFace}
                        >
                            <Image source={{ uri: profMeta.photo }}
                                style={{
                                    backgroundColor: '#2a2a2a',
                                    width: fw * 0.23,
                                    height: fw * 0.23,
                                    borderRadius: fw * 0.065,
                                }}
                            />
                        </TouchableOpacity>

                        <CrvBox
                            style={{
                                marginLeft: padX * 0.7,
                                flex: 1
                            }}
                        >
                            {nameEditFlag ? (
                                <BlrInput
                                    value={tmpNameField}
                                    onChangeText={putName}
                                    autoFocus
                                    maxLength={23}
                                    placeholder="NICKNAME"
                                    onBlur={commitNameSave}
                                    onSubmitEditing={commitNameSave}
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                    returnKeyType="done"
                                    style={{
                                        backgroundColor: '#2C0000',
                                        borderRadius: fw * 0.03,
                                        color: '#fff',
                                        paddingHorizontal: padX * 0.6,
                                        paddingVertical: fh * 0.014,
                                        fontSize: fw * 0.055,
                                        fontFamily: storfontsinner.foldinLondrinaSolLight
                                    }}
                                />
                            ) : (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        putName(profMeta.name);
                                        callNameEdit(true);
                                    }}
                                >
                                    <Text
                                        style={{
                                            backgroundColor: '#2C0000',
                                            borderRadius: fw * 0.03,
                                            color: '#fff',
                                            paddingHorizontal: padX * 0.6,
                                            paddingVertical: fh * 0.014,
                                            fontSize: fw * 0.055,
                                            fontFamily: storfontsinner.foldinLondrinaSolLight
                                        }}
                                    >
                                        {profMeta.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </CrvBox>
                    </CrvBox>

                    {/* Статистика */}
                    <CrvBox style={{ width: '100%' }}>
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: fw * 0.045,
                                fontFamily: storfontsinner.foldinLondrinaSolBlack,
                                marginBottom: padX * 0.3
                            }}
                        >
                            CURRENT LEVEL:
                        </Text>

                        <Text
                            style={{
                                marginBottom: padX * 0.5,
                                fontFamily: storfontsinner.foldinLondrinaSolBlack,
                                fontSize: fw * 0.09,
                                color: '#FDD721',
                            }}
                        >
                            {lvlStat} LVL
                        </Text>

                        <Text
                            style={{
                                fontSize: fw * 0.045,
                                color: '#fff',
                                fontFamily: storfontsinner.foldinLondrinaSolBlack,
                                marginBottom: padX * 0.3,
                            }}
                        >
                            REGISTRATION DATE:
                        </Text>

                        <Text
                            style={{
                                color: '#FDD721',
                                fontSize: fw * 0.08,
                                marginBottom: padX * 0.5,
                                fontFamily: storfontsinner.foldinLondrinaSolBlack
                            }}
                        >
                            {profMeta.regDate}
                        </Text>
                    </CrvBox>

                    {/* Видалення профілю */}
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => setDelOpen(true)}
                        style={{
                            justifyContent: 'center',
                            width: shareW,
                            marginTop: padX * 0.5,
                            alignItems: 'center',
                            height: shareH,
                        }}
                    >
                        <Image source={buttons.deleteProfile}
                            style={{
                                width: shareW,
                                height: shareH,
                                resizeMode: 'contain'
                            }}
                        />
                    </TouchableOpacity>
                </CrvBox>

                {/* Модалка видалення */}
                <Modal
                    onRequestClose={() => setDelOpen(false)}
                    transparent
                    visible={isDelOpen}
                    animationType="fade"
                >
                    <CrvBox style={{
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <CrvBox style={{
                                alignItems: 'center',
                                backgroundColor: '#5D0100',
                                borderWidth: 2.2,
                                borderRadius: roundZ,
                                padding: padX * 1.2,
                                borderColor: '#FDD721',
                                width: wrapW,
                            }}
                        >
                            <Text style={{
                                    marginBottom: padX * 0.7,
                                    fontFamily: storfontsinner.foldinLondrinaSolBlack,
                                    fontSize: fw * 0.055,
                                    textAlign: 'center',
                                    color: '#fff',
                                }}
                            >
                                Are you sure you want to delete your profile?
                            </Text>

                            <CrvBox
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '100%'
                                }}
                            >
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    onPress={() => setDelOpen(false)}
                                    style={{ flex: 1, alignItems: 'center', marginRight: padX * 0.2 }}
                                >
                                    <Image
                                        source={buttons.cancel}
                                        style={{
                                            width: shareW * 0.45,
                                            height: shareH * 0.7,
                                            resizeMode: 'contain'
                                        }}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    onPress={zapDeleteProfile}
                                    style={{ flex: 1, alignItems: 'center', marginLeft: padX * 0.2 }}
                                >
                                    <Image
                                        source={buttons.deleteProfile}
                                        style={{
                                            width: shareW * 0.45,
                                            height: shareH * 0.7,
                                            resizeMode: 'contain'
                                        }}
                                    />
                                </TouchableOpacity>
                            </CrvBox>
                        </CrvBox>
                    </CrvBox>
                </Modal>
            </CrvBox>
        </TouchableWithoutFeedback>
    );
}
