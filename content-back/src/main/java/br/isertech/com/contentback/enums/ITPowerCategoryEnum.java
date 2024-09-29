package br.isertech.com.contentback.enums;

import java.util.HashMap;
import java.util.Map;

public enum ITPowerCategoryEnum {

    MENTAL("MENTAL"),
    PHYSICAL("PHYSICAL"),
    ABILITY("ABILITY"),
    ELEMENTAL("ELEMENTAL");

    ITPowerCategoryEnum(String label) {
        this.label = label;
    }

    private final String label;
    private static final Map<String, ITPowerCategoryEnum> BY_LABEL = new HashMap<>();

    static {
        for (ITPowerCategoryEnum p : values()) {
            BY_LABEL.put(p.label, p);
        }
    }

    public static ITPowerCategoryEnum valueOfLabel(String label) {
        return BY_LABEL.get(label);
    }
}
