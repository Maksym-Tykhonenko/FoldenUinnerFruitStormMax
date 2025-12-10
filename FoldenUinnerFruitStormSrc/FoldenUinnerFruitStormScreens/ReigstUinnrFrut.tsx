import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation as useFrunednniuNav } from '@react-navigation/native';

import {
    Dimensions as RegLubAccDIms,
    Image as CrwnFruiImgBox,
    Text as TrotInnerLabel,
    Keyboard,
    TextInput as NicknameCatcherField,
    TouchableWithoutFeedback as HideTapperWrp,
    TouchableOpacity as ClickyFruitButton,
    View as HollowShellRoot,
} from 'react-native';

import React, { useState } from 'react';
import { SafeAreaView as SaveFruitEdges } from 'react-native-safe-area-context';
import buttons from '../UinnerData/buttons';
import { launchImageLibrary } from 'react-native-image-picker';
import { storfontsinner } from '../storfontsinner';

const ReigstUinnrFrut: React.FC = () => {

    const dynNavigatorPulse = useFrunednniuNav();
    const { width: frameWScope, height: frameHSector } = RegLubAccDIms.get('window');

    const [nicknameValue, mapNickSet] = useState('');
    const [fruitFaceUri, mapFruitFace] = useState<string | undefined>(undefined);

    const handlePickPhoto = async () => {
        const outcome = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
            includeBase64: false,
        });
        if (outcome.assets?.length) {
            mapFruitFace(outcome.assets[0].uri);
        }
    };

    const handleSaveAndGo = async () => {
        try {
            await AsyncStorage.setItem('profileName', nicknameValue);
            if (fruitFaceUri) {
                await AsyncStorage.setItem('profilePhoto', fruitFaceUri);
            }

            const regDateStored = await AsyncStorage.getItem('profileRegDate');
            if (!regDateStored) {
                const dt = new Date();
                const prettyDate = `${String(dt.getDate()).padStart(2, '0')}.${String(dt.getMonth() + 1).padStart(2, '0')}.${dt.getFullYear()}`;
                await AsyncStorage.setItem('profileRegDate', prettyDate);
            }

            dynNavigatorPulse.replace('FolstornnerLocalPage');
        } catch {}
    };

    return (
        <HideTapperWrp
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <HollowShellRoot
                style={{
                    height: frameHSector,
                    flex: 1,
                    alignItems: 'center',
                    width: frameWScope,
                    backgroundColor: '#4B0C09',
                }}
            >
                <SaveFruitEdges />

                {/* Background */}
                <CrwnFruiImgBox
                    resizeMode="cover"
                    source={require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/background.png')}
                    style={{
                        height: frameHSector,
                        width: frameWScope,
                        position: 'absolute',
                    }}
                />

                {/* Icon top */}
                <CrwnFruiImgBox
                    resizeMode="contain"
                    source={require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/smaUinFruiIcon.png')}
                    style={{
                        marginVertical: frameHSector * 0.04,
                        height: frameWScope * 0.44,
                        width: frameWScope * 0.44,
                        alignSelf: 'center',
                    }}
                />

                <HollowShellRoot
                    style={{
                        marginTop: frameHSector * 0.01,
                        width: frameWScope * 1.0111,
                        flex: 1,
                        backgroundColor: '#5D0100',
                        borderRadius: frameWScope * 0.09,
                        borderWidth: frameWScope * 0.005,
                        borderColor: '#FDD721',
                        alignSelf: 'center',
                        overflow: 'hidden',
                        alignItems: 'center',
                        paddingTop: frameHSector * 0.04,
                        paddingHorizontal: frameWScope * 0.05,
                        borderBottomColor: 'transparent',
                    }}
                >
                    {/* Title */}
                    <TrotInnerLabel
                        style={{
                            textAlign: 'center',
                            color: '#fff',
                            fontSize: frameWScope * 0.08,
                            letterSpacing: 1,
                            marginBottom: frameHSector * 0.012,
                            fontFamily: storfontsinner.foldinLondrinaSolBlack,
                        }}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        ADD YOUR PHOTO & NICKNAME
                    </TrotInnerLabel>

                    {/* Subtext */}
                    <TrotInnerLabel
                        style={{
                            textAlign: 'center',
                            color: '#fff',
                            fontSize: frameHSector * 0.018,
                            letterSpacing: 0.5,
                            marginBottom: frameHSector * 0.03,
                            fontFamily: storfontsinner.foldinLondrinaSolLight,
                        }}
                    >
                        THE DATA IS STORED ONLY ON YOUR DEVICE.
                    </TrotInnerLabel>

                    {/* Photo + nickname block */}
                    <HollowShellRoot
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: frameHSector * 0.03,
                            width: frameWScope * 0.85,
                            justifyContent: 'center',
                        }}
                    >
                        <ClickyFruitButton
                            activeOpacity={0.8}
                            onPress={handlePickPhoto}
                            style={{
                                backgroundColor: '#FDD721',
                                borderRadius: frameWScope * 0.07,
                                width: frameWScope * 0.32,
                                height: frameWScope * 0.32,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: frameWScope * 0.06,
                            }}
                        >
                            {fruitFaceUri ? (
                                <CrwnFruiImgBox
                                    source={{ uri: fruitFaceUri }}
                                    style={{
                                        width: frameWScope * 0.32,
                                        height: frameWScope * 0.32,
                                        borderRadius: frameWScope * 0.07,
                                    }}
                                />
                            ) : (
                                <CrwnFruiImgBox
                                    source={require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/noPhoto.png')}
                                    style={{
                                        width: frameWScope * 0.13,
                                        height: frameWScope * 0.13,
                                        tintColor: '#4B0C09',
                                    }}
                                />
                            )}
                        </ClickyFruitButton>

                        <NicknameCatcherField
                            placeholder="NICKNAME"
                            maxLength={23}
                            onChangeText={mapNickSet}
                            value={nicknameValue}
                            placeholderTextColor="rgba(255,255,255,0.5)"
                            style={{
                                backgroundColor: '#280000',
                                borderRadius: frameWScope * 0.03,
                                color: '#fff',
                                fontSize: frameHSector * 0.024,
                                paddingHorizontal: frameWScope * 0.025,
                                borderWidth: 0,
                                fontFamily: storfontsinner.foldinLondrinaSolLight,
                                width: frameWScope * 0.48,
                                height: frameHSector * 0.07,
                            }}
                        />
                    </HollowShellRoot>
                </HollowShellRoot>

                {/* Next button */}
                {nicknameValue.trim().length > 0 && fruitFaceUri && (
                    <ClickyFruitButton
                        style={{
                            alignSelf: 'center',
                            position: 'absolute',
                            bottom: frameHSector * 0.03,
                            zIndex: 10,
                        }}
                        onPress={handleSaveAndGo}
                        activeOpacity={0.91}
                    >
                        <CrwnFruiImgBox
                            source={buttons.next}
                            resizeMode="contain"
                            style={{
                                width: frameWScope * 0.7,
                                height: frameHSector * 0.1,
                            }}
                        />
                    </ClickyFruitButton>
                )}
            </HollowShellRoot>
        </HideTapperWrp>
    );
};

export default ReigstUinnrFrut;
