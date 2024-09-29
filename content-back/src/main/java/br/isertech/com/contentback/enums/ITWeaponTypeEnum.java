package br.isertech.com.contentback.enums;

import java.util.HashMap;
import java.util.Map;

public enum ITWeaponTypeEnum {

    LARGE_SWORD("LARGE_SWORD"),
    LONG_SWORD("LONG_SWORD"),
    SHORT_SWORD("SHORT_SWORD"),
    SPEAR("SPEAR"),
    DAGGER("DAGGER"),
    LONG_BOW("LONG_BOW"),
    SHORT_BOW("SHORT_BOW"),
    HAMMER("HAMMER"),
    WAR_HAMMER("WAR_HAMMER"),
    AXE("AXE"),
    TWO_HEADS_AXE("TWO_HEADS_AXE"),
    ROD("ROD"),
    BELL("BELL")
    ;

    ITWeaponTypeEnum(String label) {
        this.label = label;
    }

    private final String label;
    private static final Map<String, ITWeaponTypeEnum> BY_LABEL = new HashMap<>();

    static {
        for (ITWeaponTypeEnum w : values()) {
            BY_LABEL.put(w.label, w);
        }
    }

    public static ITWeaponTypeEnum valueOfLabel(String label) {
        return BY_LABEL.get(label);
    }
}
