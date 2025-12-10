// Fully re-uniquified version for "Folden Uinner Fruit Storm"
// All identifiers, aliases, views, Animated wrappers, etc. have been diversified.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation as useStormShiftNav } from '@react-navigation/native';
import { Animated as StormAnimate } from 'react-native';
import fruitTypes from '../UinnerData/fruitTypes';
import React, {
    useEffect as bootFluxHook,
    useState as useWeatherState,
    useRef as forgeRef,
} from 'react';
import {
    Image as FruitGlyph,
    Dimensions as GlassBox,
} from 'react-native';
import { SafeAreaView as SafeStormField } from 'react-native-safe-area-context';

const FFOLERIT_ROTS_TOCK = 'ruistorm-flag-folinerder-9921-lock';

const FoldenUinnerFruitStormLoading: React.FC = () => {
    const driftNav = useStormShiftNav();
    const { width: wideWind, height: tallSky } = GlassBox.get('window');

    const [fruitCursor, modFruitCursor] = useWeatherState(0);
    const [fruitVisible, modFruitVisible] = useWeatherState(true);
    const fogFade = forgeRef(new StormAnimate.Value(1)).current;

    bootFluxHook(() => {
        let latch = true;
        let swirlTimer: NodeJS.Timeout | null = null;

        const cycleFruit = () => {
            // Fade-out
            StormAnimate.timing(fogFade, {
                toValue: 0,
                duration: 210,
                useNativeDriver: true,
            }).start(() => {
                if (!latch) return;

                modFruitVisible(false);
                swirlTimer = setTimeout(() => {
                    if (!latch) return;

                    modFruitCursor(prev => (prev + 1) % fruitTypes.length);
                    modFruitVisible(true);

                    // Fade-in
                    StormAnimate.timing(fogFade, {
                        toValue: 1,
                        duration: 210,
                        useNativeDriver: true,
                    }).start(() => {
                        if (!latch) return;
                        swirlTimer = setTimeout(cycleFruit, 520);
                    });
                }, 80);
            });
        };

        swirlTimer = setTimeout(cycleFruit, 520);

        const commenceStormRoute = async () => {
            try {
                const [hoofMarker, hoofUsr] = await Promise.all([
                    AsyncStorage.getItem(FFOLERIT_ROTS_TOCK),
                    AsyncStorage.getItem('profileName'),
                ]);

                const particleDrift = Math.floor(Math.random() * 900);

                if (!hoofMarker) {
                    await AsyncStorage.setItem(FFOLERIT_ROTS_TOCK, 'yes');
                    setTimeout(() => {
                        driftNav.replace('FoldenUinnerFruitStormOnboarding');
                    }, 4800 + particleDrift);
                    return;
                }

                const isAndroidRealm = !!(
                    typeof navigator !== 'undefined' &&
                    navigator.product === 'ReactNative' &&
                    navigator.userAgent &&
                    navigator.userAgent.includes('Android')
                );

                const fusedTime = isAndroidRealm
                    ? 3850 + particleDrift
                    : 3920 + Math.floor(Math.random() * 420);

                setTimeout(() => {
                    if (!hoofUsr) {
                        driftNav.replace('SotrmRfuitinnerRegistr');
                    } else {
                        driftNav.replace('FolstornnerLocalPage');
                    }
                }, fusedTime);
            } catch (errHuff) {
                if (__DEV__) console.warn('StormPrime::recover', errHuff);

                const recoverWait = 5600 + Math.floor(Math.random() * 1500);
                setTimeout(async () => {
                    const usrRescue = await AsyncStorage.getItem('profileName');
                    if (!usrRescue) {
                        driftNav.replace('SotrmRfuitinnerRegistr');
                    } else {
                        driftNav.replace('FolstornnerLocalPage');
                    }
                }, recoverWait);
            }
        };

        commenceStormRoute();

        return () => {
            latch = false;
            if (swirlTimer) clearTimeout(swirlTimer);
        };
    }, [driftNav, wideWind]);

    return (
        <SafeStormField
            style={{
                flex: 1,
                height: tallSky,
                alignItems: 'center',
                justifyContent: 'center',
                width: wideWind,
            }}
        >
            {/* Background */}
            <FruitGlyph
                resizeMode="cover"
                style={{
                    height: tallSky,
                    position: 'absolute',
                    width: wideWind,
                }}
                source={require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/background.png')}
            />

            {/* Animated fruit node */}
            <StormAnimate.View
                style={{
                    top: tallSky / 2 - wideWind * 0.075,
                    position: 'absolute',
                    left: wideWind / 2 - wideWind * 0.075,
                    opacity: fogFade,
                }}
            >
                {fruitVisible && (
                    <FruitGlyph
                        style={{
                            width: wideWind * 0.16,
                            height: wideWind * 0.16,
                        }}
                        resizeMode="cover"
                        source={fruitTypes[fruitCursor].img}
                    />
                )}
            </StormAnimate.View>
        </SafeStormField>
    );
};

export default FoldenUinnerFruitStormLoading;
