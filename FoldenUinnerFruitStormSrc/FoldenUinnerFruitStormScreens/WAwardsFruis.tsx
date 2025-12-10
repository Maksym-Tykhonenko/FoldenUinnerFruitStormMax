import AsyncStorage from '@react-native-async-storage/async-storage';
import { storfontsinner } from '../storfontsinner';
import React, { useState as useFruiStan, useEffect as useStornnerEff } from 'react';
import {
    View as Bovieruit,
    Text as UitstorTxtik,
    Image as TsfolImgen,
    TouchableOpacity as PressingBox,
    Dimensions as Tordimensnniu,
    Alert,
    Share,
} from 'react-native';
import buttons from '../UinnerData/buttons';


export default function WAwardsFruis({ setCurrentSectionKey, }: { setCurrentSectionKey: (key: string) => void; gameMode: string | null; setGameMode: (mode: string | null) => void; }) {
    const { width: frameW, height: frameH } = Tordimensnniu.get('window');
    // Розміри
    const pad = frameW * 0.05;
    const borderRad = frameW * 0.06;
    const blockW = frameW * 0.86;
    const blockH = frameH * 0.54;
    const fontBig = frameW * 0.13;
    const fontMid = frameW * 0.088;
    const fontSmall = frameW * 0.045;
    const shareBtnH = frameH * 0.1;
    const shareBtnW = frameW * 0.75;
    const progressBarW = frameW * 0.61;
    const progressBarH = fontBig * 0.32;

    // Стейт статистики
    const [level, setLevel] = useFruiStan(1);
    const [gamesPlayed, setGamesPlayed] = useFruiStan(0);
    const [fastestReaction, setFastestReaction] = useFruiStan(0);
    const [progress, setProgress] = useFruiStan(0);

    // Завантаження статистики
    useStornnerEff(() => {
        AsyncStorage.getItem('userLevel').then(val => setLevel(val ? parseInt(val, 10) : 1));
        AsyncStorage.getItem('gamesPlayed').then(val => setGamesPlayed(val ? parseInt(val, 10) : 0));
        AsyncStorage.getItem('fastestReaction').then(val => setFastestReaction(val ? parseInt(val, 10) : 0));
        AsyncStorage.getItem('levelProgress').then(val => setProgress(val ? parseFloat(val) : 0));
    }, []);

    // Share handler (заглушка)
    const handleShare = () => {
        // Тут можна реалізувати реальний share
        Share.share({
            message: `I reached level ${level} in Uinner Fruit Storm! Can you beat my score?`,
        }).catch((error) => {
            Alert.alert('Error', 'Unable to share your stats at the moment.');
        })
    };

    return (
        <Bovieruit style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'transparent',
        }}>
            {level >= 10 ? (
                <Bovieruit style={{
                    width: blockW,
                    backgroundColor: '#5D0100',
                    borderRadius: borderRad,
                    padding: pad,
                    paddingVertical: pad * 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOpacity: 0.18,
                    shadowRadius: borderRad * 0.5,
                    elevation: 6,
                    marginTop: frameH * 0.1,
                }}>
                    <TsfolImgen
                        source={require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/oneAward.png')}
                        style={{
                            width: frameW * 0.35,
                            height: frameW * 0.35,
                            resizeMode: 'contain',
                            alignSelf: 'center',
                        }}
                    />
                    <UitstorTxtik style={{
                        color: '#fff',
                        fontSize: frameW * 0.07,
                        textAlign: 'center',
                        fontFamily: storfontsinner.foldinLondrinaSolBlack,
                        marginVertical: pad * 0.5,
                        letterSpacing: 1.2,
                        alignSelf: 'center',
                    }}>
                        FOR REACHING LEVEL 10
                    </UitstorTxtik>
                    <PressingBox
                        onPress={handleShare}
                        activeOpacity={0.8}
                        style={{
                            width: shareBtnW,
                            height: shareBtnH,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: pad * 0.5,
                            alignSelf: 'center',
                        }}
                    >
                        <TsfolImgen
                            source={buttons.share}
                            style={{
                                width: shareBtnW,
                                height: shareBtnH,
                                resizeMode: 'contain',
                            }}
                        />
                    </PressingBox>
                </Bovieruit>
            ) : (
                <UitstorTxtik style={{
                    color: '#000',
                    fontSize: frameW * 0.064,
                    width: frameW * 0.88,
                    marginTop: frameH * 0.3,
                    textAlign: 'center',
                    fontFamily: storfontsinner.foldinLondrinaSolBlack,
                    marginVertical: pad * 0.5,
                    letterSpacing: 1.2,
                    alignSelf: 'center',
                    textTransform: 'uppercase',
                }}>
                    Rewards can be obtained for activity, every 10 levels a reward becomes available
                </UitstorTxtik>
            )}
        </Bovieruit>
    );
}
