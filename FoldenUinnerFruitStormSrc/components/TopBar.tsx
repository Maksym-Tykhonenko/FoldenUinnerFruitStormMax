import React from 'react';
import { View as SotredlofVIewfriut, Text as GreetTxt, Image as TiurfrennImagedlof, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { storfontsinner } from '../storfontsinner';
import fruitTypes from '../UinnerData/fruitTypes';

interface TopBarProps {
    frameW: number;
    frameH: number;
    gameOver: boolean;
    timer: number;
    caught: number;
    fruitStats: {
        plum: number;
        orange: number;
        watermelon: number;
        strawberry: number;
    };
    onExit: () => void;
}

export default function TopBar({
    frameW,
    frameH,
    gameOver,
    timer,
    caught,
    fruitStats,
    onExit,
}: TopBarProps) {
    return (
        <SotredlofVIewfriut
            style={{
                width: frameW,
                backgroundColor: '#5D0100',
                borderBottomLeftRadius: frameW * 0.07,
                borderBottomRightRadius: frameW * 0.07,
                alignItems: 'center',
                paddingVertical: frameH * 0.0,
                alignSelf: 'center',
                justifyContent: 'center',
                zIndex: 100,
                borderWidth: 2.1,
                borderColor: '#FDD721',
                borderTopColor: 'transparent',
            }}
        >
            <SafeAreaView style={{ alignItems: 'center', width: '100%' }}>
                <SotredlofVIewfriut style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: frameW * 0.07,
                }}>
                    {/* Home button - only during game */}
                    {!gameOver && (
                        <TouchableOpacity
                            onPress={onExit}
                            style={{
                                width: frameW * 0.12,
                                height: frameW * 0.12,
                                backgroundColor: '#2B1400',
                                borderRadius: frameW * 0.03,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            activeOpacity={0.8}
                        >
                            <TiurfrennImagedlof
                                source={require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/icsOfBtm/home.png')}
                                style={{
                                    width: frameW * 0.07,
                                    height: frameW * 0.07,
                                    tintColor: '#FDD721',
                                }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    )}
                    {/* Center: timer or SESSION END */}
                    <SotredlofVIewfriut style={{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                        {gameOver ? (
                            <>
                                <GreetTxt
                                    style={{
                                        fontSize: frameW * 0.08,
                                        color: '#fff',
                                        fontFamily: storfontsinner.foldinLondrinaSolBlack,
                                        marginBottom: frameH * 0.01,
                                        letterSpacing: 1,
                                    }}
                                >
                                    SESSION END
                                </GreetTxt>
                                <SotredlofVIewfriut style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: frameH * 0.01 }}>
                                    {fruitTypes.map(ft => (
                                        <SotredlofVIewfriut key={ft.key} style={{ alignItems: 'center', marginHorizontal: frameW * 0.03 }}>
                                            <TiurfrennImagedlof
                                                source={ft.img}
                                                style={{
                                                    width: frameW * 0.13,
                                                    height: frameW * 0.13,
                                                    marginBottom: frameH * 0.01,
                                                }}
                                                resizeMode="contain"
                                            />
                                            <GreetTxt
                                                style={{
                                                    fontSize: frameW * 0.07,
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    fontFamily: storfontsinner.foldinLondrinaSolBlack,
                                                    marginTop: frameH * 0.01,
                                                }}
                                            >
                                                {fruitStats[ft.key]}
                                            </GreetTxt>
                                        </SotredlofVIewfriut>
                                    ))}
                                </SotredlofVIewfriut>
                                <SotredlofVIewfriut
                                    style={{
                                        backgroundColor: '#2B1400',
                                        borderRadius: frameW * 0.04,
                                        paddingHorizontal: frameW * 0.09,
                                        paddingVertical: frameH * 0.012,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: frameH * 0.01,
                                        marginTop: frameH * 0.01,
                                    }}
                                >
                                    <TiurfrennImagedlof
                                        source={require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/leaf.png')}
                                        style={{
                                            width: frameW * 0.07,
                                            height: frameW * 0.07,
                                            marginRight: frameW * 0.02,
                                            tintColor: '#FDD721',
                                        }}
                                        resizeMode="contain"
                                    />
                                    <GreetTxt
                                        style={{
                                            fontSize: frameW * 0.07,
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            fontFamily: storfontsinner.foldinLondrinaSolBlack,
                                        }}
                                    >
                                        {fruitStats.plum + fruitStats.orange + fruitStats.watermelon + fruitStats.strawberry}
                                    </GreetTxt>
                                </SotredlofVIewfriut>
                            </>
                        ) : (
                            <SotredlofVIewfriut style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TiurfrennImagedlof
                                    source={require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/сlock.png')}
                                    style={{
                                        width: frameW * 0.07,
                                        height: frameW * 0.07,
                                        marginRight: frameW * 0.015,
                                        tintColor: '#FDD721',
                                    }}
                                    resizeMode="contain"
                                />
                                <GreetTxt
                                    style={{
                                        fontSize: frameW * 0.07,
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        fontFamily: storfontsinner.foldinLondrinaSolBlack,
                                        letterSpacing: 1,
                                        marginRight: frameW * 0.03,
                                    }}
                                >
                                    {`${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`}
                                </GreetTxt>
                            </SotredlofVIewfriut>
                        )}
                    </SotredlofVIewfriut>
                    {/* Caught fruits - only during game */}
                    {!gameOver && (
                        <SotredlofVIewfriut style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TiurfrennImagedlof
                                source={require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/leaf.png')}
                                style={{
                                    width: frameW * 0.07,
                                    height: frameW * 0.07,
                                    marginRight: frameW * 0.01,
                                    tintColor: '#FDD721',
                                }}
                                resizeMode="contain"
                            />
                            <GreetTxt
                                style={{
                                    fontSize: frameW * 0.07,
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    fontFamily: storfontsinner.foldinLondrinaSolBlack,
                                    letterSpacing: 1,
                                }}
                            >
                                {caught}
                            </GreetTxt>
                        </SotredlofVIewfriut>
                    )}
                </SotredlofVIewfriut>
            </SafeAreaView>
        </SotredlofVIewfriut>
    );
}
