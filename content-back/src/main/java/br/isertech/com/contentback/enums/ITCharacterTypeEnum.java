package br.isertech.com.contentback.enums;

import java.util.HashMap;
import java.util.Map;

public enum ITCharacterTypeEnum {

    PDM("PDM"),
    PDJ("PDJ");

    ITCharacterTypeEnum(String label) {
        this.label = label;
    }

    private final String label;
    private static final Map<String, ITCharacterTypeEnum> BY_LABEL = new HashMap<>();

    static {
        for (ITCharacterTypeEnum c : values()) {
            BY_LABEL.put(c.label, c);
        }
    }

    public static ITCharacterTypeEnum valueOfLabel(String label) {
        return BY_LABEL.get(label);
    }

}
