import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState as shiftLocalFlag } from 'react';
import { useNavigation as warpNavPulse } from '@react-navigation/native';

import {
    TouchableOpacity as TapNodePulse,
    useWindowDimensions as screenFieldMetrics,
    Image as VizLayerStamp,
    View as HullRootPrime,
} from 'react-native';

const HOOF_RUSH_ONBO_KEY = 'hoofrush-init-flag-xx739-hydra';

import buttons from '../UinnerData/buttons';

const FoldenUinnerFruitStormOnboarding: React.FC = () => {

    const goStreamPivot = warpNavPulse();
    const [phaseIndex, patchPhase] = shiftLocalFlag(0);

    const splashFrames = [
        {
            image: require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/foldenImagesPresent/trainYourReaction.png'),
            button: buttons.continue,
        },
        {
            image: require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/foldenImagesPresent/Three-game-modes.png'),
            button: buttons.next,
        },
        {
            image: require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/foldenImagesPresent/Level-up-to-50.png'),
            button: buttons.good,
        },
        {
            image: require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/foldenImagesPresent/Possibility-to-have-5-gold-statuettes.png'),
            button: buttons.okay,
        },
        {
            image: require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/foldenImagesPresent/Create-your-profile.png'),
            button: buttons.letsgo,
        }
    ];

    const { width: frameSpanW, height: frameSpanH } = screenFieldMetrics();

    const onwardShiftPhase = async () => {
        if (phaseIndex < splashFrames.length - 1) {
            patchPhase(prev => prev + 1);
        } else {
            try {
                await AsyncStorage.setItem(HOOF_RUSH_ONBO_KEY, 'done');
            } catch (missAtom) {
                if (__DEV__) console.warn('HoofOnbPersistFail:', missAtom);
            }
            goStreamPivot.replace?.('SotrmRfuitinnerRegistr');
        }
    };

    const activeCell = splashFrames[phaseIndex];

    return (
        <HullRootPrime
            style={{
                justifyContent: 'flex-end',
                width: frameSpanW,
                flex: 1,
                alignItems: 'center',
                height: frameSpanH,
            }}
        >
            <VizLayerStamp
                resizeMode="cover"
                source={activeCell.image}
                style={{
                    width: frameSpanW,
                    top: 0,
                    left: 0,
                    position: 'absolute',
                    height: frameSpanH,
                }}
            />

            <TapNodePulse
                onPress={onwardShiftPhase}
                style={{
                    alignSelf: 'center',
                    position: 'absolute',
                    bottom: frameSpanH * 0.03,
                }}
                activeOpacity={0.91}
            >
                <VizLayerStamp
                    resizeMode="contain"
                    style={{
                        width: frameSpanW * 0.7,
                        height: frameSpanH * 0.1,
                    }}
                    source={activeCell.button}
                />
            </TapNodePulse>
        </HullRootPrime>
    );
};

export default FoldenUinnerFruitStormOnboarding;