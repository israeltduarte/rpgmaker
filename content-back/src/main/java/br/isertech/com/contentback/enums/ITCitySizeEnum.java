package br.isertech.com.contentback.enums;

import java.util.HashMap;
import java.util.Map;

public enum ITCitySizeEnum {

    SMALL_1("SMALL_1"),
    SMALL_2("SMALL_2"),
    SMALL_3("SMALL_3"),
    MEDIUM_1("MEDIUM_1"),
    MEDIUM_2("MEDIUM_2"),
    MEDIUM_3("MEDIUM_3"),
    LARGE_1("LARGE_1"),
    LARGE_2("LARGE_2"),
    LARGE_3("LARGE_3");

    ITCitySizeEnum(String label) {
        this.label = label;
    }

    private final String label;
    private static final Map<String, ITCitySizeEnum> BY_LABEL = new HashMap<>();

    static {
        for (ITCitySizeEnum s : values()) {
            BY_LABEL.put(s.label, s);
        }
    }

    public static ITCitySizeEnum valueOfLabel(String label) {
        return BY_LABEL.get(label);
    }
}
