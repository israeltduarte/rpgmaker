package br.isertech.com.contentback.enums;

import java.util.HashMap;
import java.util.Map;

public enum ITCharacterType {

    PDM("PDM"),
    PDJ("PDJ");

    ITCharacterType(String label) {
        this.label = label;
    }

    private final String label;
    private static final Map<String, ITCharacterType> BY_LABEL = new HashMap<>();

    static {
        for (ITCharacterType c : values()) {
            BY_LABEL.put(c.label, c);
        }
    }

    public static ITCharacterType valueOfLabel(String label) {
        return BY_LABEL.get(label);
    }

}
