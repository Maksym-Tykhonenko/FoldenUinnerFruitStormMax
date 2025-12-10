import React from 'react';
import { View as SotredlofVIewfriut, Text as GreetTxt, TouchableOpacity, Image as TiurfrennImagedlof } from 'react-native';
import buttons from '../UinnerData/buttons';
import { storfontsinner } from '../storfontsinner';

export default function ModeSelect({ frameW, frameH, setGameMode }) {
    return (
        <>
            <GreetTxt
                style={{
                    fontFamily: storfontsinner.foldinLondrinaSolBlack,
                    textShadowOffset: { width: 1, height: 1 },
                    fontSize: frameW * 0.08,
                    color: '#2B1400',
                    textShadowRadius: 1,
                    letterSpacing: 1,
                    marginTop: frameH * 0.06,
                    textShadowColor: '#FDD721',
                    textAlign: 'center',
                    marginBottom: frameH * 0.025,
                }}
            >
                MODES:
            </GreetTxt>
            <SotredlofVIewfriut style={{ width: '100%', alignItems: 'center', marginTop: frameH * 0.01 }}>
                <TouchableOpacity
                    activeOpacity={0.91}
                    style={{ marginBottom: frameH * 0.025 }}
                    onPress={() => setGameMode('normal')}
                >
                    <TiurfrennImagedlof
                        source={buttons.normal}
                        resizeMode="contain"
                        style={{
                            width: frameW * 0.82,
                            height: frameH * 0.11,
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setGameMode('medium')}
                    style={{ marginBottom: frameH * 0.025 }}
                    activeOpacity={0.91}
                >
                    <TiurfrennImagedlof
                        source={buttons.medium}
                        resizeMode="contain"
                        style={{
                            width: frameW * 0.82,
                            height: frameH * 0.11,
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.91}
                    onPress={() => setGameMode('mega')}
                >
                    <TiurfrennImagedlof
                        source={buttons.mega}
                        style={{
                            height: frameH * 0.11,
                            width: frameW * 0.82,
                        }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </SotredlofVIewfriut>
        </>
    );
}
