import React from 'react';
import { View as SotredlofVIewfriut, TouchableOpacity, Image as TiurfrennImagedlof } from 'react-native';
import buttons from '../UinnerData/buttons';

export default function ResultButtons({ frameW, frameH, onTryAgain, onShare, onExit }) {
    return (
        <SotredlofVIewfriut style={{ marginTop: frameH * 0.04, width: '100%', alignItems: 'center' }}>
            <TouchableOpacity
                onPress={onTryAgain}
                activeOpacity={0.91}
                style={{ marginBottom: frameH * 0.025 }}
            >
                <TiurfrennImagedlof
                    source={buttons.tryagain}
                    resizeMode="contain"
                    style={{
                        width: frameW * 0.82,
                        height: frameH * 0.11,
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onShare}
                activeOpacity={0.91}
                style={{ marginBottom: frameH * 0.025 }}
            >
                <TiurfrennImagedlof
                    source={buttons.share}
                    resizeMode="contain"
                    style={{
                        width: frameW * 0.82,
                        height: frameH * 0.11,
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onExit}
                activeOpacity={0.91}
            >
                <TiurfrennImagedlof
                    source={buttons.home}
                    resizeMode="contain"
                    style={{
                        width: frameW * 0.82,
                        height: frameH * 0.11,
                    }}
                />
            </TouchableOpacity>
        </SotredlofVIewfriut>
    );
}
