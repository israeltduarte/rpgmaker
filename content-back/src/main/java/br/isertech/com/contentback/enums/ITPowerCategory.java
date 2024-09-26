package br.isertech.com.contentback.enums;

import java.util.HashMap;
import java.util.Map;

public enum ITPowerCategory {

    MENTAL("MENTAL"),
    PHYSICAL("PHYSICAL"),
    ABILITY("ABILITY"),
    ELEMENTAL("ELEMENTAL");

    ITPowerCategory(String label) {
        this.label = label;
    }

    private final String label;
    private static final Map<String, ITPowerCategory> BY_LABEL = new HashMap<>();

    static {
        for (ITPowerCategory p : values()) {
            BY_LABEL.put(p.label, p);
        }
    }

    public static ITPowerCategory valueOfLabel(String label) {
        return BY_LABEL.get(label);
    }
}
