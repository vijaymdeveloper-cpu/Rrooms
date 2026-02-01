
const ALL_SLOTS = ["3Hrs", "6Hrs", "9Hrs", "FullDay"];

const mergeAllSlotsForDate = (statusData, priceData, date, slotRegularPrices) => {
    const statusSlots = statusData?.[date] || [];
    const priceSlots = priceData?.[date] || [];

    return ALL_SLOTS.map(slot => {
        const statusItem = statusSlots.find(s => s.slot === slot);
        const priceItem = priceSlots.find(p => p.slot === slot);

        let fallbackPrice = 0;
        switch (slot) {
            case "3Hrs":
                fallbackPrice = slotRegularPrices?.threeHrPrice || 0;
                break;
            case "6Hrs":
                fallbackPrice = slotRegularPrices?.sixHrPrice || 0;
                break;
            case "9Hrs":
                fallbackPrice = slotRegularPrices?.nineHrPrice || 0;
                break;
            case "FullDay":
                fallbackPrice = slotRegularPrices?.regularPrice || 0;
                break;
        }

        return {
            slot,
            status: statusItem?.status || "Available",
            price: Number(priceItem?.price || fallbackPrice)
        };
    });
};

const safeParse = (value) => {
    try {
        if (!value) return {};
        if (typeof value === "object") return value;
        if (typeof value === "string") return JSON.parse(value);
        return {};
    } catch (e) {
        console.error("Parse error:", value);
        return {};
    }
};


export const getTodaySlotPricing = (item, date) => {
    const checkToday = date;

    const primaryRoom =
        item?.Rooms?.find(room => room?.categoryId == 1) ||
        item?.Rooms?.find(room => room?.categoryId != 1);

    const threeHrStatus = safeParse(primaryRoom?.threeHrStatus);
    const threeHrOfferPrice = safeParse(
        primaryRoom?.threeHrOfferPrice ??
        primaryRoom?.offerPrice
    );

    const mergedSlots = mergeAllSlotsForDate(
        threeHrStatus,
        threeHrOfferPrice,
        checkToday,
        primaryRoom
    );

    const fullDayPrice =
        mergedSlots.find(it => it?.slot === "FullDay")?.price || 0;

    const fullDayTaxableAmount = Math.round(
        fullDayPrice / (1 - 20 / 100)
    );

    return {
        date: checkToday,
        slots: mergedSlots,
        fullDayPrice,
        fullDayTaxableAmount
    };
};
