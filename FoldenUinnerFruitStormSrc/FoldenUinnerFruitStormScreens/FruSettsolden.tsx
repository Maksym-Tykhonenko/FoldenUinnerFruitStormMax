import AsyncStorage from '@react-native-async-storage/async-storage';
import { storfontsinner } from '../storfontsinner';
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Animated,
    Share,
} from 'react-native';
import buttons from '../UinnerData/buttons';

const bellIcon = require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/bell.png');
const melodyIcon = require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/melody.png');

export default function FruSettsolden({ soundSwitch, setSoundSwitch }: { soundSwitch: boolean; setSoundSwitch: (val: boolean) => void; }) {
    const { width: W, height: H } = Dimensions.get('window');

    // Custom switch animation
    const [musicFlag, setMusicFlag] = useState(soundSwitch);
    const anim = React.useRef(new Animated.Value(soundSwitch ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(anim, {
            toValue: musicFlag ? 1 : 0,
            duration: 180,
            useNativeDriver: false,
        }).start();
    }, [musicFlag]);

    // Sync with AsyncStorage
    useEffect(() => {
        AsyncStorage.getItem('folrutorm-storm-audio-key').then(val => {
            if (val !== null) {
                setMusicFlag(val === 'true');
                setSoundSwitch(val === 'true');
            }
        });
    }, []);

    const toggleMusic = async () => {
        const newVal = !musicFlag;
        setMusicFlag(newVal);
        setSoundSwitch(newVal);
        await AsyncStorage.setItem('folrutorm-storm-audio-key', newVal ? 'true' : 'false');
    };

    // Notification times
    const notificationTimes = ['08:00', '12:00', '16:00', '21:00'];
    const [notifTimeIdx, setNotifTimeIdx] = useState(0);

    // Load notification time from AsyncStorage
    useEffect(() => {
        AsyncStorage.getItem('hoofrush-notification-time').then(val => {
            if (val !== null) {
                const idx = notificationTimes.indexOf(val);
                if (idx !== -1) setNotifTimeIdx(idx);
            }
        });
    }, []);

    // Handler to cycle notification time
    const handleNotifPress = async () => {
        const nextIdx = (notifTimeIdx + 1) % notificationTimes.length;
        setNotifTimeIdx(nextIdx);
        await AsyncStorage.setItem('hoofrush-notification-time', notificationTimes[nextIdx]);
    };

    // Sizes
    const blockW = W * 0.92;
    const blockH = H * 0.13;
    const blockRad = W * 0.07;
    const pad = W * 0.045;
    const iconSize = W * 0.13;
    const fontSizeLabel = W * 0.062;
    const fontSizeTime = W * 0.07;
    const switchW = W * 0.18;
    const switchH = W * 0.09;
    const switchRad = switchH * 0.5;
    const switchCircle = switchH * 0.62;
    const aboutFont = W * 0.062;

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: 'transparent' }}
            contentContainerStyle={{ alignItems: 'center', paddingBottom: H * 0.21 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Notification Block */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleNotifPress}
                style={{
                    width: blockW,
                    height: blockH,
                    backgroundColor: '#5D0100',
                    borderRadius: blockRad,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: H * 0.06,
                    paddingHorizontal: pad,
                    shadowColor: '#000',
                    shadowOpacity: 0.18,
                    shadowRadius: blockRad * 0.5,
                    elevation: 6,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={bellIcon}
                        style={{
                            width: iconSize,
                            height: iconSize,
                            resizeMode: 'contain',
                            marginRight: pad * 0.7,
                        }}
                    />
                    <Text style={{
                        color: '#fff',
                        fontSize: fontSizeLabel,
                        fontFamily: storfontsinner.foldinLondrinaSolBlack,
                        letterSpacing: 1.1,
                    }}>
                        NOTIFICATION
                    </Text>
                </View>
                <Text style={{
                    color: '#FFD43B',
                    fontSize: fontSizeTime,
                    fontFamily: storfontsinner.foldinLondrinaSolBlack,
                    letterSpacing: 1.1,
                    textDecorationLine: 'underline',
                }}>
                    {notificationTimes[notifTimeIdx]}
                </Text>
            </TouchableOpacity>

            {/* Melody Block */}
            <View style={{
                width: blockW,
                height: blockH,
                backgroundColor: '#5D0100',
                borderRadius: blockRad,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: H * 0.04,
                paddingHorizontal: pad,
                shadowColor: '#000',
                shadowOpacity: 0.18,
                shadowRadius: blockRad * 0.5,
                elevation: 6,
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={melodyIcon}
                        style={{
                            width: iconSize,
                            height: iconSize,
                            resizeMode: 'contain',
                            marginRight: pad * 0.7,
                        }}
                    />
                    <Text style={{
                        color: '#fff',
                        fontSize: fontSizeLabel,
                        fontFamily: storfontsinner.foldinLondrinaSolBlack,
                        letterSpacing: 1.1,
                    }}>
                        MELODY
                    </Text>
                </View>
                {/* Custom Switch */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={toggleMusic}
                    style={{
                        width: switchW,
                        height: switchH,
                        borderRadius: W * 0.03,
                        backgroundColor: '#2C0B0B',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        overflow: 'hidden',
                        flexDirection: 'row',
                        paddingHorizontal: W * 0.019
                    }}
                >
                    {soundSwitch && (
                        <Text style={{
                            color: '#fff',
                            fontSize: fontSizeLabel * 0.8,
                            fontFamily: storfontsinner.foldinLondrinaSolBlack,
                            letterSpacing: 1.1,
                            // marginRight: switchH * 0.13,
                            // left
                        }}>
                            ON
                        </Text>
                    )}

                    <View style={{
                        width: switchCircle,
                        height: switchCircle,
                        borderRadius: switchCircle / 2,
                        backgroundColor: '#FFD43B',
                    }} />

                    {!soundSwitch && (
                        <Text style={{
                            color: '#fff',
                            fontSize: fontSizeLabel * 0.8,
                            fontFamily: storfontsinner.foldinLondrinaSolBlack,
                            letterSpacing: 1.1,
                            marginLeft: switchH * 0.13,
                        }}>
                            OFF
                        </Text>
                    )}

                </TouchableOpacity>
            </View>

            {/* About the app */}
            <Text style={{
                color: '#000',
                fontSize: aboutFont,
                fontFamily: storfontsinner.foldinLondrinaSolBlack,
                letterSpacing: 1.1,
                marginTop: H * 0.09,
                textAlign: 'center',
                textTransform: 'uppercase',
            }}>
                ABOUT THE APP
            </Text>

            <Image
                resizeMode="contain"
                source={require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/smaUinFruiIcon.png')}
                style={{
                    marginVertical: H * 0.04,
                    height: W * 0.44,
                    width: W * 0.44,
                    alignSelf: 'center',
                }}
            />
            <Text style={{
                color: '#000',
                fontSize: aboutFont * 0.8,
                fontFamily: storfontsinner.foldinLondrinaSolBlack,
                letterSpacing: 1.1,
                marginTop: H * 0.09,
                textAlign: 'center',
                width: W * 0.86,
            }}>
                Folden Uinner is a bright game for training reaction and attentiveness in three modes. Collect fruits, catch chaotic appearances, pass mega-challenges and raise your level to 50. Get golden statuettes, keep personal statistics and develop at your own pace.
            </Text>
            <TouchableOpacity
                onPress={() => {
                    Share.share({
                        message: `Do you have a good reaction? Try it in the Folden Uinner Fruit Storm! It's a fun game to train your reaction and attentiveness. Download it now!`,
                    })
                }}
                activeOpacity={0.8}
                style={{
                    marginTop: H * 0.03,
                    alignSelf: 'center',
                }}
            >
                <Image
                    source={buttons.share}
                    style={{
                        width: W * 0.86,
                        height: H * 0.1,
                        resizeMode: 'contain',
                    }}
                />
            </TouchableOpacity>
        </ScrollView>
    );
}
