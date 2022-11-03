import React, { useMemo } from 'react'
import {
    View,
    StyleSheet,
    Text
} from 'react-native'

import { normalize } from '../../functions/normalize'

const styles = StyleSheet.create({
    badge: {
        minWidth: 25,
        height: 25,
        backgroundColor: "#fd1a0b",
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: "center",
        paddingHorizontal: 5
    },
    badgeText: {
        color: "#ffffff",
        fontSize: normalize(12),
        fontWeight: "bold",
        maxWidth: 70
    }
})

const Badge = ({
    style,
    textStyle,
    badge = 0
}) => {
    const _badge = useMemo(() => {
        if (typeof (badge) == "number") {
            return badge > 99 ? "99+" : badge
        }
        if (typeof (badge) === 'string') {
            return badge
        }
        return null
    }, [badge])

    if (!_badge) {
        return null
    }

    return (
        <View style={[styles.badge, style]}>
            <Text numberOfLines={1} style={[styles.badgeText, textStyle]}>{_badge}</Text>
        </View>
    )
}

export default Badge