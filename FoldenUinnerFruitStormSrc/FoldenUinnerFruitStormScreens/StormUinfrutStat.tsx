import AsyncStorage from '@react-native-async-storage/async-storage';
import { storfontsinner } from '../storfontsinner';
import React, {
    useEffect as useFoxtrotEffect,
    useState as useFoxtrotState,
} from 'react';

import {
    Share as FluxShare,
    View as FluxShell,
    Dimensions as FluxDims,
    Text as FluxText,
    TouchableOpacity as FluxTap,
    Alert as FluxAlert,
    Image as FluxImg,
} from 'react-native';

import buttons from '../UinnerData/buttons';

export default function StormUinfrutStat({
}: {
}) {

    const { width: viewW, height: viewH } = FluxDims.get('window');

    // Динамічні розміри
    const padUnit = viewW * 0.05;
    const radiusMain = viewW * 0.06;
    const wrapW = viewW * 0.86;
    const wrapH = viewH * 0.54;
    const txtHuge = viewW * 0.13;
    const txtMid = viewW * 0.088;
    const txtSm = viewW * 0.045;
    const shareH = viewH * 0.1;
    const shareW = viewW * 0.75;
    const barW = viewW * 0.61;
    const barH = txtHuge * 0.32;

    // Статистика
    const [level, setLevel] = useFoxtrotState(1);
    const [gamesPlayed, setGamesPlayed] = useFoxtrotState(0);
    const [fastestReaction, setFastestReaction] = useFoxtrotState(0);
    const [progress, setProgress] = useFoxtrotState(0);

    // Завантаження значень
    useFoxtrotEffect(() => {
        AsyncStorage.getItem('userLevel')
            .then(v => setLevel(v ? parseInt(v, 10) : 1));

        AsyncStorage.getItem('gamesPlayed')
            .then(v => setGamesPlayed(v ? parseInt(v, 10) : 0));

        AsyncStorage.getItem('fastestReaction')
            .then(v => setFastestReaction(v ? parseInt(v, 10) : 0));

        AsyncStorage.getItem('levelProgress')
            .then(v => setProgress(v ? parseFloat(v) : 0));
    }, []);

    // Обробник Share
    const handleShare = () => {
        FluxShare.share({
            message: `I reached level ${level} in Uinner Fruit Storm! Can you beat my score?`,
        }).catch(() => {
            FluxAlert.alert('Error', 'Unable to share your stats at the moment.');
        });
    };

    return (
        <FluxShell
            style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: 'transparent',
            }}
        >
            <FluxShell
                style={{
                    alignItems: 'flex-start',
                    width: wrapW,
                    height: wrapH,
                    borderRadius: radiusMain,
                    padding: padUnit,
                    justifyContent: 'flex-start',
                    marginTop: viewH * 0.1,
                    shadowColor: '#000',
                    shadowOpacity: 0.18,
                    shadowRadius: radiusMain * 0.5,
                    elevation: 6,
                    backgroundColor: '#5D0100',
                }}
            >

                <FluxText
                    style={{
                        marginBottom: padUnit * 0.5,
                        fontSize: txtSm,
                        letterSpacing: 1.2,
                        fontFamily: storfontsinner.foldinLondrinaSolRegul,
                        marginTop: padUnit * 0.2,
                        color: '#fff',
                    }}
                >
                    YOUR LEVEL:
                </FluxText>

                <FluxShell
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        marginBottom: padUnit * 0.7,
                    }}
                >
                    <FluxText
                        style={{
                            textShadowColor: '#000',
                            fontSize: txtHuge,
                            textShadowOffset: { width: 2, height: 2 },
                            fontFamily: storfontsinner.foldinLondrinaSolBlack,
                            color: '#FDD721',
                            textShadowRadius: 2,
                            marginRight: padUnit * 0.5,
                            marginLeft: padUnit * 0.2,
                        }}
                    >
                        {level}
                    </FluxText>

                    <FluxShell
                        style={{
                            paddingHorizontal: viewW * 0.016,
                            width: barW,
                            backgroundColor: '#280000',
                            justifyContent: 'center',
                            borderRadius: barH / 1.4,
                            height: viewH * 0.04,
                            marginLeft: padUnit * 0.1,
                            overflow: 'hidden',
                        }}
                    >
                        <FluxShell style={{
                                backgroundColor: '#FDD721',
                                height: '68%',
                                width: `${Math.round(progress * 100)}%`,
                                borderRadius: barH / 2,
                            }}
                        />
                    </FluxShell>
                </FluxShell>

                <FluxText style={{
                        letterSpacing: 1.2,
                        marginBottom: padUnit * 0.2,
                        fontSize: txtSm,
                        fontFamily: storfontsinner.foldinLondrinaSolLight,
                        color: '#fff',
                    }}
                >
                    NUMBER OF GAMES PLAYED:
                </FluxText>

                <FluxText
                    style={{
                        textShadowRadius: 1,
                        textShadowOffset: { width: 1, height: 1 },
                        fontFamily: storfontsinner.foldinLondrinaSolBlack,
                        marginBottom: padUnit * 0.7,
                        textShadowColor: '#000',
                        fontSize: txtMid,
                        color: '#FDD721',
                    }}
                >
                    {gamesPlayed}
                </FluxText>

                <FluxText
                    style={{
                        letterSpacing: 1.2,
                        fontSize: txtSm,
                        marginBottom: padUnit * 0.2,
                        fontFamily: storfontsinner.foldinLondrinaSolLight,
                        color: '#fff',
                    }}
                >
                    THE FASTEST REACTION:
                </FluxText>

                <FluxText
                    style={{
                        textShadowRadius: 1,
                        fontSize: txtMid,
                        textShadowColor: '#000',
                        fontFamily: storfontsinner.foldinLondrinaSolBlack,
                        color: '#FDD721',
                        textShadowOffset: { width: 1, height: 1 },
                        marginBottom: padUnit * 0.7,
                    }}
                >
                    {fastestReaction} SEC
                </FluxText>

                <FluxTap
                    activeOpacity={0.82}
                    onPress={handleShare}
                    style={{
                        alignItems: 'center',
                        height: shareH,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginTop: padUnit * 0.5,
                        width: shareW,
                    }}
                >
                    <FluxImg
                        source={buttons.share}
                        style={{
                            width: shareW,
                            height: shareH,
                            resizeMode: 'contain',
                        }}
                    />
                </FluxTap>
            </FluxShell>
        </FluxShell>
    );
}
