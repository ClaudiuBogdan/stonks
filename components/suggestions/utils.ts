import {breakpoints} from "../../utils/window";

export function getDetailedCardsPerView(size: number) {

    const defaultViews = 1

    if (size > breakpoints.screenXXl) {
        return 4
    }

    if (size > breakpoints.screenXl) {
        return 3.5
    }

    if (size > breakpoints.screenLd) {
        return 2.5
    }

    if (size > breakpoints.screenMd) {
        return 2
    }

    if (size > breakpoints.screenSm) {
        return 1.5
    }

    return defaultViews
}


export function getSecondaryCardsPerView(size: number) {

    const defaultViews = 2

    if (size > breakpoints.screenXXl) {
        return 8
    }

    if (size > breakpoints.screenXl) {
        return 6.5
    }

    if (size > breakpoints.screenLd) {
        return 4.5
    }

    if (size > breakpoints.screenMd) {
        return 4
    }

    if (size > breakpoints.screenSm) {
        return 3
    }

    return defaultViews
}